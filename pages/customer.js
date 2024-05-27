import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import * as Yup from 'yup'; // Import Yup for schema validation

const Customer = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bhargavkaka.unize.co.in/api/customer/');
      setCustomers(response.data.customers);
    } catch (error) {
      toast.error('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (customerId) => {
    setLoading(true);
    try {
      const response = await axios.delete(`https://bhargavkaka.unize.co.in/api/customer/${customerId}`);
      if (response.data) {
        toast.success('Customer deleted successfully');
        // Refetch customers after deletion
        fetchCustomers();
      }
    } catch (error) {
      toast.error('Failed to delete customer');
    } finally {
      setLoading(false);
    }
  };

  // Define Yup schema for validation
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    mobile_number: Yup.string().required('Mobile number is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      mobile_number: '',
    },
    validationSchema, // Assign the validation schema to Formik
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post('https://bhargavkaka.unize.co.in/api/customer/create', values);
        if (response.data) {
          toast.success('Customer created successfully');
          // Refetch customers after creation
          fetchCustomers();
        }
      } catch (error) {
        toast.error('Failed to create customer');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <h1>Create Customer</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {/* Display validation error message */}
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            id="mobile_number"
            name="mobile_number"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.mobile_number}
          />
          {/* Display validation error message */}
          {formik.touched.mobile_number && formik.errors.mobile_number ? (
            <div>{formik.errors.mobile_number}</div>
          ) : null}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Create Customer'}
        </button>
      </form>
      <ToastContainer />
      <div>
        <h1>Customers</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {customers.map(customer => (
              <li key={customer.id}>
                <Link href={`/customer/${customer.id}`}>
                  {customer.name} - {customer.mobile_number}{' '}
                </Link>
                <button onClick={() => handleDelete(customer.id)} disabled={loading}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Customer;

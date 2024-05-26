import { useState , useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const Customer = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
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

    fetchCustomers();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      mobile_number: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post('https://bhargavkaka.unize.co.in/api/customer/create', values);
        if (response.data) {
          toast.success('Customer created successfully');
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
                {customer.name} - {customer.mobile_number}
              </Link>
            </li>
          ))}
        </ul>
      )}
      
    </div>
    </div>
  );
};

export default Customer;

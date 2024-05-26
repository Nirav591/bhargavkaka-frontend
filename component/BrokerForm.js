import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BrokerForm = ({id}) => {


  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://bhargavkaka.unize.co.in/api/customer/${id}`);
          setCustomer(response.data);
        } catch (error) {
          toast.error('Failed to fetch customer details');
        } finally {
          setLoading(false);
        }
      };

      fetchCustomer();
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      price: '',
      brokrage: '',
      broker_name: '',
      broker_mobile_number: '',
    },
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await axios.post('https://bhargavkaka.unize.co.in/api/customer/add-detail', {
          customer_id: id,
          ...values,
        });
        if (response.data.message) {
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error('Failed to add detail');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : customer ? (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
            </div>
            <div>
              <label htmlFor="brokrage">Brokrage</label>
              <input
                id="brokrage"
                name="brokrage"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.brokrage}
              />
            </div>
            <div>
              <label htmlFor="broker_name">Broker Name</label>
              <input
                id="broker_name"
                name="broker_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.broker_name}
              />
            </div>
            <div>
              <label htmlFor="broker_mobile_number">Broker Mobile Number</label>
              <input
                id="broker_mobile_number"
                name="broker_mobile_number"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.broker_mobile_number}
              />
            </div>
            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Add Detail'}
            </button>
          </form>
        </div>
      ) : (
        <p>No customer found</p>
      )}
      
    </div>
  );
};

export default BrokerForm;

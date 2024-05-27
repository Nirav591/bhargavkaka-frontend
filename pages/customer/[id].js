import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BrokerForm from '@/component/BrokerForm';
import TransactionForm from '@/component/TransactionForm';
import TransactionsPage from '@/component/TransactionList';

const CustomerDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(false)
  

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://bhargavkaka.unize.co.in/api/customer/${id}`);
          setCustomer(response.data);
          setForm(!form)
        } catch (error) {
          toast.error('Failed to fetch customer details');
        } finally {
          setLoading(false);
        }
      };

      fetchCustomer();
    }
  }, [id]);

 

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : customer ? (
        <div>
          <h1>{customer.customer.name}</h1>
          <p>Mobile Number: {customer.customer.mobile_number}</p>

          <hr />

          <h2>Add Broker  Details</h2>
          <BrokerForm id={id}/>
        
        </div>
      ) : (
        <p>No customer found</p>
      )}
      

      <hr />
      
      {loading ? (
        <p>Loading...</p>
      ) : customer ? (
        <div>
        
          <h2>Add Transaction  Details</h2>
          <TransactionForm id={id} setForm={setForm} form={form}/>
        
        </div>
      ) : (
        <p>No customer found</p>
      )}
      
      <TransactionsPage id={id} setForm={setForm} form={form}/>

    </div>
  );
};

export default CustomerDetails;

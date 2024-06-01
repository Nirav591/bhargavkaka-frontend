import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BrokerForm from '@/components/BrokerForm';
import TransactionForm from '@/components/TransactionForm';
import TransactionsPage from '@/components/TransactionList';

const Transaction = () => {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(false)
  

  console.log(id , "id");

  useEffect(() => {
    axios.get(`https://bhargavkaka.unize.co.in/api/transaction/customer/${id}`)
        .then(response => {
            const data = response;
            console.log(data, "data");
            // setTransactions(data.transactions);
            // setTotalCredit(data.totalCredit);
            // setTotalDebit(data.totalDebit);
        })
        .catch(error => console.error('Error fetching data:', error));
}, [id]);


  return (
    <div>
      

    </div>
  );
};

export default Transaction;

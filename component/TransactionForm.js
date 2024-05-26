// components/TransactionForm.js
import { Formik, Form, Field, FieldArray } from 'formik';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionForm = ({id, setForm , form}) => {
  const handleSubmit = async (values, { setSubmitting }) => {

    console.log(!form , "form");

    try {
      const response = await axios.post('https://bhargavkaka.unize.co.in/api/transaction/add', {
        transactions: values.transactions,
      });
      console.log('Response:', response.config.data);
      toast.success('Transactions successful');
      setForm(!form)
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error submitting transactions');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <ToastContainer />
    <Formik
      initialValues={{ transactions: [{ type: 'credit', amount: 0, reason: '', customer_id: id }] }}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <FieldArray name="transactions">
            {({ push, remove }) => (
              <div>
                {values.transactions.map((transaction, index) => (
                  <div key={index}>
                    <label htmlFor={`transactions.${index}.type`}>Type:</label>
                    <Field as="select" name={`transactions.${index}.type`}>
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </Field>
                    <label htmlFor={`transactions.${index}.amount`}>Amount:</label>
                    <Field type="number" name={`transactions.${index}.amount`} />
                    <label htmlFor={`transactions.${index}.reason`}>Reason:</label>
                    <Field type="text" name={`transactions.${index}.reason`} />
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ type: 'credit', amount: 0, reason: '' })}
                >
                  Add Transaction
                </button>
              </div>
            )}
          </FieldArray>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
    </>
  );
};

export default TransactionForm;

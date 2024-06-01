import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const TransactionForm = ({ id, setForm, form }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('https://bhargavkaka.unize.co.in/api/transaction/add', {
        transactions: values.transactions,
      });
      console.log('Response:', response.config.data);
      toast.success('Transactions successful');
      setForm(!form);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error submitting transactions');
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    transactions: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required('Type is required'),
        amount: Yup.number().required('Amount is required').min(0, 'Amount must be greater than or equal to 0'),
        reason: Yup.string().required('Reason is required'),
      })
    ),
  });

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{ transactions: [{ type: 'credit', amount: 0, reason: '', customer_id: id }] }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <FieldArray name="transactions">
              {({ push, remove }) => (
                <div>
                  {values.transactions.map((transaction, index) => (
                    <div key={index}>
                      <label htmlFor={`transactions.${index}.type`}>Type:</label>
                      <Field as="select" name={`transactions.${index}.type`} required>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                      </Field>
                      <ErrorMessage name={`transactions.${index}.type`} component="div" className="error" />
                      <label htmlFor={`transactions.${index}.amount`}>Amount:</label>
                      <Field type="number" name={`transactions.${index}.amount`} required />
                      <ErrorMessage name={`transactions.${index}.amount`} component="div" className="error" />
                      <label htmlFor={`transactions.${index}.reason`}>Reason:</label>
                      <Field type="text" name={`transactions.${index}.reason`} required />
                      <ErrorMessage name={`transactions.${index}.reason`} component="div" className="error" />
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push({ type: 'credit', amount: 0, reason: '' })}>
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

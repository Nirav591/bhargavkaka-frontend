import axios from 'axios';
import React, {useState, useEffect} from 'react';

const TransactionList = ({id}) => {

    const [transactions, setTransactions] = useState([]);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalDebit, setTotalDebit] = useState(0);



    useEffect(() => {
        axios.get(`https://bhargavkaka.unize.co.in/api/transaction/customer/${id}`)
            .then(response => {
                const data = response.data;
                console.log(data, "data");
                setTransactions(data.transactions);
                setTotalCredit(data.totalCredit);
                setTotalDebit(data.totalDebit);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);


    return (
        <div className="container">
            {
                transactions && <div className="row">
                    <div className="col-md-6">
                        <h3>Credits</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Reason</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => (
                                    transaction.type === 'credit' && (
                                        <tr key={transaction.id}>
                                            <td>{transaction.reason}</td>
                                            <td>{transaction.amount}</td>
                                            <td>{new Date(transaction.date).toLocaleString()}</td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                        <p>Total Credit: {totalCredit}</p>
                    </div>
                    <div className="col-md-6">
                        <h3>Debits</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Reason</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => (
                                    transaction.type === 'debit' && (
                                        <tr key={transaction.id}>
                                            <td>{transaction.reason}</td>
                                            <td>{transaction.amount}</td>
                                            <td>{new Date(transaction.date).toLocaleString()}</td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                        <p>Total Debit: {totalDebit}</p>
                    </div>
                </div>
            }

        </div>
    );
};

export default TransactionList;

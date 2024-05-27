import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const TransactionList = ({ id }) => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalDebit, setTotalDebit] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editReason, setEditReason] = useState('');
    const [editAmount, setEditAmount] = useState('');

    const formatDate = (inputDate) => {
        // Create a Date object from the input date string
        const date = new Date(inputDate);
      
        // Array of month names
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'];
      
        // Get day, month, and year from the date object
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
      
        // Format the date as "day month year"
        const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
      
        return formattedDate;
      };
    

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`https://bhargavkaka.unize.co.in/api/transaction/customer/${id}`);
            const data = response.data;
            const sortedTransactions = data.transactions.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date
            setTransactions(sortedTransactions);
            setFilteredTransactions(sortedTransactions);
            setTotalCredit(data.totalCredit);
            setTotalDebit(data.totalDebit);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const saveEdit = async (transactionId) => {
        try {
            const response = await axios.put(`https://bhargavkaka.unize.co.in/api/transaction/update/${transactionId}`, {
                reason: editReason,
                amount: editAmount,
            });
            console.log('Response:', response.data);
            fetchTransactions(); // Refresh the list after saving
            toast.success("Transaction updated successfully")
        } catch (error) {
            console.error('Error saving data:', error);
        } finally {
            setEditingIndex(null);
            setEditReason('');
            setEditAmount('');
        }
    };



    useEffect(() => {
        fetchTransactions();

        const intervalId = setInterval(fetchTransactions, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [id]);

    useEffect(() => {
        const filtered = transactions.filter(transaction =>
            transaction.reason.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTransactions(filtered);
    }, [searchTerm, transactions]);

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Search by reason"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3"
            />
            {
                filteredTransactions && <div className="row">
                    <div className="col-md-6">
                        <h3>Credits</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Reason</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((transaction, index) => (
                                    transaction.type === 'credit' && (
                                        <tr key={transaction.id}>
                                            <td>
                                                {editingIndex === index ? (
                                                    <input
                                                        type="text"
                                                        value={editReason}
                                                        onChange={(e) => setEditReason(e.target.value)}
                                                    />
                                                ) : (
                                                    transaction.reason
                                                )}
                                            </td>
                                            <td>
                                                {editingIndex === index ? (
                                                    <input
                                                        type="number"
                                                        value={editAmount}
                                                        onChange={(e) => setEditAmount(e.target.value)}
                                                    />
                                                ) : (
                                                    transaction.amount
                                                )}
                                            </td>
                                            <td>{formatDate(transaction.date).toLocaleString()}</td>
                                            <td>
                                                {editingIndex === index ? (
                                                    <>
                                                        <button onClick={() => saveEdit(transaction.id)}>Save</button>
                                                        <button onClick={() => setEditingIndex(null)}>Cancel</button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => {
                                                        setEditingIndex(index);
                                                        setEditReason(transaction.reason);
                                                        setEditAmount(transaction.amount);
                                                    }}>Edit</button>
                                                )}
                                            </td>
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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((transaction, index) => (
                                    transaction.type === 'debit' && (
                                        <tr key={transaction.id}>
                                            <td>
                                                {editingIndex === index ? (
                                                    <input
                                                        type="text"
                                                        value={editReason}
                                                        onChange={(e) => setEditReason(e.target.value)}
                                                    />
                                                ) : (
                                                    transaction.reason
                                                )}
                                            </td>
                                            <td>
                                                {editingIndex === index ? (
                                                    <input
                                                        type="number"
                                                        value={editAmount}
                                                        onChange={(e) => setEditAmount(e.target.value)}
                                                    />
                                                ) : (
                                                    transaction.amount
                                                )}
                                            </td>
                                            <td>{formatDate(transaction.date).toLocaleString()}</td>
                                            <td>
                                                {editingIndex === index ? (
                                                    <>
                                                        <button onClick={() => saveEdit(transaction.id)}>Save</button>
                                                        <button onClick={() => setEditingIndex(null)}>Cancel</button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => {
                                                        setEditingIndex(index);
                                                        setEditReason(transaction.reason);
                                                        setEditAmount(transaction.amount);
                                                    }}>Edit</button>
                                                )}
                                            </td>
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

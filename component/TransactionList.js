import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionList from '../component/TransactionAll';

const TransactionsPage = ({ id , setForm }) => {
   

    return (
        <div>
            <h1>Transactions</h1>
            {
                id && (
                    <TransactionList id={id} setForm={setForm} />
                )
            }
        </div>
    );
};

export default TransactionsPage;

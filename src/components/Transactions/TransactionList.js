// components/Transactions/TransactionList.js
import React from 'react';
import { Table } from 'react-bootstrap';
import TransactionItem from './TransactionItem';
import './Transactions.css';

const TransactionList = ({ 
  transactions = [], 
  onEditTransaction, 
  onDeleteTransaction 
}) => {
  return (
    <div className="transaction-list">
      <h3>Transactions</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <TransactionItem 
              key={transaction.id} 
              transaction={transaction}
              onEdit={onEditTransaction}
              onDelete={onDeleteTransaction}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionList;
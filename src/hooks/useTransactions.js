// hooks/useTransactions.js
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  
  const addTransaction = (transaction) => {
    context.dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const deleteTransaction = (id) => {
    context.dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const updateTransaction = (id, updates) => {
    context.dispatch({ 
      type: 'UPDATE_TRANSACTION', 
      payload: { id, updates } 
    });
  };

  return {
    transactions: context.state.transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction
  };
};
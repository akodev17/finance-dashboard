// context/AppContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const STORAGE_KEY = 'finance_transactions';

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    // Load initial transactions from localStorage
    const savedTransactions = localStorage.getItem(STORAGE_KEY);
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  
  const expenseCategories = [
    'food',
    'transport',
    'entertainment',
    'bills',
    'other'
  ];

  const incomeCategories = [
    'salary',
    'freelance',
    'investment',
    'other'
  ];

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    try {
      const newTransaction = {
        ...transaction,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        amount: parseFloat(transaction.amount)
      };

      setTransactions(prev => {
        const updated = [...prev, newTransaction];
        return updated;
      });

      return true; // Return success
    } catch (error) {
      console.error('Error adding transaction:', error);
      return false; // Return failure
    }
  };

  const editTransaction = (updatedTransaction) => {
    try {
      setTransactions(prev => 
        prev.map(t => t.id === updatedTransaction.id ? {
          ...updatedTransaction,
          amount: parseFloat(updatedTransaction.amount)
        } : t)
      );
      return true;
    } catch (error) {
      console.error('Error editing transaction:', error);
      return false;
    }
  };

  const deleteTransaction = (transactionId) => {
    try {
      setTransactions(prev => prev.filter(t => t.id !== transactionId));
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return false;
    }
  };

  // Add utility functions for transactions
  const getTransactionStats = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return { income, expenses, balance };
  };

  const getCategoryTotals = () => {
    const result = {
      income: {},
      expense: {}
    };

    transactions.forEach(transaction => {
      const { type, category, amount } = transaction;
      if (type === 'income') {
        result.income[category] = (result.income[category] || 0) + amount;
      } else {
        result.expense[category] = (result.expense[category] || 0) + amount;
      }
    });

    return result;
  };

  const value = {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    expenseCategories,
    incomeCategories,
    getTransactionStats,
    getCategoryTotals
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
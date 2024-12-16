// context/TransactionContext.js
import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { storage } from '../utils/storage';
import { calculateStats, getMonthlyData } from '../utils/calculations';

export const TransactionContext = createContext();

const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      return { 
        ...state, 
        transactions: [...state.transactions, action.payload]
      };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t => 
          t.id === action.payload.id ? action.payload : t
        )
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      };
    default:
      return state;
  }
};

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, {
    transactions: storage.get('TRANSACTIONS') || []
  });

  // Memorized actions
  const addTransaction = useCallback((transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    storage.set('TRANSACTIONS', [...state.transactions, transaction]);
  }, [state.transactions]);

  // Memorized calculations
  const stats = useMemo(() => 
    calculateStats(state.transactions), 
    [state.transactions]
  );

  const monthlyData = useMemo(() => 
    getMonthlyData(state.transactions), 
    [state.transactions]
  );

  const value = {
    transactions: state.transactions,
    addTransaction,
    stats,
    monthlyData
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
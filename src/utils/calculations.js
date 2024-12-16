// utils/calculations.js
export const calculateBalance = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        return acc + transaction.amount;
      } else {
        return acc - transaction.amount;
      }
    }, 0);
  };
  
  export const calculateExpensesByCategory = (transactions) => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      }, {});
  };
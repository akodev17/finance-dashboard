import React, { useState, useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import TransactionList from '../components/Transactions/TransactionList';
import TransactionFilter from '../components/Transactions/TransactionFilter';
import TransactionForm from '../components/Transactions/TransactionForm';
import EditTransactionModal from '../components/Transactions/EditTransactionModal';
import { AppContext } from '../context/AppContext';

const Transactions = () => {
  const { 
    transactions, 
    editTransaction, 
    deleteTransaction,
    expenseCategories,
    incomeCategories 
  } = useContext(AppContext);

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    type: 'all',
    minAmount: '',
    maxAmount: ''
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setShowEditModal(true);
  };

  const handleSaveEdit = (editedTransaction) => {
    editTransaction(editedTransaction);
    setShowEditModal(false);
    setSelectedTransaction(null);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const start = filters.startDate ? new Date(filters.startDate) : null;
    const end = filters.endDate ? new Date(filters.endDate) : null;
    
    if (start && transactionDate < start) return false;
    if (end && transactionDate > end) return false;
    if (filters.type !== 'all' && transaction.type !== filters.type) return false;
    if (filters.minAmount && transaction.amount < parseFloat(filters.minAmount)) return false;
    if (filters.maxAmount && transaction.amount > parseFloat(filters.maxAmount)) return false;
    
    return true;
  });

  return (
    <>
      <Row className="mb-4">
        <Col>
          <h1>Transactions</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <TransactionFilter 
                filters={filters} 
                onFilterChange={(field, value) => {
                  setFilters(prev => ({
                    ...prev,
                    [field]: value
                  }));
                }} 
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <TransactionList 
                transactions={filteredTransactions}
                onEditTransaction={handleEdit}
                onDeleteTransaction={deleteTransaction}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <TransactionForm />

      <EditTransactionModal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
        onSave={handleSaveEdit}
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
      />
    </>
  );
};

export default Transactions; 
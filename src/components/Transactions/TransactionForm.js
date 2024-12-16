// components/Transactions/TransactionForm.js
import React, { useState, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';
import './TransactionForm.css';

const TransactionForm = () => {
  const context = useContext(AppContext);
  // console.log('AppContext in TransactionForm:', context);
  const { addTransaction } = context;
  const [show, setShow] = useState(false);
  const [transaction, setTransaction] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    amount: '',
    description: '',
    category: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!transaction.date || !transaction.type || !transaction.category || !transaction.amount) {
      alert('Please fill in all required fields');
      return;
    }

    const success = addTransaction({
      ...transaction,
      amount: parseFloat(transaction.amount)
    });
    
    if (success) {
      handleClose();
      setTransaction({
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        amount: '',
        description: '',
        category: ''
      });
      // You could add a toast notification here
      // toast.success('Transaction added successfully!');
    } else {
      // toast.error('Failed to add transaction');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Button 
        variant="primary" 
        onClick={handleShow}
        className="add-transaction-btn"
      >
        + Add Transaction
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={transaction.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={transaction.type}
                onChange={handleChange}
                required
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={transaction.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {transaction.type === 'expense' ? (
                  <>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="bills">Bills</option>
                    <option value="other">Other</option>
                  </>
                ) : (
                  <>
                    <option value="salary">Salary</option>
                    <option value="freelance">Freelance</option>
                    <option value="investment">Investment</option>
                    <option value="other">Other</option>
                  </>
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={transaction.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                min="0"
                step="0.01"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={transaction.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Transaction
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TransactionForm;
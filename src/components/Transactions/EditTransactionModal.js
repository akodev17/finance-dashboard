import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditTransactionModal = ({ 
  show, 
  onHide, 
  transaction, 
  onSave,
  expenseCategories,
  incomeCategories 
}) => {
  const [editedTransaction, setEditedTransaction] = useState({
    date: '',
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    currency: 'USD'
  });

  useEffect(() => {
    if (transaction) {
      setEditedTransaction(transaction);
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTransaction);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={editedTransaction.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={editedTransaction.type}
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
              value={editedTransaction.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {editedTransaction.type === 'expense' 
                ? expenseCategories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))
                : incomeCategories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))
              }
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={editedTransaction.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Currency</Form.Label>
            <Form.Select
              name="currency"
              value={editedTransaction.currency}
              onChange={handleChange}
              required
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="UZS">UZS</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={editedTransaction.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTransactionModal; 
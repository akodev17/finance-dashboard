// components/Transactions/TransactionFilter.js
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const TransactionFilter = ({ filters, onFilterChange }) => {
  const {
    startDate = '',
    endDate = '',
    type = 'all',
    minAmount = '',
    maxAmount = ''
  } = filters || {};

  // Add date validation
  const handleDateChange = (field, value) => {
    // Ensure the dates make sense (start date isn't after end date)
    if (field === 'startDate' && endDate && new Date(value) > new Date(endDate)) {
      return; // Don't allow start date to be after end date
    }
    if (field === 'endDate' && startDate && new Date(value) < new Date(startDate)) {
      return; // Don't allow end date to be before start date
    }
    onFilterChange(field, value);
  };

  // Add amount validation
  const handleAmountChange = (field, value) => {
    const numValue = parseFloat(value);
    if (field === 'minAmount' && maxAmount && numValue > parseFloat(maxAmount)) {
      return; // Don't allow min amount to be greater than max amount
    }
    if (field === 'maxAmount' && minAmount && numValue < parseFloat(minAmount)) {
      return; // Don't allow max amount to be less than min amount
    }
    onFilterChange(field, value);
  };

  return (
    <Form className="transaction-filter mb-4">
      <Row>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={e => handleDateChange('startDate', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={e => handleDateChange('endDate', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Select
              value={type}
              onChange={e => onFilterChange('type', e.target.value)}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Min Amount</Form.Label>
            <Form.Control
              type="number"
              value={minAmount}
              onChange={e => handleAmountChange('minAmount', e.target.value)}
              placeholder="Min"
              min="0"
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Max Amount</Form.Label>
            <Form.Control
              type="number"
              value={maxAmount}
              onChange={e => handleAmountChange('maxAmount', e.target.value)}
              placeholder="Max"
              min={minAmount || "0"}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default TransactionFilter;
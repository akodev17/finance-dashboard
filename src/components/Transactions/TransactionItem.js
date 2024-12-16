// components/Transactions/TransactionItem.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { formatDate, formatCurrency } from '../../utils/formatters';

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const {
    date,
    category,
    amount,
    currency = 'USD',
    description,
    type
  } = transaction;

  return (
    <tr className={`transaction-item ${type}`}>
      <td>{formatDate(date)}</td>
      <td>{category}</td>
      <td className={type === 'income' ? 'text-success' : 'text-danger'}>
        {formatCurrency(amount, currency)}
      </td>
      <td>{currency}</td>
      <td>{description}</td>
      <td>
        <div className="d-flex gap-2">
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={() => onEdit?.(transaction)}
          >
            <FaEdit />
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={() => onDelete?.(transaction.id)}
          >
            <FaTrash />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionItem;
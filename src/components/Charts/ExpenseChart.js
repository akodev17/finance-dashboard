// components/Charts/ExpenseChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { formatCurrency } from '../../utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ data = {} }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Expense Distribution</Card.Title>
        {Object.keys(data).length > 0 ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <div className="text-center p-4">No expense data available</div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ExpenseChart;
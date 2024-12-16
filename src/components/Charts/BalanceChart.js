// components/Charts/BalanceChart.js
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatters';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BalanceChart = ({ income = 0, expenses = 0 }) => {
  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
      },
    ],
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
            return formatCurrency(context.raw);
          }
        }
      }
    }
  };

  return (
    <Card className="balance-chart">
      <Card.Body>
        <Card.Title>Income vs Expenses</Card.Title>
        <Doughnut data={chartData} options={options} />
        <div className="text-center mt-3">
          <div>Balance: {formatCurrency(income - expenses)}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BalanceChart;
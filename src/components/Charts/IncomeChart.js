// components/Charts/IncomeChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { formatCurrency } from '../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeChart = ({ data = {} }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Income by Category',
        data: Object.values(data),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return formatCurrency(context.raw);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return formatCurrency(value);
          }
        }
      }
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Income by Category</Card.Title>
        {Object.keys(data).length > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="text-center p-4">No income data available</div>
        )}
      </Card.Body>
    </Card>
  );
};

export default IncomeChart;
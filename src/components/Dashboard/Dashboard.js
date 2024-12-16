// components/Dashboard/Dashboard.js
import React, { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter';
import TransactionForm from '../Transactions/TransactionForm';
import TransactionList from '../Transactions/TransactionList';
import TransactionFilter from '../Transactions/TransactionFilter';
import ExpenseChart from '../Charts/ExpenseChart';
import IncomeChart from '../Charts/IncomeChart';
import BalanceChart from '../Charts/BalanceChart';
import { formatCurrency } from '../../utils/formatters';
import { AppContext } from '../../context/AppContext';
import './Dashboard.css';

const Dashboard = () => {
  const { transactions } = useContext(AppContext);
  const [filters, setFilters] = React.useState({
    startDate: '',
    endDate: '',
    type: 'all',
    minAmount: '',
    maxAmount: ''
  });

  const [incomeData, setIncomeData] = React.useState([]);
  const [expenseData, setExpenseData] = React.useState([]);
  const [totalIncome, setTotalIncome] = React.useState(0);
  const [totalExpenses, setTotalExpenses] = React.useState(0);

  React.useEffect(() => {
    if (!transactions) return; // Guard clause for when transactions is undefined

    // Filter your transactions based on the filter values
    const filteredTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const start = filters.startDate ? new Date(filters.startDate) : null;
      const end = filters.endDate ? new Date(filters.endDate) : null;
      
      // Date filter
      if (start && transactionDate < start) return false;
      if (end && transactionDate > end) return false;
      
      // Type filter
      if (filters.type !== 'all' && transaction.type !== filters.type) return false;
      
      // Amount filter
      if (filters.minAmount && transaction.amount < parseFloat(filters.minAmount)) return false;
      if (filters.maxAmount && transaction.amount > parseFloat(filters.maxAmount)) return false;
      
      return true;
    });

    // Update your filtered data
    const incomeTransactions = filteredTransactions.filter(t => t.type === 'income');
    const expenseTransactions = filteredTransactions.filter(t => t.type === 'expense');
    
    setIncomeData(incomeTransactions);
    setExpenseData(expenseTransactions);
    setTotalIncome(incomeTransactions.reduce((sum, t) => sum + t.amount, 0));
    setTotalExpenses(expenseTransactions.reduce((sum, t) => sum + t.amount, 0));
  }, [filters, transactions]);

  return (
    <Container fluid className="dashboard py-4">
      <Row className="dashboard-header">
        <Col>
          <h1 className="mb-4">Financial Dashboard</h1>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col lg={4}>
          <div className="card stats-card">
            <h3>Total Balance</h3>
            <div className="value">{formatCurrency(totalIncome - totalExpenses)}</div>
          </div>
        </Col>
        <Col lg={4}>
          <div className="card stats-card">
            <h3>Total Income</h3>
            <div className="value text-success">{formatCurrency(totalIncome)}</div>
          </div>
        </Col>
        <Col lg={4}>
          <div className="card stats-card">
            <h3>Total Expenses</h3>
            <div className="value text-danger">{formatCurrency(totalExpenses)}</div>
          </div>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col lg={4}>
          <CurrencyConverter />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <TransactionFilter 
            filters={filters} 
            onFilterChange={(field, value) => {
              setFilters(prev => ({
                ...prev,
                [field]: value
              }));
            }} 
          />
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Recent Transactions</h2>
              <TransactionList />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <div className="chart-container">
            <ExpenseChart data={expenseData} />
          </div>
        </Col>
        <Col md={4}>
          <div className="chart-container">
            <IncomeChart data={incomeData} />
          </div>
        </Col>
        <Col md={4}>
          <div className="chart-container">
            <BalanceChart 
              income={totalIncome} 
              expenses={totalExpenses} 
            />
          </div>
        </Col>
      </Row>

      <TransactionForm />
    </Container>
  );
};

export default Dashboard;
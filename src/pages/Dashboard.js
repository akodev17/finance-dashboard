import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import { formatCurrency } from "../utils/formatters";
import ExpenseChart from "../components/Charts/ExpenseChart";
import IncomeChart from "../components/Charts/IncomeChart";
import BalanceChart from "../components/Charts/BalanceChart";
import TransactionList from "../components/Transactions/TransactionList";
import TransactionFilter from "../components/Transactions/TransactionFilter";
import EditTransactionModal from "../components/Transactions/EditTransactionModal";

const Dashboard = () => {
  const {
    transactions,
    editTransaction,
    deleteTransaction,
    expenseCategories,
    incomeCategories,
    getTransactionStats,
    getCategoryTotals,
  } = useContext(AppContext);

  const { income: totalIncome, expenses: totalExpenses } =
    getTransactionStats();
  const categoryTotals = getCategoryTotals();

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "all",
    minAmount: "",
    maxAmount: "",
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

  return (
    <>
      <Row className="g-4 mb-4">
        <Col md={4}>
          <div className="stats-card">
            <h3>Total Income</h3>
            <div className="value text-success">
              {formatCurrency(totalIncome)}
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stats-card">
            <h3>Total Expenses</h3>
            <div className="value text-danger">
              {formatCurrency(totalExpenses)}
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stats-card">
            <h3>Balance</h3>
            <div className="value">
              {formatCurrency(totalIncome - totalExpenses)}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <TransactionFilter filters={filters} onFilterChange={setFilters} />
        </Col>
      </Row>

      <Row>
        <Col>
          <TransactionList
            transactions={transactions}
            onEditTransaction={handleEdit}
            onDeleteTransaction={deleteTransaction}
          />
        </Col>
      </Row>

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

      <Row className="mb-4">
        <Col md={4}>
          <div className="chart-container">
            <ExpenseChart data={categoryTotals.expense} />
          </div>
        </Col>
        <Col md={4}>
          <div className="chart-container">
            <IncomeChart data={categoryTotals.income} />
          </div>
        </Col>
        <Col md={4}>
          <div className="chart-container">
            <BalanceChart income={totalIncome} expenses={totalExpenses} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;

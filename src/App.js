// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import CurrencyConverter from './pages/CurrencyConverter';
import Settings from './pages/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/converter" element={<CurrencyConverter />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </MainLayout>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
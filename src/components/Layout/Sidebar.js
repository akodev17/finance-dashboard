import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaChartLine, 
  FaExchangeAlt, 
  FaHistory, 
  FaCog,
  FaWallet,
  FaTimes
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <FaWallet className="logo" />
        <h3>FinanceApp</h3>
        <button className="close-btn d-lg-none" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      
      <Nav className="flex-column">
        <Nav.Link 
          as={Link} 
          to="/" 
          className={isActive('/') ? 'active' : ''}
        >
          <FaChartLine /> Dashboard
        </Nav.Link>
        
        <Nav.Link 
          as={Link} 
          to="/transactions" 
          className={isActive('/transactions') ? 'active' : ''}
        >
          <FaHistory /> Transactions
        </Nav.Link>
        
        <Nav.Link 
          as={Link} 
          to="/converter" 
          className={isActive('/converter') ? 'active' : ''}
        >
          <FaExchangeAlt /> Currency Converter
        </Nav.Link>
        
        <Nav.Link 
          as={Link} 
          to="/settings" 
          className={isActive('/settings') ? 'active' : ''}
        >
          <FaCog /> Settings
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar; 
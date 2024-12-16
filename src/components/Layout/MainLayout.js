import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Header from './Header';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="main-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />
        <Container fluid className="px-4">
          {children}
        </Container>
      </div>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default MainLayout; 
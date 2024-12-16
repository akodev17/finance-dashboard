import React from 'react';
import { Container, Navbar, Nav, Form } from 'react-bootstrap';
import { FaSearch, FaBell, FaUserCircle, FaBars } from 'react-icons/fa';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <Navbar className="app-header" expand>
      <Container fluid>
        <button className="sidebar-toggle d-lg-none" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <Form className="search-form">
          <div className="search-input">
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>
        </Form>

        <Nav className="ms-auto">
          <ThemeToggle />
          <Nav.Link className="notification-btn">
            <FaBell />
            <span className="notification-badge">3</span>
          </Nav.Link>
          <Nav.Link className="profile-btn d-none d-md-flex">
            <FaUserCircle />
            <span>Akromjon Rahimjonov</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header; 
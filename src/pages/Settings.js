import React from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <>
      <Row className="mb-4">
        <Col>
          <h1>Settings</h1>
        </Col>
      </Row>
      
      <Row>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <h4 className="mb-4">Appearance</h4>
              
              <Form.Check 
                type="switch"
                id="theme-switch"
                checked={darkMode}
                onChange={toggleTheme}
                className="mb-3"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Settings; 
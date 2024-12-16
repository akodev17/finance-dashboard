import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CurrencyConverterComponent from '../components/CurrencyConverter/CurrencyConverter';

const CurrencyConverter = () => {
  return (
    <>
      <Row className="mb-4">
        <Col>
          <h1>Currency Converter</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={6} className="mx-auto">
          <CurrencyConverterComponent />
        </Col>
      </Row>
    </>
  );
};

export default CurrencyConverter; 
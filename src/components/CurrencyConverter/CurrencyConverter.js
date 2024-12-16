import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Spinner } from 'react-bootstrap';
import { getCurrencyRates, convertCurrency } from '../../services/currencyApi';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UZS');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState(null);
  const [error, setError] = useState(null);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'UZS', 'RUB'];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const ratesData = await getCurrencyRates(fromCurrency);
        setRates(ratesData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch rates');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    // Real-time updates every 5 minutes
    const interval = setInterval(fetchRates, 300000);
    return () => clearInterval(interval);
  }, [fromCurrency]);

  const handleConvert = async (e) => {
    e.preventDefault();
    if (!amount) return;

    try {
      setLoading(true);
      const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);
      setResult(convertedAmount);
      setError(null);
    } catch (err) {
      setError('Conversion failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="currency-converter">
      <Card.Body>
        <Card.Title>Currency Converter</Card.Title>
        
        {/* Current Rates Display */}
        {rates && (
          <div className="current-rates mb-4">
            <h5>Current Rates (1 {fromCurrency})</h5>
            <Row>
              {currencies.map(currency => (
                currency !== fromCurrency && (
                  <Col key={currency} xs={6} md={4} className="rate-item">
                    <span className="currency">{currency}:</span>
                    <span className="value">{rates[currency]?.toFixed(2)}</span>
                  </Col>
                )
              ))}
            </Row>
          </div>
        )}

        <Form onSubmit={handleConvert}>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>From</Form.Label>
                <Form.Select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col>
              <Form.Group>
                <Form.Label>To</Form.Label>
                <Form.Select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <button 
            className="convert-btn" 
            type="submit"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" animation="border" /> : 'Convert'}
          </button>

          {error && (
            <div className="error mt-3 text-danger">
              {error}
            </div>
          )}

          {result && (
            <div className="result mt-3">
              <h4>
                {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
              </h4>
            </div>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CurrencyConverter; 
// hooks/useCurrency.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCurrency = (baseCurrency) => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_KEY}/latest/${baseCurrency}`
        );
        setRates(response.data.conversion_rates);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  return { rates, loading, error };
};
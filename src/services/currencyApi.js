const API_KEY = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_KEY || !BASE_URL) {
  console.error('Missing required environment variables');
}

export const getCurrencyRates = async (baseCurrency = 'USD') => {
  try {
    if (!API_KEY || !BASE_URL) {
      throw new Error('API configuration is missing');
    }
    
    const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
    if (!response.ok) {
      throw new Error('Failed to fetch currency rates');
    }
    
    const data = await response.json();
    return data.conversion_rates;
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
};

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    const rates = await getCurrencyRates(fromCurrency);
    const rate = rates[toCurrency];
    if (!rate) {
      throw new Error('Invalid currency conversion rate');
    }
    return amount * rate;
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
}; 
// utils/api.js
import axios from 'axios';

const API_KEY = "770f3ff9c8628657a6ddb5f5";
const BASE_URL = 'https://v6.exchangerate-api.com/v6/';

export const getCurrencyRates = async (baseCurrency) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${API_KEY}/latest/${baseCurrency}`
    );
    return response.data.conversion_rates;
  } catch (error) {
    throw new Error('Valyuta kurslarini olishda xatolik');
  }
};
// Format currency with the specified locale and currency code
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Format date to a readable string
export const formatDate = (date, locale = 'en-US') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format time to a readable string
export const formatTime = (date, locale = 'en-US') => {
  return new Date(date).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format date and time together
export const formatDateTime = (date, locale = 'en-US') => {
  return `${formatDate(date, locale)} ${formatTime(date, locale)}`;
};

// Format percentage
export const formatPercentage = (value, decimals = 2, locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

// Format number with thousand separators
export const formatNumber = (number, locale = 'en-US') => {
  return new Intl.NumberFormat(locale).format(number);
}; 
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api/v1';

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Watchlist API
export const getWatchlist = async () => {
  const { data } = await apiClient.get('/watchlist');
  return data;
};

// Stock Research API
export const getStockData = async (ticker: string) => {
  const { data } = await apiClient.get(`/company/${ticker}`);
  return data;
};

// Research Progress API
export const getResearchProgress = async (ticker: string) => {
  const { data } = await apiClient.get(`/research/${ticker}/progress`);
  return data;
};

// Market API
export const getMarketMood = async () => {
  const { data } = await apiClient.get('/market/mood');
  return data;
};

// Compare Stocks API
export const getCompareStocks = async (tickers: string[]) => {
  const { data } = await apiClient.get(`/compare?tickers=${tickers.join(',')}`);
  return data;
};

// Chat API
export const sendChatMessage = async (ticker: string, message: string) => {
  const { data } = await apiClient.post(`/chat`, { ticker, message });
  return data;
};

export default apiClient;

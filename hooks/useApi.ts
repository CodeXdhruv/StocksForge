import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useMemo, useCallback } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api/v1';

export function useApi() {
  const { getToken, isSignedIn } = useAuth();

  const apiClient = useMemo(() => {
    const client = axios.create({
      baseURL: BACKEND_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    client.interceptors.request.use(async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error fetching Clerk auth token", error);
      }
      return config;
    });

    return client;
  }, [getToken]);

  const getWatchlist = useCallback(async () => {
    if (!isSignedIn) return { success: true, data: { watchlist: [] } };
    const { data } = await apiClient.get('/watchlist');
    return data;
  }, [apiClient, isSignedIn]);

  const getStockData = useCallback(async (ticker: string) => {
    const { data } = await apiClient.get(`/company/${ticker}`);
    return data;
  }, [apiClient]);

  const getResearchProgress = useCallback(async (ticker: string) => {
    const { data } = await apiClient.get(`/research/${ticker}/progress`);
    return data;
  }, [apiClient]);

  const getCompareStocks = useCallback(async (tickers: string[]) => {
    const { data } = await apiClient.get(`/compare?tickers=${tickers.join(',')}`);
    return data;
  }, [apiClient]);

  const sendChatMessage = useCallback(async (ticker: string, message: string) => {
    const { data } = await apiClient.post(`/chat`, { ticker, message });
    return data;
  }, [apiClient]);

  const startResearch = useCallback(async (ticker: string, onProgress?: (data: any) => void) => {
    const token = await getToken();
    const res = await fetch(`${BACKEND_URL}/research/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ ticker, stream: true })
    });
    
    if (!res.body) throw new Error("No readable stream");
    
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let finalData = null;
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const parsed = JSON.parse(line.slice(6));
            if (parsed.type === 'final') {
              finalData = parsed.output;
            }
            if (onProgress) {
              onProgress(parsed);
            }
          } catch (e) {
            console.error("Error parsing SSE line", e);
          }
        }
      }
    }
    
    return { data: finalData };
  }, [getToken]);

  const getMarketOverview = useCallback(async (category: string = 'Overview') => {
    const { data } = await apiClient.get(`/market/overview?category=${category}`);
    return data;
  }, [apiClient]);

  const getAdvancedCompare = useCallback(async (t1: string, t2: string) => {
    const { data } = await apiClient.get(`/compare?tickers=${t1},${t2}&mode=advanced`);
    return data;
  }, [apiClient]);

  return {
    apiClient,
    getWatchlist,
    getStockData,
    getResearchProgress,
    getCompareStocks,
    getAdvancedCompare,
    sendChatMessage,
    startResearch,
    getMarketOverview,
  };
}

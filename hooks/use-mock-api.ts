import { useState, useCallback } from 'react';
import to from 'await-to-js';
import axios, { AxiosRequestConfig } from 'axios';

interface MockApiOptions {
  delay?: number;
  shouldError?: boolean;
  errorMessage?: string;
  errorCode?: number;
}

interface MockApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (
    url: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    payload?: any,
    config?: AxiosRequestConfig,
    options?: MockApiOptions
  ) => Promise<T | null>;
}

export function useMockApi<T = any>(): MockApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (
      url: string,
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
      payload: any = null,
      config: AxiosRequestConfig = {},
      options: MockApiOptions = {}
    ) => {
      setLoading(true);
      setError(null);
      setData(null);

      const { delay = 1000, shouldError = false, errorMessage = 'Mock API Error', errorCode = 500 } = options;

      await new Promise((resolve) => setTimeout(resolve, delay)); // Simulate network delay

      if (shouldError) {
        setError(errorMessage);
        setLoading(false);
        throw new Error(errorMessage); // Propagate error for try/catch
      }

      let mockResponseData: T | null = null;
      // In a real scenario, you'd have more sophisticated mock data handling
      // For now, we'll return a generic success message or the payload
      if (method === 'POST' || method === 'PUT') {
        mockResponseData = { status: 'success', message: 'Operation successful', ...payload } as T;
      } else if (method === 'DELETE') {
        mockResponseData = { status: 'success', message: 'Deletion successful' } as T;
      } else {
        // GET request - return some dummy data or a generic success
        mockResponseData = { status: 'success', message: 'Data fetched successfully', url, method } as T;
      }

      setData(mockResponseData);
      setLoading(false);
      return mockResponseData;
    },
    []
  );

  return { data, loading, error, fetchData };
}

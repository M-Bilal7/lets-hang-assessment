import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/client';
import { Background } from '@/lib/types/api';

export const useBackgrounds = () => {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBackgrounds();
  }, []);

  const loadBackgrounds = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getBackgrounds();
      if (response.data && Array.isArray(response.data)) {
        setBackgrounds(response.data as Background[]);
      }
    } catch (err) {
      console.error('Failed to load backgrounds:', err);
      setError('Failed to load backgrounds');
    } finally {
      setLoading(false);
    }
  };

  return { backgrounds, loading, error, refetch: loadBackgrounds };
};
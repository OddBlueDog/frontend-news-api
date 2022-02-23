import { useQuery } from 'react-query';
import { axiosInstance } from '../common/ApiBase';

// Types
export type availableFilters = { q?: string };

// React-query keys
export const newsKeys = {
  all: ['news'] as const,
  allFiltered: (filters?: availableFilters) => [...newsKeys.all, filters] as const,
};

// API routes
const getMany = async (filters?: availableFilters) => {
  const response = await axiosInstance.get(`/news/`, { params: filters });
  return response.data;
};

// Custom hooks
export const useGetNewsQuery = (filters?: availableFilters) =>
  useQuery(newsKeys.allFiltered(filters), () => getMany(filters), {
    refetchOnWindowFocus: false,
  });

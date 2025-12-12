// src/hooks/useAdminStats.jsx
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAdminStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading, error, refetch } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/dashboard-stats');
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  return { stats, isLoading, error, refetch };
};

export default useAdminStats;

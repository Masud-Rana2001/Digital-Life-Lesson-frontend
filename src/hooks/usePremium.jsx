import { useQuery } from "@tanstack/react-query";


import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

export default function usePremium() {
  const { loading } = useAuth(); 
const axiosInstance = useAxiosSecure()

  const { data: isPremium, isLoading: isPremiumLoading } = useQuery({
    queryKey: ["isPremium"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosInstance.get("/isPremium");
      return res.data.isPremium;     
    },
  });
 

  return { isPremium, isPremiumLoading };
}



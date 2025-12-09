import { useQuery } from "@tanstack/react-query";


import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

export default function useRole() {
  const { loading } = useAuth(); 
const axiosInstance = useAxiosSecure()

  const { data: role, isLoading: isRoleLoading } = useQuery({
    queryKey: ["role"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosInstance.get("/role");
      return res.data.role;     
    },
  });
 

  return { role, isRoleLoading };
}



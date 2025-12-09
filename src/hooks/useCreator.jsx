import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useCreator(email) {
  const axiosSecure = useAxiosSecure();

  const {data :creator={}, refetch:creatorRefetch} = useQuery({
    queryKey: ["creator", email],
    enabled: !!email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-by-email/${email}`);
      return res.data;
    },
  });

  return {creator, creatorRefetch,}; 
}

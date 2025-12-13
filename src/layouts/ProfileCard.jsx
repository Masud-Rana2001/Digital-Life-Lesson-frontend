import React from "react";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../hooks/useAxiosSecure';
import useAuth from './../hooks/useAuth';
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { toast } from 'react-hot-toast';
import { RiLogoutCircleLine } from "react-icons/ri";
const ProfileCard = ({logOut}) => {
  const axiosSecure = useAxiosSecure();
  const {user,loading} = useAuth()
  const { data:userDB, refetch:userDBRfetch,isLoading } = useQuery({
    queryKey: ["userDB",user?.email ],
    queryFn: async () => {
     
      const res = await axiosSecure.get(`/single-user`);
      return res.data;
    },
  });
  console.log("userDB",userDB)
  if(loading || isLoading) return <LoadingSpinner/>
  return (
    <div className="w-50 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl p-4 text-center shadow-lg">
      
      <div className="relative flex justify-center">
        <div className="w-18 h-18 rounded-full bg-white p-1">
          <img
            src={userDB?.imageURL}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <div>
      <h3 className="mt-4 text-lg font-semibold text-white">
        {userDB?.name}
      </h3>

      <p className="text-sm text-white/80">
        {userDB?.role}
        </p>
        <button
            onClick={() => {
              logOut();
              toast.success("Logout successful");
            }}
            className="flex gap-2 items-center btn btn-sm  rounded-full btn-error text-white mt-2 "
          >
            <RiLogoutCircleLine className="size-5" /> Logout
          </button>

      </div>
    </div>
  );
};

export default ProfileCard;

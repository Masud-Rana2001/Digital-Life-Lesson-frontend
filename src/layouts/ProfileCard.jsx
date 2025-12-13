import React from "react";
import { FaBook, FaHome, FaUserTie } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../hooks/useAxiosSecure';
import useAuth from './../hooks/useAuth';
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { toast } from 'react-hot-toast';
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from 'react-router';
import useRole from './../hooks/useRole';
const ProfileCard = ({logOut}) => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth()
  const {role} = useRole()
  const { data:userDB, refetch:userDBRfetch,isLoading } = useQuery({
    queryKey: ["userDB",user?.email ],
    queryFn: async () => {
     
      const res = await axiosSecure.get(`/single-user`);
      return res.data;
    },
  });
  console.log(userDB)
  if(loading || isLoading) return <LoadingSpinner/>
  return (
    <div className="w-55 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl py-4 px-2 text-center shadow-lg flex flex-col">

      <div className="flex justify-between items-center gap-2">

      <div className="relative flex justify-center">
        <div className="w-18 h-18 rounded-full bg-white p-1">
          <img
            src={userDB?.imageUrl || userDB.imageURL}
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
        </div>
        
      </div>


      <div className="flex gap-1">
       

        <Link
            to="/dashboard/profile"
            className="flex gap-1 items-center btn btn-sm  rounded-full btn-info text-white mt-2 "
          >
            
            <FaUserTie className="size-5" />
            {
               role === "user" ? "My Profile" : " Profile"}
          </Link>
        <button
            onClick={() => {
              logOut();
              toast.success("Logout successful");
            }}
            className="flex gap-1 items-center btn btn-sm  rounded-full btn-error text-white mt-2 "
          >
            <RiLogoutCircleLine className="size-5" /> Logout
          </button>
        </div>

      


    </div>
  );
};

export default ProfileCard;

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "./../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import UserDataRow from "./UserDataRow";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const { data, isLoading ,refetch} = useQuery({
    queryKey: ["allUsers", page], 
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-users?page=${page}&limit=${6}`
      );
      return res.data;
    }
  });

  const { users = [], totalPages = 1 } = data || {};
  console.log("data",data)

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full px-2 sm:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        👥 Manage Users
      </h1>

      {users.length === 0 ? (
        <p className="text-center py-10 border border-dashed rounded-lg">
          No users found.
        </p>
      ) : (
        <>
          {/* Responsive Table */}
          <div className="relative -mx-2 sm:mx-0 overflow-x-auto">
            <table className="table table-xs min-w-[500px]">
              <thead>
                <tr>
                  <th>SI</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created Lessons</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <UserDataRow
                    key={user._id}
                    user={user}
                    index={index}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 gap-2">
            <button
              className="btn btn-outline"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              Prev
            </button>

            <span className="px-4 py-2 font-semibold">
              Page {page} / {totalPages}
            </span>

            <button
              className="btn btn-outline"
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;

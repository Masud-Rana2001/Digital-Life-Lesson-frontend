import  Swal  from 'sweetalert2';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UpdateUserRoleModal from "../../../components/Modal/UpdateUserRoleModal";

const UserDataRow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [], isLoading, refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users`);
      return res.data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };
  

const handleDeleteUser = async (userId, userEmail) => {
        
        
        const result = await Swal.fire({
            title: `Delete ${userEmail}?`,
            text: "Are you sure you want to permanently delete this user? This action is irreversible and will delete all associated lessons, reports, likes, and comments!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33", 
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete user!",
            cancelButtonText: "No, cancel"
        });

 
        if (result.isConfirmed) {
            
            
            const loadingSwal = Swal.fire({
                title: 'Processing...',
                text: `Deleting user ${userEmail} and cleaning up data. Please wait.`,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            try {
          
                const response = await axiosSecure.delete(`/delete-user/${userId}`);

                loadingSwal.close(); 

              if (response.data.userDeleted > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: `User ${userEmail} and all related data deleted successfully.`,
                  icon: "success",
                });
                refetch()
                    
                    
                    
                    console.log("Deletion Details:", response.data);
                    
                } else {
                    
                    Swal.fire({
                        title: "Not Found",
                        text: `User ${userEmail} was not found or could not be deleted.`,
                        icon: "info",
                    });
                }

            } catch (error) {
                
                loadingSwal.close(); 

                console.error("Error during user deletion:", error);
                const errorMessage = error.response?.data?.message || "Failed to delete user due to a server error.";
                
                Swal.fire({
                    title: "Error!",
                    text: `Deletion failed: ${errorMessage}`,
                    icon: "error",
                });
            }
        }
    };

  return (
    <>
      {allUsers.map((user) => (
        <tr key={user._id}>
          <td className="px-5 py-5 border-b border-gray-300 bg-white">{user.name}</td>
          <td className="px-5 py-5 border-b border-gray-300 bg-white">{user.email}</td>
          <td className="px-5 py-5 border-b border-gray-300 bg-white">{user.role}</td>
          <td className="px-5 py-5 border-b border-gray-300 bg-white text-center">
            {user.myLesson?.length || 0}
          </td>

          <td className="px-5 py-5 border-b border-gray-300 bg-white ">
            <div className="flex gap-2">
            <button
              onClick={() => openModal(user)}
              className="btn btn-outline btn-secondary btn-sm"
            >
              Update Role
            </button>

              <button
                onClick={()=>handleDeleteUser(user._id, user.email)}
                className="btn btn-outline btn-error btn-sm">Delete</button>

            </div>
          </td>
        </tr>
      ))}

      {/* Modal only renders when selectedUser exists */}
      {selectedUser && (
        <UpdateUserRoleModal
          isOpen={isOpen}
          closeModal={closeModal}
          user={selectedUser}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default UserDataRow;

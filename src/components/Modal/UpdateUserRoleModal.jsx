import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedRole, setUpdatedRole] = useState(user?.role || "user");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setUpdatedRole(user.role);
  }, [user]);

  const handleUpdateRole = async (e) => {
    e.preventDefault();

    if (updatedRole === user.role) {
      toast.success("Role already up-to-date.");
      closeModal();
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Updating role...");

    try {
      const res = await axiosSecure.patch(
        `/update-user-role/${user.email}?role=${updatedRole}`
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Role updated successfully!", { id: toastId });
        refetch();
        closeModal();
      } else {
        toast.error("No change made.", { id: toastId });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating role.", {
        id: toastId,
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full">
          <DialogTitle className="text-xl font-semibold border-b pb-2 mb-4">
            Update Role:
            <span className="text-blue-600 font-bold ml-1">{user.email}</span>
          </DialogTitle>

          <form onSubmit={handleUpdateRole}>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Current Role:
              <span className="font-bold ml-1">{user.role}</span>
            </label>

            <select
              value={updatedRole}
              onChange={(e) => setUpdatedRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isSubmitting ? "Updating..." : "Update Role"}
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateUserRoleModal;

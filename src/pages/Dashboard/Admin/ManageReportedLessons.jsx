import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";

import LoadingSpinner from "./../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

function ManageReportedLessons() {
  const axiosSecure = useAxiosSecure();
  const detailsModal = useRef(null);

  const [selectedReports, setSelectedReports] = useState([]);
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["reportedLessonsAdmin", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/reported-lessons?page=${page}&limit=6`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const reportedLessons = data?.reportedLessons || [];
  const totalPages = data?.totalPages || 1;

  const handleShowReportDetails = async (lessonId) => {
    const res = await axiosSecure.get(`/admin/reports/lesson/${lessonId}`);
    setSelectedReports(res.data);
    detailsModal.current.showModal();


  };





   const handleDeleteLesson = async (lessonId) => {
        const result = await Swal.fire({
            title: "Are you sure to delete this reported lesson?",
            text: "This will permanently remove the lesson and all associated reports.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it permanently!"
        });
        
        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/admin/lessons/${lessonId}`);
                
                Swal.fire({
                    title: "Deleted!",
                    text: "Lesson and all reports have been permanently deleted.",
                    icon: "success"
                });
                refetch();
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete lesson.', });
            }
        }
    };


      const handleIgnoreReports = async (lessonId) => {
        const result = await Swal.fire({
            title: "Are you sure to ignore all reports?",
            text: "This will remove the lesson from the reported list.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Ignore Reports"
        });
        
        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/admin/reports/lesson/${lessonId}`); 
                
                Swal.fire({
                    title: "Ignored!",
                    text: "Reports have been cleared for this lesson.",
                    icon: "success"
                });
                refetch();
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to ignore reports.', });
            }
        }
    };




  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full px-2 sm:px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-red-600">
        🚨 Reported Lessons Management
      </h1>

      {reportedLessons.length === 0 ? (
        <p className="text-center py-10 border border-dashed rounded-lg">
          🎉 No reported lessons found.
        </p>
      ) : (
        <div className="relative -mx-2 sm:mx-0 overflow-x-auto">
          <table className="table table-xs min-w-[500px]">
            <thead>
              <tr>
                <th>SI</th>
                <th>Lesson</th>
                <th>Reports</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportedLessons.map((lesson, index) => (
                <tr key={lesson._id}>
                  <td>{(page - 1) * 6 + index + 1}</td>

                  <td className="max-w-[120px] truncate">
                    <p className="font-medium truncate">{lesson.title}</p>
                    <p className="text-xs text-gray-400 truncate">
                      ID: {lesson._id}
                    </p>
                  </td>

                  <td>
                    <span className="badge badge-error">{lesson.reportCount}</span>
                  </td>

                  <td>
                    <button
                      onClick={() => handleShowReportDetails(lesson._id)}
                      className="btn btn-xs sm:btn-sm btn-info text-white"
                    >
                      <MdInfoOutline />
                      <span className="hidden sm:inline ml-1">Details</span>
                    </button>
                  </td>

                  <td>
                    <div className="flex flex-col gap-1 min-w-[110px]">
                      <button
                       onClick={() => handleDeleteLesson(lesson._id)}
                        className="btn btn-xs btn-error text-white">
                        <RiDeleteBin5Fill />
                        <span className="hidden sm:inline ml-1">Delete</span>
                      </button>
                      <button
                       onClick={() => handleIgnoreReports(lesson._id)}
                        className="btn btn-xs btn-outline btn-warning">               
                        Ignore
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
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
          )}
        </div>
      )}

      {/* Modal */}
      <dialog ref={detailsModal} className="modal">
        <div className="modal-box max-w-lg">
          <button
            onClick={() => detailsModal.current.close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {selectedReports.map((r, i) => (
              <div key={r._id} className="p-3 border rounded">
                <p className="font-bold text-red-600">
                  Report #{i + 1}: {r.reason}
                </p>
                <p>{r.details}</p>
                <p className="text-xs text-gray-500">{r.reporterEmail}</p>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ManageReportedLessons;

import { useState,useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";

import useAxiosSecure from './../../../hooks/useAxiosSecure';
import LoadingSpinner from './../../../components/Shared/LoadingSpinner';


function ManageReportedLessons() {
    const axiosSecure = useAxiosSecure();
    const detailsModal = useRef(null)
    
    const [selectedReports, setSelectedReports] = useState([]);
  
  console.log("selectedReports",selectedReports)
    const { data: reportedLessons = [], isLoading, refetch } = useQuery({
        queryKey: ["reportedLessonsAdmin"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/reported-lessons`); 
            return res.data;
        },
    });

    const handleShowReportDetails = async (lessonId) => {
        try {
            const res = await axiosSecure.get(`/admin/reports/lesson/${lessonId}`);
            setSelectedReports(res.data);
            
         
          detailsModal.current.showModal()
        } catch (error) {
            console.error("Error fetching report details:", error);
            Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch report details.', });
        }
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

    if (isLoading) return <LoadingSpinner/>

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-red-600">🚨 Reported Lessons Management</h1>

            {reportedLessons.length === 0 ? (
                <p className="text-gray-600 text-center py-10 border border-dashed p-10 rounded-lg">
                    🎉 No reported lessons found. The community is clean!
                </p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>SI</th>
                                <th>Lesson Title</th>
                                <th className="text-center">Report Count</th>
                                <th className="text-center">Details</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportedLessons.map((lesson, index) => (
                                <tr key={lesson._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="font-bold">{lesson.title}</div>
                                        <div className="text-xs opacity-50">ID: {lesson._id}</div>
                                    </td>
                                    <td className="text-center">
                                        <span className="badge badge-error text-white font-bold">
                                            {lesson.reportCount}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => handleShowReportDetails(lesson._id)}
                                            className="btn btn-sm btn-info text-white"
                                        >
                                            <MdInfoOutline className="size-5" /> Details
                                        </button>
                                    </td>
                                    <td className="flex flex-col gap-1 items-center">
                                        <button
                                            onClick={() => handleDeleteLesson(lesson._id)}
                                            className="btn btn-xs btn-error text-white"
                                        >
                                            <RiDeleteBin5Fill /> Delete Lesson
                                        </button>
                                        
                                        <button
                                            onClick={() => handleIgnoreReports(lesson._id)}
                                            className="btn btn-xs btn-outline btn-warning"
                                        >
                                            Ignore
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        )}
        

<dialog  ref={detailsModal} className="modal">
  <div className="modal-box">
            <button
              onClick={()=>detailsModal.current.close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
   
           <div className="space-y-4 max-h-96 overflow-y-auto p-2">
                        {selectedReports.length === 0 ? (
                            <p className="text-gray-500">No report details available.</p>
                        ) : (
                            selectedReports.map((report, idx) => (
                                <div key={report._id} className="p-4 border rounded-lg bg-gray-50">
                                    <p className="font-bold text-red-600">Report #{idx + 1}: {report.reason}</p>
                                    <p className=" "> {report.details}</p>
                                    <p className="text-sm text-gray-600">Reported By: {report.reporterEmail}</p>
                                    <p className="text-xs text-gray-400">Date: {new Date(report.reportedAt).toLocaleDateString()}</p>
                                </div>
                            ))
                        )}
                    </div>
          </div>
          <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
    
  
</dialog>
            
            
        </div>
    );
}

export default ManageReportedLessons;

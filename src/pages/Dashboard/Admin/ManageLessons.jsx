
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { MdInfoOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaBookOpen, FaLock, FaFlag } from 'react-icons/fa';

import useAuth from './../../../hooks/useAuth';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import LoadingSpinner from './../../../components/Shared/LoadingSpinner';

const StatusCard = ({ title, value, type, icon }) => (
    <div className={`p-4 rounded-lg shadow-md bg-white border-${type}`}>
        <div className="flex items-center space-x-2">
            {icon}
            <p className="text-sm font-semibold text-gray-600">{title}</p>
        </div>
        <p className="text-2xl font-bold mt-1">{value.toLocaleString()}</p>
    </div>
);

function ManageLessons() {

  const axiosSecure = useAxiosSecure();

  
  const [filters, setFilters] = useState({ 
    category: '', 
    visibility: '', 
    status: '' 
  });

 
  const { data: allLessons = [], isLoading, refetch: allLessonsRefetch, error } = useQuery({
      queryKey: ["adminLessons", filters], 
      queryFn: async () => {
        const res = await axiosSecure.get(`/admin/all-lessons`, { params: filters }); 
        return res.data;
      },
  });
  //-----------------------------
  // Admin Stats Query 
  //----------------------------
  const { data: adminStats = {}, isLoading: isStatsLoading } = useQuery({
      queryKey: ["adminStats"],
      queryFn: async () => {
          const res = await axiosSecure.get('/admin/lesson-stats'); 
          return res.data;
      }
  });

  //----------------------------
  //  Filter handling
  //-----------------------------
  const handleFilterChange = (e) => {
      setFilters(prev => ({ 
          ...prev, 
          [e.target.name]: e.target.value 
      }));
  };
  //--------------------------
  // Action Handlers
  //------------------------
  const handleDeleteLesson = async (lesson) => {
      const result = await Swal.fire({
        title: "Are you sure to delete the lesson ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      });
      if (result.isConfirmed) {
        await axiosSecure.delete(`/lessons/${lesson._id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Lesson has been permanently deleted.",
          icon: "success"
        });
        allLessonsRefetch();
      }
  };

  const handleToggleFeatured = async (lesson) => {
      try {
          const newStatus = !lesson.isFeatured;
          const res = await axiosSecure.patch(`/admin/lessons/featured/${lesson._id}`, { isFeatured: newStatus });
          if (res.data.modifiedCount > 0) {
              Swal.fire({ icon: 'success', title: 'Updated!', text: `Lesson ${newStatus ? 'featured' : 'unfeatured'} successfully.`, });
              allLessonsRefetch();
          }
      } catch (error) {
          Swal.fire({ icon: 'error', title: 'Not Updated!', text: `Lesson Update Unsuccessfully. Try Again.`, });
      }
  };

  const handleToggleReviewed = async (lesson) => {
      try {
          const newStatus = !lesson.isReviewed;
          const res = await axiosSecure.patch(`/admin/lessons/reviewed/${lesson._id}`, { isReviewed: newStatus });
          if (res.data.modifiedCount > 0) {
              Swal.fire({ icon: 'success', title: 'Updated!', text: `Content marked as ${newStatus ? 'reviewed' : 'unreviewed'}.`, });
              allLessonsRefetch();
          }
      } catch (error) {
          Swal.fire({ icon: 'error', title: 'Not Updated!', text: `Lesson Update Unsuccessfully. Try Again.`, });
      }
  };

  

  if (isLoading || isStatsLoading) return <LoadingSpinner/>
  if (error) return <p className="text-center text-red-600">Failed to load lessons.</p>;

  return (
    <div className="max-w-7xl min-h-screen mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">📚 Manage All Lessons</h1>
        
      {/* --- 1. Admin Status Overview --- */}
      <h2 className="text-xl font-semibold mb-3">Platform Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard 
              title="Total Public Lessons" 
              value={adminStats.publicCount || 0} 
              type="primary" 
              icon={<FaBookOpen className="text-blue-500" />} 
          />
          <StatusCard 
              title="Total Private Lessons" 
              value={adminStats.privateCount || 0} 
              type="secondary" 
              icon={<FaLock className="text-gray-500" />} 
          />
          <StatusCard 
              title="Flagged/Reported Content" 
              value={adminStats.reportCount || 0} 
              type="red" 
              icon={<FaFlag className="text-red-500" />} 
          />
      </div>

      {/* --- 2. Filter Bar --- */}
      <div className=" mb-8 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
          <h3 className="font-semibold text-lg w-full mb-3 text-gray-700">Filter Lessons</h3>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <select 
                name="category"
                onChange={handleFilterChange} 
                value={filters.category} 
                className="select select-bordered select-sm w-full flex-1 bg-white"
            >
                <option value="">All Categories</option>
                <option>Personal Growth</option>
                <option>Career</option>
                <option>Mindset</option>
                <option>Relationships</option>
                <option>Mistakes Learned</option>
                <option>Emotional Healing</option>
            </select>

            <select 
                name="visibility"
                onChange={handleFilterChange} 
                value={filters.visibility} 
                className="select select-bordered select-sm w-full flex-1 bg-white"
            >
                <option value="">All Visibility</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
            </select>
            
            <select 
                name="status"
                onChange={handleFilterChange} 
                value={filters.status} 
                className="select select-bordered select-sm w-full flex-1 bg-white"
            >
                <option value="">All Status</option>
                <option value="flagged">Flagged Only</option>
                <option value="reviewed">Reviewed Only</option>
                <option value="unreviewed">Unreviewed Only</option>
                <option value="featured">Featured Only</option>
            </select>
        </div>
      </div>

      {/* --- 3. Lesson Table --- */}
      {allLessons.length === 0 && <p className="text-gray-600 text-center py-10">No lessons found matching the current filters.</p>}

     <div className="relative -mx-4 md:mx-0 overflow-x-auto bg-white rounded-xl shadow">
  <table className="table table-zebra min-w-[1100px] w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="whitespace-nowrap">SI</th>
        <th className="whitespace-nowrap">Lesson Info</th>
        <th className="whitespace-nowrap">Status</th>
        <th className="whitespace-nowrap">Engagement</th>
        <th className="whitespace-nowrap text-center">Action</th>
      </tr>
    </thead>

    <tbody>
      {allLessons.map((lesson, index) => (
        <tr key={lesson._id}>
          <th className="whitespace-nowrap">{index + 1}</th>

          {/* Lesson Info */}
          <td className="min-w-[320px]">
            <div className="flex items-center gap-3">
              <div className="avatar shrink-0">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={lesson?.image} alt="Lesson" />
                </div>
              </div>
              <div className="truncate">
                <p className="font-semibold truncate max-w-[220px]">
                  {lesson?.title}
                </p>
                <p className="text-xs text-gray-500">
                  {lesson?.category} • {lesson?.emotionalTone}
                </p>
              </div>
            </div>
          </td>

          {/* Status */}
          <td className="min-w-[140px] whitespace-nowrap">
            <span className={`badge ${lesson.isReviewed ? 'badge-success' : 'badge-warning'} badge-sm`}>
              {lesson.isReviewed ? 'Reviewed' : 'Pending'}
            </span>
            <br />
            <span className={`badge ${lesson.isFeatured ? 'badge-info' : 'badge-ghost'} badge-sm mt-1`}>
              {lesson.isFeatured ? 'Featured' : 'Standard'}
            </span>
          </td>

          {/* Engagement */}
          <td className="min-w-[130px] text-sm whitespace-nowrap">
            <div>Views: {lesson.views || 0}</div>
            <div>Likes: {lesson.likesCount || 0}</div>
          </td>

          {/* Action */}
          <td className="min-w-[160px] whitespace-nowrap">
            <div className="flex flex-col gap-1 items-center">
              <button
                onClick={() => handleToggleFeatured(lesson)}
                className={`btn btn-xs ${lesson.isFeatured ? 'btn-warning' : 'btn-outline btn-warning'}`}
              >
                {lesson.isFeatured ? 'Unfeature' : 'Feature'}
              </button>

              <button
                onClick={() => handleToggleReviewed(lesson)}
                className={`btn btn-xs ${lesson.isReviewed ? 'btn-success' : 'btn-outline btn-success'}`}
              >
                {lesson.isReviewed ? 'Unmark Review' : 'Mark Reviewed'}
              </button>

              <button
                onClick={() => handleDeleteLesson(lesson)}
                className="btn btn-xs btn-outline btn-error"
              >
                <RiDeleteBin5Fill />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}

export default ManageLessons;

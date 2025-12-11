import {useRef} from "react";
import { useQuery } from "@tanstack/react-query";

import { MdInfoOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";


import  Swal  from 'sweetalert2';
import { Link } from 'react-router';


import LessonCard from './../../Lessons/LessonCard';
import useAuth from './../../../hooks/useAuth';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import UpdateLessonForm from './../../Lessons/UpdateLessonForm';
import LoadingSpinner from './../../../components/Shared/LoadingSpinner';

function ManageLessons() {
 

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
   const updaterFormRef = useRef(null);

const { data: allLessons = [], isLoading, refetch: allLessonsRefetch, error } = useQuery({
    queryKey: ["adminLessons"], 
    queryFn: async () => {
        
        const res = await axiosSecure.get(`/admin/all-lessons`); 
        return res.data;
    },
    
});

  //---------------------
  // Handle Delete 
  //------------------------
     const handleDeleteLesson =async (lesson) => {
    const result = await
      Swal.fire({
  title: "Are you sure to delete the lesson ?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
   });
    
    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/lessons/${lesson._id}`);
     
      Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    allLessonsRefetch()
    
   
    }
    
  };

  //------------------------------------
  //          Toggle  Featured
  //-------------------------------------
const handleToggleFeatured = async (lesson) => {
    
    try {
      const newStatus = !lesson.isFeatured;
    const res = await axiosSecure.patch(`/admin/lessons/featured/${lesson._id}`, { isFeatured: newStatus });
    if (res.data.modifiedCount > 0) {
        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `Lesson ${newStatus ? 'featured' : 'unfeatured'} successfully.`,
        });
        allLessonsRefetch();
    }
    } catch (error) {
      console.log(error);
       Swal.fire({
            icon: 'error',
            title: 'Not Updated!',
            text: `Lesson Update Unsuccessfully. Try Again.`,
        });
    }
};

  
  //------------------------------
  //        Toggle Reviewed
  //------------------------------
  
  
const handleToggleReviewed = async (lesson) => {
    
    const newStatus = !lesson.isReviewed;
    const res = await axiosSecure.patch(`/admin/lessons/reviewed/${lesson._id}`, { isReviewed: newStatus });
    if (res.data.modifiedCount > 0) {
        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `Content marked as ${newStatus ? 'reviewed' : 'unreviewed'}.`,
        });
        allLessonsRefetch();
    }
};

  




  
  if (isLoading) return <LoadingSpinner/>
  if (error) return <p className="text-center text-red-600">Failed to load lessons.</p>;

  return (
    <div className="max-w-6xl min-h-screen mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📚 Manage Lessons</h1>

      {allLessons.length === 0 && (
        <p className="text-gray-600 text-center py-10">There are no lessons yet.</p>
      )}
      <table className="table table-zebra border p-5 border-gray-300">
        {/* head */}
          <thead>
            <tr>
              <th>SI</th>
              <th>Image</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {allLessons.map((lesson, index) => (
            
            <tr key={lesson._id}>
              
               <th>{index + 1}</th>
              <td>
                <img className="min-w-40 rounded-xl max-h-20" src={lesson?.image } alt="" />
               </td>
               <td className="font-medium">{lesson?.title }</td>
              
            

      <td className="flex  gap-1">
          
          {/* 1. Featured / un Feature button*/}
            <button
                onClick={() => handleToggleFeatured(lesson)}
                className={`btn btn-sm ${lesson.isFeatured ? 'btn-warning' : 'btn-outline btn-warning'}`}
            >
                {lesson.isFeatured ? 'Unfeature' : 'Make Featured'}
            </button>
            
            {/* 2. isReviewed Button*/}
            <button
                onClick={() => handleToggleReviewed(lesson)}
                className={`btn btn-sm ${lesson.isReviewed ? 'btn-success' : 'btn-outline btn-success'}`}
            >
                {lesson.isReviewed ? 'Unmark Review' : 'Mark Reviewed'}
            </button>
            
            {/* 3. Delete btn */}
            <button
                onClick={() => handleDeleteLesson(lesson)}
                className="btn btn-sm btn-outline btn-error"
            >
                <RiDeleteBin5Fill className="inline-block mr-1" />
                Delete
            </button>
        </td>
              </tr>
          ))}
          
      
          </tbody>
      </table>
      
      

      
    </div>
  );
}

export default ManageLessons;

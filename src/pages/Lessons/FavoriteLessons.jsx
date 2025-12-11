import {useRef,useState} from "react";
import { useQuery } from "@tanstack/react-query";

import { MdInfoOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

import LessonCard from "./LessonCard";
import useAuth from './../../hooks/useAuth';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import  Swal  from 'sweetalert2';
import { Link } from 'react-router';
import UpdateLessonForm from './UpdateLessonForm';
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

function FavoriteLessons() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
   const updaterFormRef = useRef(null);

  const { data: favLessons = [],isLoading, refetch:myLessonRefetch, error } = useQuery({
    queryKey: ["favLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite-lessons`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  

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
    myLessonRefetch()
    
   
    }
    
  };


//     const handleOpenUpdate = (lesson) => {
//        setSelectedLesson(lesson);
      
//   updaterFormRef.current.showModal();
// };

  




  
  if (isLoading) return<LoadingSpinner/>
  if (error) return <p className="text-center text-red-600">Failed to load lessons.</p>;

  return (
    <div className="max-w-6xl min-h-screen mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📚 My Favorite Lessons</h1>

      {favLessons.length === 0 && (
        <p className="text-gray-600 text-center py-10">You haven't created any lessons yet.</p>
      )}
      <table className="table table-zebra">
        {/* head */}
          <thead>
            <tr>
              <th>SI</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Tone</th>
              <th>Access Level</th>
              <th>Visibility</th>
              <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {favLessons.map((lesson, index) => (
            
            <tr key={lesson._id}>
              
               <th>{index + 1}</th>
              <td>
                <img className="min-w-40 max-h-20" src={lesson?.image } alt="" />
               </td>
               <td className="font-medium">{lesson?.title }</td>
               <td>{lesson?.category }</td>
               <td>{lesson?.emotionalTone }</td>
               <td>{lesson?.accessLevel }</td>
               <td>{lesson?.visibility }</td>
              <td className="flex flex-col gap-1">
                <Link
                  to={`/dashboard/my-lessons/${lesson?._id}`}
                  className="btn btn-sm btn-outline btn-info">
                  <MdInfoOutline className="inline-block mr-1" />
                  Details
                </Link>
                <button
                  onClick={()=>updaterFormRef.current.showModal()}
                  className="btn btn-sm btn-outline btn-primary">
                  <FaRegEdit className="inline-block mr-1" />
                  Update
                </button>
                {/* Dialog */}
                <dialog ref={updaterFormRef} className="modal">
                <div className="modal-box w-11/12 max-w-4xl p-2">
                  <UpdateLessonForm
                    lesson={lesson}
                    updaterFormRef={updaterFormRef}
                    refetchFn={myLessonRefetch}
                  />
                </div>
              </dialog>
              
                <button
                  onClick={()=>handleDeleteLesson(lesson)}
                  className="btn btn-sm btn-outline btn-error">
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

export default FavoriteLessons;

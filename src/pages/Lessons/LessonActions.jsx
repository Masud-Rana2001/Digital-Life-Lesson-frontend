import React, { useState,useRef } from 'react'
import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import useLikeLesson from "../../hooks/useLikeLesson";
import useSaveLesson from "../../hooks/useSaveLesson";
import ReportModel from './ReportModel';
import ShareModal from './ShareComponent/ShareModal';
import UpdateLessonForm from './UpdateLessonForm';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import  Swal  from 'sweetalert2';

export default function LessonActions({ user, lesson, refetchFn ,isMyLesson}) {
   const navigate = useNavigate();
  const axiosInstance = useAxiosSecure()
  const updaterFormRef = useRef(null)
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const shareUrl = `https://digital-life-lessons.web.app/lesson/${lesson._id}`;
  const title = lesson.title;

  const { liked, likesCount, toggleLike } = useLikeLesson(lesson, user, refetchFn);
  const { saved, favoritesCount, toggleSave } = useSaveLesson(lesson, user, refetchFn)
  

   const handleDeleteLesson =async () => {
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
      const res = await axiosInstance.delete(`/lessons/${lesson._id}`);
     
      Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    refetchFn()
    navigate("/dashboard/my-lessons")
   
    }
    
  };
    

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-10">
      {/* Like Button */}
      <button
        onClick={toggleLike}
        className={`btn btn-lg btn-outline btn-secondary gap-2 flex items-center`}
      >
        {liked ? (
          <HeartIconSolid className="w-5 h-5 text-red-500" />
        ) : (
          <HeartIcon className="w-5 h-5 hover:text-red-500 transition" />
        )}
        Like {likesCount > 0 && `(${likesCount})`}
      </button>
      {/* Bookmark / Save */}
      <button
        onClick={toggleSave}
        className={`btn btn-lg btn-outline btn-primary gap-2 flex items-center`}
      >
        {saved ? (
          <BookmarkIconSolid className="w-5 h-5 text-primary" />
        ) : (
          <BookmarkIcon className="w-5 h-5 hover:text-primary transition" />
        )}
        Save {favoritesCount > 0 && `(${favoritesCount})`}
      </button>



      {/* Report */}
      <button onClick={()=>setReportModalOpen(true)} className="btn btn-lg btn-outline gap-2 flex items-center">
        <FlagIcon className="w-5 h-5" /> Report
      </button>

      {/* Share */}
      <button
        onClick={()=>setShareModalOpen(true)}
        className="btn btn-lg btn-outline btn-accent gap-2 flex items-center">
        <ShareIcon className="w-5 h-5" /> Share
       
      </button>
     

      {
        
        isMyLesson && <>
         <button
        onClick={() => updaterFormRef.current.showModal()}
        className="btn btn-lg btn-outline  gap-2 flex items-center">
         <FaRegEdit className="inline-block mr-1" /> Edit
       
          </button>
           <button
        onClick={handleDeleteLesson}
        className="btn btn-lg btn-outline btn-error gap-2 flex items-center">
         <RiDeleteBin5Fill className="inline-block mr-1" /> Delete
       
      </button>
      </>
      }
      {
        shareModalOpen && (
          <ShareModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        shareUrl={shareUrl}
        title={title}
      />
        )
      }
      {
      reportModalOpen && (
          <ReportModel
            lesson={lesson}
            user={user}
            setReportModalOpen={setReportModalOpen} />
      )
      }
      <dialog ref={updaterFormRef}  className="modal">
                  <div className="modal-box w-11/12 max-w-5xl p-1">
   
                    <UpdateLessonForm
                      lesson={lesson}
                      updaterFormRef={updaterFormRef}
                      refetchFn={ refetchFn}
                    />
                  </div>
                </dialog>
    </div>
  );
}

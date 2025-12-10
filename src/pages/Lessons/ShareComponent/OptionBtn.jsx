import {useEffect,useRef} from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router";
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../../hooks/useAxiosSecure';


function OptionBtn({ isMyLesson, setShowOptions, showOptions,lessonId ,refetchFn}) {
  const axiosInstance = useAxiosSecure()
  const menuRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowOptions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return ()=> document.removeEventListener("mousedown",handleClickOutside)
  }, [setShowOptions])
  


  const handleDeleteLesson =async () => {
   const result = await Swal.fire({
  title: "Are you sure to delete the lesson ?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
   });
    
    if (result.isConfirmed) {
      const res = await axiosInstance.delete(`/lessons/${lessonId}`);
      console.log(res)
      Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    }
    refetchFn()
    
    
  };


  return (
    <div>
      {
  isMyLesson && (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="btn btn-sm"
      >
        <CiMenuKebab />
      </button>

      {showOptions && (
        <div
          ref={menuRef}
          className="
            absolute right-0 mt-2 w-32 
            bg-base-100 shadow-lg border border-base-300 
            rounded-lg overflow-hidden z-50
          "
        >
          <button
            onClick={() => console.log('edit')}
            className="
              w-full text-left px-4 py-2 text-sm 
              hover:bg-warning hover:text-white transition
            "
          >
            <FaRegEdit className="inline-block mr-1" /> Edit
          </button>

          <button
            onClick={handleDeleteLesson}
            className="
              w-full text-left px-4 py-2 text-sm 
              hover:bg-error hover:text-white transition
            "
          >
            <RiDeleteBin5Fill className="inline-block mr-1" /> Delete
          </button>
        </div>
      )}
    </div>
  )
}

    </div>
  )
}

export default OptionBtn
// OptionBtn.jsx
import {useEffect,useRef} from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router";
import Swal from 'sweetalert2'
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import UpdateLessonForm from '../UpdateLessonForm';
import { MdInfoOutline } from "react-icons/md";

function OptionBtn({ isMyLesson, setShowOptions, showOptions, lessonId, refetchFn, lesson, restricted }) {
  const axiosInstance = useAxiosSecure();
  const menuRef = useRef(null);
  const updaterFormRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowOptions]);

  const handleDeleteLesson = async () => {
    const result = await Swal.fire({
      title: "Are you sure to delete the lesson?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosInstance.delete(`/lessons/${lessonId}`);

      Swal.fire({
        title: "Deleted!",
        text: "Lesson deleted successfully.",
        icon: "success",
      });

      refetchFn();
    }
  };

  return (
    <div className="relative">
      {/* ----------------------
        CHANGE HERE:
        Only show menu if it is my lesson AND NOT restricted
      ----------------------- */}
      {isMyLesson && !restricted && ( 
        <>
          {/* Menu Button */}
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="btn btn-sm border-0 btn-outline text-xl btn-secondary"
          >
            <CiMenuKebab />
          </button>

          {/* Dropdown */}
          {showOptions && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-36 bg-base-100 shadow-xl border border-base-300 rounded-lg z-50"
            >
              {/* Details */}
              <Link
                to={`/dashboard/my-lessons/${lesson._id}`}
                className={`block px-4 py-2 text-sm hover:bg-info transition hover:text-white ${
                  restricted ? "text-base-content/40 cursor-not-allowed" : "text-base-content"
                }`}
              >
                {!restricted && <MdInfoOutline className="inline-block mr-1"/>}
                {restricted ? "Locked" : ` Details`}
              </Link>

              {/* Edit */}
              <button
                onClick={() => updaterFormRef.current.showModal()}
                className="w-full text-left px-4 py-2 text-sm hover:bg-warning hover:text-white transition"
              >
                <FaRegEdit className="inline-block mr-1" /> Edit
              </button>

              {/* Delete */}
              <button
                onClick={handleDeleteLesson}
                className="w-full text-left px-4 py-2 text-sm hover:bg-error hover:text-white transition"
              >
                <RiDeleteBin5Fill className="inline-block mr-1" /> Delete
              </button>

              {/* Dialog */}
              <dialog ref={updaterFormRef} className="modal">
                <div className="modal-box w-11/12 max-w-4xl p-2">
                  <UpdateLessonForm
                    lesson={lesson}
                    updaterFormRef={updaterFormRef}
                    refetchFn={refetchFn}
                  />
                </div>
              </dialog>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OptionBtn;

import {useEffect,useRef} from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router";
function OptionBtn({ isMyLesson, setShowOptions, showOptions }) {
  const menuRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowOptions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return ()=> document.removeEventListener("mousedown",handleClickOutside)
  },[setShowOptions])
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
            onClick={() => console.log('delete')}
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
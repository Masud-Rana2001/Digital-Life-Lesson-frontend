import {useState} from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router";
import { LockClosedIcon, StarIcon,HeartIcon,BookmarkIcon } from "@heroicons/react/24/solid";
import {  ShareIcon  } from "@heroicons/react/24/outline";


import useLikeLesson from '../../hooks/useLikeLesson';
import useSaveLesson from '../../hooks/useSaveLesson';
import ShareModal from './ShareComponent/ShareModal';
import OptionBtn from './ShareComponent/OptionBtn';

export default function LessonCard({
  lesson,
  user,
  publicLessonRefetch,
  myLessonRefetch,
  featuredLessonsRefetch }) {

   const refetchFn =
    publicLessonRefetch ||
    myLessonRefetch ||
    featuredLessonsRefetch ||
    null;
  const {liked,likesCount,toggleLike} = useLikeLesson(lesson,user,refetchFn)
  const {saved, favoritesCount,toggleSave}=useSaveLesson(lesson,user,refetchFn)
  


     const [shareModalOpen, setShareModalOpen] = useState(false);

      const shareUrl = `https://digital-life-lessons.web.app/lesson/${lesson._id}`;
      const Sheretitle = lesson.title;

      const [showOptions,setShowOptions] = useState(false)

  
  const {
    _id,
    image,
    title,
    description,
    category,
    emotionalTone,
    accessLevel,
    creator,
    createdAt,
  } = lesson;


  const isMyLesson = user?.email && lesson?.creator?.email
  ? user.email === lesson.creator.email
  : false;

  

  const isPremium = accessLevel === "Premium";
  const userIsPremium = user?.isPremium;
  const restricted = isPremium && !userIsPremium;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const staticViews = Math.floor(Math.random() * 9000 + 1000);

  return (
    <div
      className="
        w-full max-w-xl mx-auto rounded-2xl overflow-hidden
        shadow-sm border border-base-300/70 
        bg-base-100
        hover:shadow-md transition-all duration-300
      "
    >
      {/* Top Section - Creator */}
      <div className="flex items-center justify-between p-4 pb-3 border-b border-base-300/60">
        <div className="flex items-center gap-3">
          <Link to={`/dashboard/creator-profile/${creator?.email}`}>
          <img
            src={creator?.photoURL || "https://i.ibb.co/L5hY5Fz/default-user.png"}
            alt={creator?.name || "Creator"}
            className="
            w-11 h-11 rounded-full object-cover 
            border border-primary/40 shadow-sm
            "
            />
            </Link>
          <div>
            <Link to={`/dashboard/creator-profile/${creator?.email}`}>
            <p className="font-semibold text-base-content text-sm">
              {creator?.name || "Unknown Author"}
            </p>
            </Link>
            <div className="flex items-center gap-2 text-xs text-base-content/60">
              <span>{formattedDate}</span>
              {isPremium && <StarIcon className="w-3.5 h-3.5 text-yellow-500" />}
              <span className="font-semibold text-primary">{accessLevel}</span>
            </div>
          </div>
        </div>
       
        <div className="flex">
          
        <Link
          to={`/dashboard/my-lessons/${_id}`}
          className={`
            text-sm font-semibold px-3 py-1 rounded-md
            ${restricted
              ? "text-base-content/40 cursor-not-allowed"
              : "text-primary hover:text-primary-focus"}
              `}
              >
          {restricted ? "Locked" : "Details"}
        </Link>
          <OptionBtn
            lessonId = {_id}
            isMyLesson={isMyLesson}
            setShowOptions={setShowOptions}
            showOptions={showOptions}
            refetchFn={refetchFn}
            lesson={lesson}
          />
          </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full h-64 overflow-hidden bg-base-200">
        <img
          src={image || "https://via.placeholder.com/600x400?text=Digital+Lesson"}
          alt={title}
          className={`
            w-full h-full object-cover transition-all duration-300 
            ${restricted ? "blur-sm scale-105 opacity-80" : ""}
          `}
        />

        {restricted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md">
            <LockClosedIcon className="h-12 w-12 text-accent mb-2 drop-shadow" />
            <p className="text-white font-semibold text-lg">
              Premium Lesson
            </p>
            <Link
              to="/pricing"
              className="btn btn-accent btn-sm mt-3 shadow-md"
            >
              Upgrade to view
            </Link>
          </div>
        )}
      </div>

      {/* Title + Description */}
      <div className="p-4 space-y-3">
        <Link to={`/lesson/${_id}`}>
          <h2 className="text-lg md:text-xl font-bold text-base-content leading-snug hover:text-primary transition-colors line-clamp-1">
            {title}
          </h2>
        </Link>

        <p className="text-base-content/70 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Badges */}
        <div className="flex items-center gap-3 text-xs pt-1">
          <span className="p-2 rounded-3xl text-center
           bg-primary/10 text-primary  border-primary/20">
            {category}
          </span>
          <span className="p-2 rounded-2xl text-center bg-secondary/10 text-secondary ">
            {emotionalTone}
          </span>
          <span className="text-base-content/50 ml-auto flex justify-center items-center gap-0.5">
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

            
            {staticViews.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 pt-3 border-t border-base-300/60 text-base-content/70">
<button
  onClick={toggleLike}
  className={`flex items-center gap-1 transition 
    ${liked ? "text-red-500" : "hover:text-red-500"}
  `}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={liked ? "red" : "none"}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5A4.747 4.747 0 0 0 12 6.32a4.747 4.747 0 0 0-4.313-2.57C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
  {likesCount}
</button>




       <button
    onClick={toggleSave}
    className={`flex items-center gap-1 transition ${saved ? "text-info" : "hover:text-info"}`}
  >
    <BookmarkIcon className="h-5 w-5" />
    {favoritesCount}
  </button>

        <button
                  onClick={() => setShareModalOpen(true)}

          className="flex items-center gap-1 hover:text-accent transition">
          <ShareIcon className="h-5 w-5" /> Share
        </button>
        {/* Modal */}
      {shareModalOpen && (
        <ShareModal
          open={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          shareUrl={shareUrl}
          title={Sheretitle}
        />
      )}
      </div>
    </div>
  );
}

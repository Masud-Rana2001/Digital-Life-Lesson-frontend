import React, { useState } from 'react'
import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import useLikeLesson from "../../hooks/useLikeLesson";
import useSaveLesson from "../../hooks/useSaveLesson";
import ReportModel from './ReportModel';
import ShareModal from './ShareComponent/ShareModal';

export default function LessonActions({ user, lesson, refetchFn }) {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const shareUrl = `https://digital-life-lessons.web.app/lesson/${lesson._id}`;
  const title = lesson.title;

  const { liked, likesCount, toggleLike } = useLikeLesson(lesson, user, refetchFn);
   const {saved, favoritesCount,toggleSave}=useSaveLesson(lesson,user,refetchFn)
    

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
    </div>
  );
}

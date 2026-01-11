import { ShareIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon, LockClosedIcon, StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Link } from "react-router";
import useLikeLesson from "../../hooks/useLikeLesson";
import useSaveLesson from "../../hooks/useSaveLesson";
import OptionBtn from "./ShareComponent/OptionBtn";
import ShareModal from "./ShareComponent/ShareModal";

export default function LessonCard({
  lesson,
  user,
  userDB,
  publicLessonRefetch,
  myLessonRefetch,
  featuredLessonsRefetch,
}) {
  const refetchFn = publicLessonRefetch || myLessonRefetch || featuredLessonsRefetch || null;
  const { liked, likesCount, toggleLike } = useLikeLesson(lesson, user, refetchFn);
  const { saved, favoritesCount, toggleSave } = useSaveLesson(lesson, user, refetchFn);

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const shareUrl = `https://digital-life-lessons.web.app/lesson/${lesson._id}`;
  const shareTitle = lesson.title;

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

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isMyLesson =
    user?.email && lesson?.creator?.email
      ? user.email === lesson.creator.email
      : false;

  const isPremium = accessLevel === "Premium";
  const userIsPremium = userDB?.isPremium;
  const restricted = isPremium && !userIsPremium && !isMyLesson;

  return (
    <div className="card-uniform flex flex-col h-full overflow-hidden group">
      {/* Image Section - Fixed Height */}
      <div className="relative w-full h-48 overflow-hidden bg-base-200">
        <img
          src={image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop"}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            restricted ? "blur-sm opacity-80" : ""
          }`}
        />
        
        {/* Premium Badge */}
        {isPremium && (
          <span className="absolute top-3 left-3 badge badge-warning gap-1">
            <StarIcon className="w-3 h-3" />
            Premium
          </span>
        )}

        {/* Locked Overlay */}
        {restricted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            <LockClosedIcon className="h-10 w-10 text-white mb-2" />
            <p className="text-white font-medium text-sm">Premium Content</p>
            <Link to="/pricing" className="btn btn-accent btn-sm mt-2">
              Upgrade
            </Link>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4">
        {/* Creator Info */}
        <div className="flex items-center gap-3 mb-3">
          <Link to={`/dashboard/creator-profile/${creator?.email}`}>
            <img
              src={creator?.photoURL || "https://i.ibb.co/L5hY5Fz/default-user.png"}
              alt={creator?.name || "Creator"}
              className="w-9 h-9 rounded-full object-cover border-2 border-primary/30"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <Link
              to={`/dashboard/creator-profile/${creator?.email}`}
              className="font-medium text-sm hover:text-primary transition-colors truncate block"
            >
              {creator?.name || "Unknown Author"}
            </Link>
            <p className="text-xs text-base-content/60">{formattedDate}</p>
          </div>
          
          {/* Options Menu */}
          <OptionBtn
            restricted={restricted}
            lessonId={_id}
            isMyLesson={isMyLesson}
            setShowOptions={setShowOptions}
            showOptions={showOptions}
            refetchFn={refetchFn}
            lesson={lesson}
          />
        </div>

        {/* Title */}
        <Link to={`/lesson/${_id}`}>
          <h3 className="font-bold text-base mb-2 line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-base-content/70 line-clamp-2 mb-3 flex-1">
          {description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge badge-sm badge-category">{category}</span>
          <span className="badge badge-sm badge-tone">{emotionalTone}</span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-base-300 mt-auto">
          {/* Like */}
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              liked ? "text-red-500" : "text-base-content/60 hover:text-red-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={liked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5A4.747 4.747 0 0 0 12 6.32a4.747 4.747 0 0 0-4.313-2.57C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            {likesCount}
          </button>

          {/* Save */}
          <button
            onClick={toggleSave}
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              saved ? "text-info" : "text-base-content/60 hover:text-info"
            }`}
          >
            <BookmarkIcon className={`w-5 h-5 ${saved ? "" : "fill-none stroke-current stroke-2"}`} />
            {favoritesCount}
          </button>

          {/* Share */}
          <button
            onClick={() => setShareModalOpen(true)}
            className="flex items-center gap-1.5 text-sm text-base-content/60 hover:text-accent transition-colors"
          >
            <ShareIcon className="w-5 h-5" />
            Share
          </button>

          {/* Details Button */}
          {!isMyLesson && !restricted && (
            <Link
              to={`/lesson/${_id}`}
              className="btn btn-sm btn-primary btn-outline"
            >
              <MdInfoOutline className="w-4 h-4" />
              View
            </Link>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <ShareModal
          open={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          shareUrl={shareUrl}
          title={shareTitle}
        />
      )}
    </div>
  );
}

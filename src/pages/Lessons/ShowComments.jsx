import React from 'react'
import useCreator from '../../hooks/useCreator'

function ShowComments({ lesson,email }) {
  const { creator ,creatorRefetch} = useCreator(email);
  console.table({ creator,creatorRefetch})
  return (
    <div><div className="space-y-4">
  {lesson?.comments?.length === 0 && (
    <p className="text-base-content/60 text-center">No comments yet.</p>
  )}

  {lesson.comments
    .slice() // copy array
    .reverse() // latest comment on top
    .map((c, index) => (
      <div
        key={index}
        className="flex items-start gap-3 p-4 bg-base-200 rounded-xl border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={ creator.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(
              c.email
            )}&background=38bdf8&color=fff&rounded=true&size=48`}
            alt={c.email}
            className="h-12 w-12 rounded-full object-cover"
          />
        </div>

        {/* Comment Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-semibold text-primary">
              {c.email}
            </h4>
            <span className="text-xs text-base-content/50">
              {new Date(c.createdAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <p className="text-base-content/80  leading-relaxed">
            {c.comment}
          </p>
        </div>
      </div>
    ))}
</div>
</div>
  )
}

export default ShowComments
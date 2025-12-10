import React from "react";

export default function LessonSummaryCard({
  lesson
}) {
  const { title,
    image,
    createdAt,
    emotionalTone, } = lesson;
  return (
    <div
      className="bg-white/80 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] 
                 border border-gray-200 overflow-hidden cursor-pointer
                 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
                 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="h-50  overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 leading-snug">
          {title}
        </h2>

        {/* Created At */}
        <p className="text-sm text-gray-500">
          Created:{" "}
          <span className="text-gray-700 font-medium">
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </p>

        {/* Emotional Tone */}
        <div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold 
            ${
              emotionalTone === "Positive"
                ? "bg-green-100 text-green-600"
                : emotionalTone === "Negative"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {emotionalTone}
          </span>
        </div>
      </div>
    </div>
  );
}

import { ClockIcon, StarIcon } from "@heroicons/react/24/outline";

export default function LessonHeader({ lesson }) {
  return (
    <header className="mb-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-3 text-base-content">
        {lesson.title}
      </h1>

      <div className="flex flex-wrap gap-4 text-sm text-base-content/60">
        <span className="flex items-center gap-1">
          <ClockIcon className="w-4 h-4" />
          {new Date(lesson.createdAt).toLocaleDateString()}
        </span>

        <span className="flex items-center gap-1">
          <StarIcon className="w-4 h-4 text-warning" />
          Updated
        </span>

        <span className="badge badge-outline">{lesson.visibility}</span>
      </div>
    </header>
  );
}

export default function LessonBadges({ lesson }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <span className="badge badge-lg bg-primary text-white">{lesson.category}</span>
      <span className="badge badge-lg bg-secondary text-white">{lesson.emotionalTone}</span>
      <span className="badge badge-lg badge-outline">{lesson.accessLevel}</span>
    </div>
  );
}

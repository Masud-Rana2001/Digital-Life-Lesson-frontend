export default function LessonStats({ lesson }) {
  return (
    <div className="stats shadow w-full mb-10">
      <div className="stat">
        <div className="stat-title">Likes</div>
        <div className="stat-value text-error">{lesson.likes?.length || 0}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Favorites</div>
        <div className="stat-value text-primary">{lesson.favoritedCount}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Views</div>
        <div className="stat-value text-secondary">{lesson.views}</div>
      </div>
    </div>
  );
}

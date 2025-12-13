import { Link } from "react-router";
import { UserIcon } from "@heroicons/react/24/solid";

export default function LessonCreatorCard({ creator }) {
  return (
    <div className="bg-base-200 p-6 rounded-xl shadow mb-10">
      <div className="flex gap-4 items-center">
        <img
          src={creator.imageURL || creator.imageUrl}
          className="w-20 h-20 rounded-full object-cover border-4 border-accent"
        />
        <div>
          <h3 className="text-xl font-bold">{creator.name}</h3>
          <p className="text-base-content/60">Total Lessons: {creator?.totalLessons}</p>

          <Link to={`/dashboard/creator-profile/${creator.email}`} className="btn btn-sm btn-outline mt-2">
            <UserIcon className="w-4 h-4 mr-1" /> View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

import { LockClosedIcon, StarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";

export default function LessonPremiumLock() {
  return (
    <div className="container mx-auto p-10 flex justify-center items-center min-h-[70vh]">
      <div className="text-center bg-base-200 p-10 rounded-2xl shadow-lg border">
        <LockClosedIcon className="w-16 h-16 mx-auto text-error mb-4" />
        <h2 className="text-3xl font-bold text-error mb-3">Premium Content Locked</h2>
        <p className="text-base-content/70 mb-6 max-w-md mx-auto">
          Upgrade to Premium to access this exclusive life lesson.
        </p>
        <Link to="/pricing" className="btn btn-primary btn-lg">
          <StarIcon className="w-5 h-5 mr-2" /> Upgrade
        </Link>
      </div>
    </div>
  );
}

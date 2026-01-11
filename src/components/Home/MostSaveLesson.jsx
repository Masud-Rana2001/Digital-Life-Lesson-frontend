import { useQuery } from "@tanstack/react-query";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "../../pages/Lessons/LessonCard";
import { SkeletonGrid } from "../Shared/SkeletonCard";

export default function MostSavedLessons() {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();

  const { data: topSavedLessons = [], isLoading, refetch: topSaveRefetch } = useQuery({
    queryKey: ["most-saved-lessons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-lessons/most-saved");
      return res.data;
    },
  });

  const { data: userDB } = useQuery({
    queryKey: ["userDB", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/single-user`);
      return res.data;
    },
  });

  return (
    <section className="section-padding glass-effect rounded-3xl">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="heading-xl mb-2">
              🔥 Most <span className="text-gradient">Saved Lessons</span>
            </h2>
            <p className="text-base-content/70">
              Lessons that users saved and loved the most
            </p>
          </div>
          <Link to="/lessons?sort=most-saved" className="btn btn-outline gap-2">
            See More
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && <SkeletonGrid count={4} />}

        {/* Lessons Grid */}
        {!isLoading && topSavedLessons.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topSavedLessons.slice(0, 4).map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                user={user}
                userDB={userDB}
                myLessonRefetch={topSaveRefetch}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && topSavedLessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base-content/60">No saved lessons yet</p>
          </div>
        )}
      </div>
    </section>
  );
}

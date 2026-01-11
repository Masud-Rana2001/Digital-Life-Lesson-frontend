import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";
import { SkeletonGrid } from "../../components/Shared/SkeletonCard";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "./LessonCard";

export default function FeaturedLessons() {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: lessons = [], isLoading, refetch: featuredLessonsRefetch } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/featured-lessons`);
      return res.data;
    },
  });

  const { data: userDB } = useQuery({
    queryKey: ["userDB", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-user`);
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
              🌟 Featured <span className="text-gradient">Life Lessons</span>
            </h2>
            <p className="text-base-content/70">
              Hand-picked life lessons chosen by our team for their impact and wisdom
            </p>
          </div>
          <Link to="/lessons" className="btn btn-primary gap-2">
            View All Lessons
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading State */}
        {(loading || isLoading) && <SkeletonGrid count={4} />}

        {/* Lessons Grid - 4 columns on xl */}
        {!isLoading && lessons.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lessons.slice(0, 8).map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                user={user}
                userDB={userDB}
                featuredLessonsRefetch={featuredLessonsRefetch}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && lessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base-content/60">No featured lessons available</p>
          </div>
        )}
      </div>
    </section>
  );
}

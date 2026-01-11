import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import LessonActions from "./LessonActions";
import LessonBadges from "./LessonBadges";
import LessonComments from "./LessonComments";
import LessonCreatorCard from "./LessonCreatorCard";
import LessonHeader from "./LessonHeader";
import LessonImage from "./LessonImage";
import LessonPremiumLock from "./LessonPremiumLock";
import LessonStats from "./LessonStats";
import SimilarLessons from "./SimilarLessons";

export default function LessonDetailsPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  // User DB Query
  const { data: userDB = {} } = useQuery({
    queryKey: ["userDB", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-user`);
      return res.data;
    },
  });

  // Lesson Fetch
  const {
    data: lesson = {},
    isLoading,
    error,
    refetch: refetchDetails,
  } = useQuery({
    queryKey: ["lessonDetails", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

  // Creator Fetch
  const { data: creator = {} } = useQuery({
    queryKey: ["creator", lesson?._id],
    enabled: !!lesson?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lesson-creator/${lesson._id}`);
      return res.data;
    },
  });

  const isMyLesson =
    !!user?.email && !!lesson?.creator?.email
      ? user.email === lesson.creator.email
      : false;

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-base-content mb-2">Error Loading Lesson</h2>
        <p className="text-base-content/60">Something went wrong. Please try again later.</p>
      </div>
    );
  }

  const restricted =
    lesson?.accessLevel === "Premium" &&
    !isMyLesson &&
    !userDB?.isPremium;

  if (restricted) return <LessonPremiumLock />;

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <article className="card-uniform overflow-hidden">
          {/* Hero Image */}
          <LessonImage image={lesson.image} title={lesson.title} />

          {/* Content */}
          <div className="p-6 md:p-10 space-y-8">
            {/* Header Section */}
            <section>
              <LessonHeader lesson={lesson} />
              <LessonBadges lesson={lesson} />
            </section>

            {/* Description Section */}
            <section>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                📖 The Lesson
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
                  {lesson.description}
                </p>
              </div>
            </section>

            {/* Key Takeaways Section */}
            {lesson.keyTakeaways && (
              <section className="glass-effect rounded-xl p-6">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  💡 Key Takeaways
                </h2>
                <ul className="space-y-2">
                  {lesson.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-base-content/80">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Stats Section */}
            <section>
              <LessonStats lesson={lesson} />
            </section>

            {/* Actions Section */}
            <section className="border-t border-b border-base-300 py-6">
              <LessonActions
                lesson={lesson}
                user={user}
                refetchFn={refetchDetails}
                isMyLesson={isMyLesson}
              />
            </section>

            {/* Creator Section */}
            <section>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                ✍️ About the Author
              </h2>
              <LessonCreatorCard creator={creator} />
            </section>

            {/* Comments Section */}
            <section>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                💬 Discussion ({lesson.comments?.length || 0})
              </h2>
              <LessonComments
                user={user}
                lesson={lesson}
                refetchDetails={refetchDetails}
              />
            </section>
          </div>
        </article>

        {/* Similar Lessons Section */}
        <section className="mt-12">
          <h2 className="heading-lg mb-6">
            📚 Similar <span className="text-gradient">Lessons</span>
          </h2>
          <SimilarLessons lesson={lesson} />
        </section>
      </div>
    </div>
  );
}

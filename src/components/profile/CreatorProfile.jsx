import { Link, useParams } from "react-router";
import LessonCard from "../../pages/Lessons/LessonCard";
import useAuth from "../../hooks/useAuth";
import useCreator from "../../hooks/useCreator";
import coverImg from "../../assets/images/cover.png";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';
const CreatorProfile = () => {
  const { user } = useAuth();
  const { email } = useParams(); // route e email pass করতে হবে
  const { creator = {}, creatorRefetch } = useCreator(email);
  const axiosInstance= useAxiosSecure()
  const createdLessons = creator.myLesson || [];
  const savedLessons = creator.favorites || [];


    const { data: lessons = [], refetch:LessonRefetch, error } = useQuery({
        queryKey: ["myLessons", user?.email],
        queryFn: async () => {
          const res = await axiosInstance.get(`/my-lessons/${user?.email}`);
          return res.data;
        },
        enabled: !!user?.email,
      });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl rounded-2xl shadow-xl  bg-gradient-radial from-white via-[#f5f0ff] to-[#dbe7ff] 
      bg-[radial-gradient(circle_at_70%_40%,#e6d7ff_0%,#f6f2ff_35%,#e4f0ff_70%,#ffffff_100%)] 
      bg-no-repeat bg-cover overflow-hidden border border-gray-300">

        {/* Cover Image Section */}
        <div className="relative">
          <img
            src={coverImg}
            alt="Cover"
            className="w-full h-60 object-cover"
          />

          {/* Profile Avatar */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <img
              src={creator.imageUrl}
              alt={creator.name || "Creator"}
              className="h-32 w-32 rounded-full object-cover ring-4 ring-base-100 shadow-xl"
            />
          </div>
        </div>

        {/* Creator Info */}
        <div className="mt-20 text-center px-6 pb-10">
          <h2 className="text-3xl font-bold text-base-content flex items-center justify-center gap-2">
            {creator.name || "Unknown Creator"}
            {creator.isPremium && (
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-900 rounded-md font-bold border border-amber-600">
                ⭐ Premium
              </span>
            )}
          </h2>

          <p className="text-sm text-base-content/60 mt-1">{creator.email}</p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-base-200 p-4 rounded-lg shadow-sm border border-base-300 text-center">
              <h3 className="text-xl font-bold">{createdLessons.length}</h3>
              <p className="text-sm text-base-content/60">Lessons Created</p>
            </div>

            <div className="bg-base-200 p-4 rounded-lg shadow-sm border border-base-300 text-center">
              <h3 className="text-xl font-bold">{savedLessons.length}</h3>
              <p className="text-sm text-base-content/60">Lessons Saved</p>
            </div>

            <div className="bg-base-200 p-4 rounded-lg shadow-sm border border-base-300 text-center">
              <h3 className="text-xl font-bold text-yellow-500">
                {creator.isPremium ? "Active" : "Free User"}
              </h3>
              <p className="text-sm text-base-content/60">Membership</p>
            </div>
          </div>

          {/* Divider */}
          <div className="divider my-8"></div>

          {/* Creator Created Lessons */}
          <div className="mt-8">
            <h3 className="text-3xl text-center font-bold mb-5 text-primary">
              {creator.name}'s Lessons
            </h3>

            {createdLessons.length === 0 && (
              <p className="text-base-content/60 text-center">
                {creator.name} hasn't created any lessons yet.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  user={user}
                  myLessonRefetch={creatorRefetch}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;

import { useQuery } from "@tanstack/react-query";
import {
    FaBookOpen,
    FaBookmark,
    FaChartLine,
    FaComments,
    FaHeart,
    FaStar,
} from "react-icons/fa";
import { Link } from "react-router";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="card-uniform p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl bg-${color}/10 flex items-center justify-center`}>
      <Icon className={`w-6 h-6 text-${color}`} />
    </div>
    <div>
      <p className="text-sm text-base-content/60">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const LessonCard = ({ lesson }) => (
  <Link
    to={`/dashboard/my-lessons/${lesson._id}`}
    className="card-uniform p-4 hover:border-primary/50 transition-colors"
  >
    <div className="flex gap-4">
      <img
        src={lesson.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=100&h=100&fit=crop"}
        alt={lesson.title}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-1">{lesson.title}</h4>
        <p className="text-xs text-base-content/60 line-clamp-1 mt-1">
          {lesson.description}
        </p>
        <div className="flex items-center gap-3 mt-2 text-xs text-base-content/50">
          <span className="flex items-center gap-1">
            <FaHeart className="w-3 h-3" /> {lesson.likes || 0}
          </span>
          <span className="flex items-center gap-1">
            <FaBookmark className="w-3 h-3" /> {lesson.favorites || 0}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

export default function UserDashboard() {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();

  const { data: summaryData, isLoading } = useQuery({
    queryKey: ["summaryData", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosInstance.get(`/dashboard/summary`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (!summaryData) return <p className="p-6">Could not load dashboard data.</p>;

  const weekly = summaryData.weeklyStats || {};

  // Weekly performance chart data
  const weeklyChartData = [
    { name: "Lessons", value: weekly.lessonsCreated || 0 },
    { name: "Likes", value: weekly.likesReceived || 0 },
    { name: "Saves", value: weekly.favoritesReceived || 0 },
    { name: "Comments", value: weekly.commentsGiven || 0 },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="card-uniform p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            src={summaryData.imageURL || "https://i.ibb.co/L5hY5Fz/default-user.png"}
            alt={summaryData.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-primary/20"
          />
          <div className="flex-1">
            <h1 className="heading-lg">
              Welcome back, <span className="text-gradient">{summaryData.name}</span>! 👋
            </h1>
            <p className="text-base-content/60 text-sm mt-1">
              Here's your activity summary and recent performance
            </p>
          </div>
          <div>
            {summaryData.isPremium ? (
              <span className="badge badge-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none gap-1">
                <FaStar /> Premium
              </span>
            ) : (
              <Link to="/pricing" className="btn btn-primary btn-sm gap-1">
                <FaStar /> Upgrade to Premium
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Lessons Created"
          value={summaryData.totalLessonsCreated || 0}
          icon={FaBookOpen}
          color="primary"
        />
        <StatCard
          title="Saved Lessons"
          value={summaryData.totalSavedLessons || 0}
          icon={FaBookmark}
          color="secondary"
        />
        <StatCard
          title="Total Views"
          value={summaryData.totalViews || 0}
          icon={FaChartLine}
          color="accent"
        />
      </div>

      {/* Weekly Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="card-uniform p-6">
          <h2 className="font-bold text-lg mb-4">📊 Weekly Performance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-base-300" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(var(--b1))",
                  border: "1px solid oklch(var(--b3))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Stats Cards */}
        <div className="card-uniform p-6">
          <h2 className="font-bold text-lg mb-4">📅 This Week's Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-primary/5 text-center">
              <FaBookOpen className="w-6 h-6 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">{weekly.lessonsCreated || 0}</p>
              <p className="text-xs text-base-content/60">Lessons Created</p>
            </div>
            <div className="p-4 rounded-xl bg-error/5 text-center">
              <FaHeart className="w-6 h-6 mx-auto text-error mb-2" />
              <p className="text-2xl font-bold">{weekly.likesReceived || 0}</p>
              <p className="text-xs text-base-content/60">Likes Received</p>
            </div>
            <div className="p-4 rounded-xl bg-warning/5 text-center">
              <FaStar className="w-6 h-6 mx-auto text-warning mb-2" />
              <p className="text-2xl font-bold">{weekly.favoritesReceived || 0}</p>
              <p className="text-xs text-base-content/60">Saves Received</p>
            </div>
            <div className="p-4 rounded-xl bg-info/5 text-center">
              <FaComments className="w-6 h-6 mx-auto text-info mb-2" />
              <p className="text-2xl font-bold">{weekly.commentsGiven || 0}</p>
              <p className="text-xs text-base-content/60">Comments Given</p>
            </div>
          </div>
          
          {/* Score */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 text-center">
            <p className="text-sm text-base-content/60">Weekly Score</p>
            <p className="text-4xl font-bold text-gradient">{weekly.score || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Lessons */}
      <div className="card-uniform p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">🆕 Recently Added Lessons</h2>
          <Link to="/dashboard/my-lessons" className="btn btn-ghost btn-sm">
            View All →
          </Link>
        </div>

        {summaryData.recentlyAddedLessons?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-base-content/60 mb-4">No lessons created yet</p>
            <Link to="/dashboard/add-lesson" className="btn btn-primary">
              Create Your First Lesson
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summaryData.recentlyAddedLessons?.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card-uniform p-6">
        <h2 className="font-bold text-lg mb-4">⚡ Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/add-lesson" className="btn btn-primary">
            Create New Lesson
          </Link>
          <Link to="/lessons" className="btn btn-outline">
            Explore Lessons
          </Link>
          <Link to="/dashboard/favorite-lessons" className="btn btn-outline">
            View Saved Lessons
          </Link>
          <Link to="/dashboard/profile" className="btn btn-ghost">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaBookOpen,
  FaBookmark,
  FaChartLine,
  FaUsers,
  FaStar,
  FaHeart,
  FaComments,
} from "react-icons/fa";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

import StatusCard from "./StatusCard";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import LessonSummaryCard from "./LessonSummaryCard";
import { Link } from 'react-router';

export default function DashboardHome() {
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
  console.log(summaryData)
  if (isLoading) return <LoadingSpinner />;
  if (!summaryData) return <p>Could not load dashboard data.</p>;

  const weekly = summaryData.weeklyStats;

  return (
    <div className="p-6 md:p-10 space-y-10">
      
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <img
          src={summaryData.imageURL}
          alt=""
          className="w-16 h-16 rounded-full shadow-md"
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome Back,{" "}
            <span className="text-primary">{summaryData.name}</span> 👋
          </h1>
          <p className="text-gray-500 text-sm">Here is your activity summary</p>
        </div>
      </div>

      {/* PREMIUM BADGE */}
      <div>
        {summaryData.isPremium ? (
          <p className="inline-block bg-yellow-300 text-black px-4 py-1 rounded-full  font-semibold shadow">
            ⭐ Premium User
          </p>
        ) : (
            <>
          <p className="inline-block bg-gray-800 text-white px-4 py-1 rounded-full text font-semibold shadow">
            Free Plan
            </p>
            <Link to="/pricing" className="btn btn-primary mx-5 btn-outline">
                Update Plan
            </Link>
            </>
        )}
      </div>

      {/* TOP STATS GRID */}
      <div
      className="bg-white/80 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] 
                 border border-gray-200 overflow-hidden cursor-pointer
                 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
                 hover:-translate-y-1 transition-all duration-300
                 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10
                 "
    >
        <StatusCard
          title="Lessons Created"
          value={summaryData.totalLessonsCreated}
          icon={<FaBookOpen />}
          type="1"
        />

        <StatusCard
          title="Saved Lessons"
          value={summaryData.totalSavedLessons}
          icon={<FaBookmark />}
          type="2"
        />

        <StatusCard
          title="Total Views"
          value={summaryData.totalViews || 0}
          icon={<FaChartLine />}
          type="3"
        />

        <StatusCard
          title="Total Users"
          value={summaryData.totalUsers || 0}
          icon={<FaUsers />}
          type="4"
        />
      </div>

      {/* WEEKLY STATS */}
      <div className="bg-white rounded-xl shadow p-6  hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
                 hover:-translate-y-1 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4">📅 Weekly Performance</h2>

        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
          <StatusCard
            title="Lessons Created"
            value={weekly.lessonsCreated}
            icon={<FaBookOpen />}
            type="2"
          />

          <StatusCard
            title="Likes Received"
            value={weekly.likesReceived}
            icon={<FaHeart />}
            type="4"
          />

          <StatusCard
            title="Favorites Received"
            value={weekly.favoritesReceived}
            icon={<FaStar />}
            type="1"
          />

          <StatusCard
            title="Comments Given"
            value={weekly.commentsGiven}
            icon={<FaComments />}
            type="3"
          />

          <StatusCard
            title="Overall Score"
            value={weekly.score}
            icon={<FaChartLine />}
            type="2"
          />
        </div>
      </div>

      {/* Recently Added Lessons */}
      <div className="bg-white rounded-xl shadow p-6  hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
                 hover:-translate-y-1 transition-all duration-300">
        <h2 className="text-2xl  font-bold mb-4">🆕 Recently Added Lessons</h2>

        {summaryData.recentlyAddedLessons.length === 0 && (
          <p className="text-gray-400">No recent lessons added.</p>
        )}

        <div className="grid grid-cols-1  md:grid-cols-3 gap-5">
          {summaryData.recentlyAddedLessons.map((lesson,index) => (
            <LessonSummaryCard key={index} lesson={ lesson} />
          ))}
        </div>
      </div>
    </div>
  );
}

// src/pages/dashboard/AdminDashboard.jsx
import React from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { Users, BookOpen, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import useAdminStats from '../../../hooks/useAdminStats';
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { useNavigate } from "react-router";

const StatCard = ({ title, value, color, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between transition duration-300 hover:shadow-lg">
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-600 mt-2`}>{value}</p>
    </div>
    {Icon && <Icon className={`w-10 h-10 text-${color}-400 opacity-60`} />}
  </div>
);

const AdminDashboard = () => {
  const { stats, isLoading, error, refetch } = useAdminStats();
  const errorMessage = error ? error.message || "Unknown error occurred." : null;

  const topContributors = stats.topContributors || [];
  const combinedGrowthData = stats.lessonGrowth || [];

  if (isLoading) return <LoadingSpinner />;

  if (error) return (
    <div className="p-10 text-center bg-white m-10 rounded-lg shadow-xl">
      <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Dashboard</h2>
      <p className="text-gray-600 mb-4">{errorMessage}</p>
      <button
        onClick={() => refetch()}
        className="flex items-center justify-center mx-auto px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150"
      >
        <RefreshCw className="w-4 h-4 mr-2" /> Retry Loading Data
      </button>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard Overview</h1>
        <button
          onClick={() => refetch()}
          className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg flex items-center hover:bg-gray-300 transition duration-150"
        >
          <RefreshCw className="w-4 h-4 mr-1" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Users" value={stats.totalUsers} color="indigo" icon={Users} />
        <StatCard title="Public Lessons" value={stats.totalPublicLessons} color="green" icon={BookOpen} />
        <StatCard title="Reported Lessons" value={stats.totalReportedLessons} color="red" icon={AlertTriangle} />
        <StatCard title="Today's New Lessons" value={stats.todaysNewLessons} color="blue" icon={Clock} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Lesson Growth (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={combinedGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="lessons" fill="#4f46e5" name="New Lessons" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">New Users (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={combinedGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} name="New Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Top 5 Active Contributors</h2>
        <div className="space-y-4">
          {topContributors.map((contributor, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center gap-4">
                <img
                  src={contributor.photoURL || "/default-avatar.png"}
                  alt={contributor.name || contributor._id}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{contributor.name || 'Unknown User'}</p>
                  <p className="text-sm text-gray-500">{contributor._id}</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-indigo-600">
                {contributor.totalLessons} lessons
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React from "react";
import { useQuery } from "@tanstack/react-query";


import LessonCard from "./LessonCard";
import useAuth from './../../hooks/useAuth';
import useAxiosSecure from './../../hooks/useAxiosSecure';

function FavoriteLessons() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: favLessons = [],isLoading, refetch:myLessonRefetch, error } = useQuery({
    queryKey: ["favLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite-lessons`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  
  if (isLoading) return <p className="text-center py-10">Loading your lessons...</p>;
  if (error) return <p className="text-center text-red-600">Failed to load lessons.</p>;

  return (
    <div className="max-w-6xl min-h-screen mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📚 My Favorite Lessons</h1>

      {favLessons.length === 0 && (
        <p className="text-gray-600 text-center py-10">You haven't created any lessons yet.</p>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favLessons.map((lesson) => (
          <LessonCard
            key={lesson._id}
            lesson={lesson}
            user={user}
            myLessonRefetch={myLessonRefetch}
            // isPremiumUser={user?.premium === true} // optional
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteLessons;

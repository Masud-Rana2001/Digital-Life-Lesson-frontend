import React from "react";
import { useQuery } from "@tanstack/react-query";


import LessonCard from "./LessonCard";
import useAuth from './../../hooks/useAuth';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";

function MyLessons() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: lessons = [],isLoading, refetch:myLessonRefetch, error } = useQuery({
    queryKey: ["myLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
 
  if (isLoading) return <LoadingSpinner/>
  if (error) return <ErrorPage/>

  return (
    <div className="max-w-6xl min-h-screen mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📚 My Lessons</h1>

      {lessons.length === 0 && (
        <p className="text-gray-600 text-center py-10">You haven't created any lessons yet.</p>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {lessons.map((lesson) => (
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

export default MyLessons;

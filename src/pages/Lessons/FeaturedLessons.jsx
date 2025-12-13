import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LessonCard from "./LessonCard";
import useAuth from './../../hooks/useAuth';
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxiosSecure from './../../hooks/useAxiosSecure';

export default function FeaturedLessons() {
  const axiosSecure = useAxiosSecure()
  const {user,loading} = useAuth()
  const { data: lessons = [],isLoading, refetch : featuredLessonsRefetch } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/featured-lessons`);
      return res.data;
    },
  });
  const { data:userDB, refetch:userDBRfetch } = useQuery({
    queryKey: ["userDB",user?.email ],
    queryFn: async () => {
     
      const res = await axiosSecure.get(`/single-user`);
      return res.data;
    },
  });
  
  if (loading || isLoading) <LoadingSpinner/>

  return (
    <section className="mt-10 shadow rounded-2xl py-16 px-5 bg-gradient-to-r bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-50 ">
      {/* SECTION TITLE */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 
                       text-secondary dark:text-primary transition-colors">
          🌟 Featured Life Lessons
        </h2>
        <p className="text-gray-600 mt-2">
          Hand-picked life lessons chosen by our team
        </p>
      </div>

      {/* GRID OF LESSON CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson._id}
            lesson={lesson}
            user={user}
            userDB={userDB}
            featuredLessonsRefetch={featuredLessonsRefetch}
          />
        ))}
      </div>
    </section>
  );
}

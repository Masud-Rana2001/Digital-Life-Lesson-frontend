import React from "react"
import { useQuery } from "@tanstack/react-query"
import LessonCard from "./LessonCard"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import LoadingSpinner from "../../components/Shared/LoadingSpinner"
import useAuth from './../../hooks/useAuth';

function PublicLessons() {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()

  const {
    data: lessons = [],
    isLoading,
    error,
    refetch : publicLessonRefetch
  } = useQuery({
    queryKey: ["publicLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public-lessons")
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  if (error)
    return (
      <p className="text-center text-red-600 py-10">
        Failed to load public lessons.
      </p>
    )

  return (
    <div className="max-w-7xl mx-auto  px-4">
      {/* PAGE TITLE */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center pb-20 
                       text-secondary dark:text-primary transition-colors">
        🌟 Public Life Lessons
      </h1>

      {/* EMPTY STATE */}
      {lessons.length === 0 && (
        <p className="text-gray-600 text-center py-10 text-lg">
          No public lessons available right now.
        </p>
      )}

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson._id}
            lesson={lesson}
            user={user}
            publicLessonRefetch={publicLessonRefetch}
          />
        ))}
      </div>
    </div>
  )
}

export default PublicLessons

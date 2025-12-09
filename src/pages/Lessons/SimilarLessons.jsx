import React from 'react'
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './../../hooks/useAuth';
import LessonCard from './LessonCard';

function SimilarLessons({ lesson }) {
  const {user} = useAuth()
  const axiosInstance = useAxiosSecure()
  const { data: similarLessons = [], refetch : similarLessonsRefetch } = useQuery({
  queryKey: ["similarLessons", lesson?._id],
  enabled: !!lesson?._id,
  queryFn: async () => {
    const res = await axiosInstance.get(`/allLessons/similar/${lesson._id}`);
    return res.data;
  },
});
console.log(similarLessons)
  return (
    <section className="px-1 md:px-5 py-5 md:py-8 bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-100 mt-10 rounded-2xl shadow">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center px-4 mb-3 md:mb-12 text-primary">
        Lessons related to your interest 
      </h2>
      
       {similarLessons.length === 0 && (
        <p className="text-gray-600 text-center py-10">You haven't created any lessons yet.</p>
      )}



      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
              {similarLessons.map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  user={user}
                  myLessonRefetch={similarLessonsRefetch}
                  // isPremiumUser={user?.premium === true} // optional
                />
              ))}
            </div>
    </section>
  )
}

export default SimilarLessons
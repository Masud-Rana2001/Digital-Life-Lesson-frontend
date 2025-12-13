import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import LessonCard from './../../pages/Lessons/LessonCard';
import useAuth from './../../hooks/useAuth';

export default function MostSavedLessons() {
  const {user} = useAuth()
  const axiosInstance = useAxiosSecure();

  const { data: topSavedLessons = [] ,refetch : topSaveRefetch} = useQuery({
    queryKey: ["most-saved-lessons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-lessons/most-saved");
      return res.data;
    },
  });


   const { data:userDB, refetch:userDBRfetch } = useQuery({
      queryKey: ["userDB",user?.email ],
      queryFn: async () => {
       
        const res = await axiosInstance.get(`/single-user`);
        return res.data;
      },
    });


  return (
    <section className="py-12 px-5 bg-gradient-to-r bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-50 mt-10 rounded-2xl shadow">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 
                       text-secondary dark:text-primary transition-colors">🔥 Lessons users saved and loved the most</h2>
      <p className="text-base-content/60 mb-8">
        
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topSavedLessons.map((lesson) => (
           <LessonCard
                      key={lesson._id}
                      lesson={lesson}
                       user={user}
                       userDB={userDB}
                      myLessonRefetch={topSaveRefetch}
                      // isPremiumUser={user?.premium === true} // optional
                    />
        ))}
      </div>
    </section>
  );
}

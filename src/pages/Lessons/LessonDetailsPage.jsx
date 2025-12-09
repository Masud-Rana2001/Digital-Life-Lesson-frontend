import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import LessonHeader from "./LessonHeader";
import LessonImage from "./LessonImage";
import LessonBadges from "./LessonBadges";
import LessonStats from "./LessonStats";
import LessonActions from "./LessonActions";
import LessonCreatorCard from "./LessonCreatorCard";
import LessonComments from "./LessonComments";
import LessonPremiumLock from "./LessonPremiumLock";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import SimilarLessons from "./SimilarLessons";

export default function LessonDetailsPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
    

  // Fetch API
  const { data: lesson={}, isLoading, error ,refetch :refetchDetails} = useQuery({
    queryKey: ["lessonDetails", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });
 const { data: creator ={}} = useQuery({
  queryKey: ["creator", lesson?._id],
  enabled: !!lesson?._id,       
  queryFn: async () => {
    const res = await axiosSecure.get(`/lesson-creator/${lesson._id}`);
    return res.data;
  },
});

 
  if (isLoading) return<LoadingSpinner/>
  if (error) return <div className="text-error text-center py-20">Error loading lesson.</div>;

  const restricted = lesson.accessLevel === "Premium" && !user?.isPremium;

  // If locked
  if (restricted) return <LessonPremiumLock />;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <article className=" bg-gradient-radial from-white via-[#f5f0ff] to-[#dbe7ff] 
      bg-[radial-gradient(circle_at_70%_40%,#e6d7ff_0%,#f6f2ff_35%,#e4f0ff_70%,#ffffff_100%)] 
      bg-no-repeat bg-cover shadow-xl rounded-2xl p-6 md:p-10 border border-gray-300">

        <LessonHeader lesson={lesson} />
        
        <LessonImage image={lesson.image} title={lesson.title} />
        
        <LessonBadges lesson={lesson} />

        <p className="text-lg leading-relaxed text-base-content/90 whitespace-pre-line mb-10">
          {lesson.description}
        </p>

        <LessonStats lesson={lesson} />
        
        <LessonActions
          lesson={lesson}
          user={user}
          refetchFn={refetchDetails}
        />

        <LessonCreatorCard
          creator={creator}
          
        />
        
        <LessonComments user={user} lesson={lesson} refetchDetails={refetchDetails} />
        
        <SimilarLessons lesson={lesson} />
        
      </article>
    </div>
  );
}

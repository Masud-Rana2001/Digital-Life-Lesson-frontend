import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { toast } from "react-hot-toast";

export default function useLikeLesson(lesson, user, refetchFn) {
  const axiosSecure = useAxiosSecure();

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // backend → initial state sync
  useEffect(() => {
    if (lesson) {
      setLiked(user ? lesson?.likes?.includes(user?.email) : false);
      setLikesCount(lesson.likesCount || 0);
    }
  }, [lesson, user]);

  const toggleLike = async () => {
    if (!user) {
      toast.error("Please log in to like.");
      return;
    }

    try {
      const res = await axiosSecure.patch("/lessons/like", {
        lessonId: lesson._id,
      });

      // Backend যা পাঠাবে সেটাই UI follow করবে
      setLiked(res.data.liked);

      setLikesCount((prev) => (res.data.liked ? prev + 1 : prev - 1));

      toast.success(res.data.message);

      refetchFn?.(); // optional refresh

    } catch (error) {
      console.error(error);
      toast.error("Failed to update like.");
    }
  };

  return { liked, likesCount, toggleLike };
}

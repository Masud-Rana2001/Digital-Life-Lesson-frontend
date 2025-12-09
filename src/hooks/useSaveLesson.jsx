import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { toast } from "react-hot-toast";

export default function useSaveLesson(lesson, user, refetchFn) {
  const axiosSecure = useAxiosSecure();

  const [saved, setSaved] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  console.log("saved",saved)
  // Sync initial state
  useEffect(() => {
    if (!lesson || !user) return;

    const isSaved = lesson.favorites?.includes(user.email);
    setSaved(!!isSaved);

    setFavoritesCount(lesson.favoritedCount || 0);

  }, [lesson, user]);


  // const toggleSave = async () => {
  //   if (!user) {
  //     toast.error("Please log in.");
  //     return;
  //   }

  //   try {
  //     // Optimistic UI update
  //     setSaved(prev => !prev);
  //     setFavoritesCount(prev => saved ? prev - 1 : prev + 1);

  //     const res = await axiosSecure.patch("/lessons/save-to-favorites", {
  //       lessonId: lesson._id,
  //     });

  //     toast.success(res.data.message);

  //     // Re-fetch from parent (optional)
  //     refetchFn?.();

  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to update.");
  //   }
  // };


  const toggleSave = async () => {
  if (!user) {
    toast.error("Please log in.");
    return;
  }

  try {
    const newSaved = !saved; 
    setSaved(newSaved);
    setFavoritesCount(prev => newSaved ? prev + 1 : prev - 1);

    const res = await axiosSecure.patch("/lessons/save-to-favorites", {
      lessonId: lesson._id,
    });

    toast.success(res.data.message);
    refetchFn?.();
  } catch (error) {
    console.error(error);
    toast.error("Failed to update.");
  }
};

  return { saved, favoritesCount, toggleSave };
}

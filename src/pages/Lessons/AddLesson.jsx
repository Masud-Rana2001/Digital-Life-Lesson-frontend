import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from './../../hooks/useAuth';
import { imageUpload } from "../../utils";

export default function AddLesson() {
  const { user } = useAuth();
 
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const description = watch("description") || "";
  const maxChars = 1200;

  const onSubmit = async (data) => {
    let imageUrl = await imageUpload(data.image);
    data.image = imageUrl;

    const newLesson = {
      ...data,
      creator: {
        userId: user?._id,
        email : user?.email,
        name: user?.displayName,
        photoURL: user?.photoURL || "/user.jpeg",
      },
      likes: [],
      likesCount:0,
      favorites: [],
      favoritedCount:0,
      views: 0,
      comments: [],
      commentsCount : 0,
      isFeatured : false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await axiosInstance.post("/lessons", newLesson);
    console.log(result)
    if (result.data.insertedId) {
        Swal.fire({
          title: "Lesson Added",
          text: "Your life lesson is now saved.",
          icon: "success",
        });
        reset();
        navigate("/dashboard/my-lessons");
      }
     
  };

  return (
    <div
      className="
      min-h-screen
      max-w-5xl mx-auto mt-14 p-10 
      rounded-3xl shadow-xl
      bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-50
      backdrop-blur-xl border border-white/60
    "
    >
      {/* HEADING */}
      <h1
        className="
        text-4xl font-extrabold text-center mb-10
        bg-gradient-to-r from-sky-600 to-cyan-600 
        bg-clip-text text-transparent
      "
      >
        Add a New Life Lesson
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        
        {/* IMAGE UPLOAD */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="block w-full bg-white/80 
            border border-dashed border-cyan-300 
            rounded-xl p-3 text-sm cursor-pointer
            focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* TITLE */}
        <div>
          <label className="font-semibold text-gray-700">Lesson Title</label>
          <input
            type="text"
            placeholder="Enter your life lesson title"
            {...register("title", { required: true })}
            className="w-full mt-2 p-4 rounded-xl border 
            bg-white/80 border-gray-300
            focus:ring-2 focus:ring-cyan-400"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">Title is required</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold text-gray-700">
            Full Story / Description
          </label>
          <textarea
            rows="7"
            placeholder="Write your lesson, experience, or story..."
            maxLength={maxChars}
            {...register("description", { required: true })}
            className="
            w-full mt-2 p-4 rounded-xl border
            bg-white/80 border-gray-300
            focus:ring-2 focus:ring-cyan-400"
          />
          <div className="flex justify-between mt-1 text-sm opacity-75 text-gray-700">
            <span>
              {errors.description ? (
                <span className="text-red-500">Description is required</span>
              ) : (
                "Share the moment and the lesson you learned from it."
              )}
            </span>
            <span>{description.length}/{maxChars}</span>
          </div>
        </div>

        {/* CATEGORY + TONE */}
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <label className="font-semibold text-gray-700">Category</label>
            <select
              {...register("category", { required: true })}
              className="select w-full mt-2 rounded-xl border 
              bg-white/80 border-gray-300
              focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Select category</option>
              <option>Personal Growth</option>
              <option>Career</option>
              <option>Mindset</option>
              <option>Relationships</option>
              <option>Mistakes Learned</option>
              <option>Emotional Healing</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-700">
              Emotional Tone
            </label>
            <select
              {...register("emotionalTone", { required: true })}
              className="select w-full mt-2 rounded-xl border 
              bg-white/80 border-gray-300
              focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Select tone</option>
              <option>Motivational</option>
              <option>Sad</option>
              <option>Realization</option>
              <option>Gratitude</option>
              <option>Hard Truth</option>
              <option>Inspirational</option>
            </select>
          </div>
        </div>

        {/* ACCESS + VISIBILITY */}
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <label className="font-semibold text-gray-700">Access Level</label>
            <select
              {...register("accessLevel", { required: true })}
              className="select w-full mt-2 rounded-xl border 
              bg-white/80 border-gray-300
              focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Choose access</option>
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-700">Visibility</label>
            <select
              {...register("visibility", { required: true })}
              className="select w-full mt-2 rounded-xl border 
              bg-white/80 border-gray-300
              focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Choose visibility</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          className="
          w-full py-4 mt-4 rounded-2xl text-lg font-bold 
          text-white shadow-lg
          bg-gradient-to-r from-sky-500 to-cyan-600
          hover:shadow-2xl hover:scale-[1.02] 
          transition-all"
        >
          Save Lesson
        </button>
      </form>
    </div>
  );
}

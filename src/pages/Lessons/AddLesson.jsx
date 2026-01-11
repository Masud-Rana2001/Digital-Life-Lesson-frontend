import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiFileText, FiHeart, FiImage, FiLock, FiSave, FiTag, FiType, FiX } from "react-icons/fi";
import { useNavigate } from "react-router";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../utils";
import SuccessAnimation from "./ShareComponent/SuccessAnimation";

const categories = [
  { value: "Personal Growth", icon: "🌱" },
  { value: "Career", icon: "💼" },
  { value: "Mindset", icon: "🧠" },
  { value: "Relationships", icon: "❤️" },
  { value: "Mistakes Learned", icon: "💡" },
  { value: "Emotional Healing", icon: "🌈" },
];

const emotionalTones = [
  { value: "Motivational", icon: "🔥" },
  { value: "Sad", icon: "😢" },
  { value: "Realization", icon: "💭" },
  { value: "Gratitude", icon: "🙏" },
  { value: "Hard Truth", icon: "⚡" },
  { value: "Inspirational", icon: "✨" },
];

export default function AddLesson() {
  const { user } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const ANIMATION_DURATION_MS = 1500;
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
  const title = watch("title") || "";
  const maxChars = 1200;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      let imageUrl = await imageUpload(data.image);
      data.image = imageUrl;

      const newLesson = {
        ...data,
        creator: {
          userId: user?._id,
          email: user?.email,
          name: user?.displayName,
          photoURL: user?.photoURL || "/user.jpeg",
        },
        likes: [],
        likesCount: 0,
        favorites: [],
        favoritedCount: 0,
        views: Math.round(Math.random() * 10000),
        comments: [],
        commentsCount: 0,
        reportCount: 0,
        reports: [],
        isFeatured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await axiosInstance.post("/lessons", newLesson);
      
      if (result.data.insertedId) {
        setShowSuccess(true);
        reset();
        setImagePreview(null);

        setTimeout(() => {
          setShowSuccess(false);
          navigate("/dashboard/my-lessons");
        }, ANIMATION_DURATION_MS);
      }
    } catch (error) {
      console.error("Error creating lesson:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Success Animation */}
      {showSuccess && <SuccessAnimation message="Lesson Added Successfully 🎉" />}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-lg mb-2">
            Create a New <span className="text-gradient">Life Lesson</span>
          </h1>
          <p className="text-base-content/60">
            Share your wisdom and experiences with the community
          </p>
        </div>

        {/* Form Card */}
        <div className="card-uniform p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Image Upload Section */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <FiImage className="w-4 h-4 text-primary" />
                Featured Image
              </label>
              
              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-base-300">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 btn btn-circle btn-sm btn-error"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-base-300 rounded-2xl cursor-pointer bg-base-200/50 hover:bg-base-200 hover:border-primary/50 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiImage className="w-10 h-10 text-base-content/40 mb-3" />
                    <p className="mb-2 text-sm text-base-content/70">
                      <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-base-content/50">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image", { onChange: handleImageChange })}
                  />
                </label>
              )}
            </div>

            {/* Title Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <FiType className="w-4 h-4 text-primary" />
                Lesson Title
                <span className="text-error">*</span>
              </label>
              <input
                type="text"
                placeholder="What's the main lesson you learned?"
                {...register("title", { required: "Title is required" })}
                className={`input input-bordered w-full bg-base-100 ${
                  errors.title ? "input-error" : ""
                }`}
              />
              <div className="flex justify-between mt-2">
                {errors.title ? (
                  <p className="text-error text-sm">{errors.title.message}</p>
                ) : (
                  <p className="text-base-content/50 text-sm">Make it clear and memorable</p>
                )}
                <span className="text-base-content/50 text-sm">{title.length}/100</span>
              </div>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <FiFileText className="w-4 h-4 text-primary" />
                Full Story / Description
                <span className="text-error">*</span>
              </label>
              <textarea
                rows="8"
                placeholder="Share the context, what happened, and the lesson you learned from it..."
                maxLength={maxChars}
                {...register("description", { required: "Description is required" })}
                className={`textarea textarea-bordered w-full bg-base-100 resize-none ${
                  errors.description ? "textarea-error" : ""
                }`}
              />
              <div className="flex justify-between mt-2">
                {errors.description ? (
                  <p className="text-error text-sm">{errors.description.message}</p>
                ) : (
                  <p className="text-base-content/50 text-sm">
                    Be authentic and share the real experience
                  </p>
                )}
                <span className={`text-sm ${description.length > maxChars * 0.9 ? "text-warning" : "text-base-content/50"}`}>
                  {description.length}/{maxChars}
                </span>
              </div>
              
              {/* Character Progress Bar */}
              <div className="w-full bg-base-300 rounded-full h-1.5 mt-2">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    description.length > maxChars * 0.9
                      ? "bg-warning"
                      : description.length > maxChars * 0.7
                      ? "bg-info"
                      : "bg-primary"
                  }`}
                  style={{ width: `${Math.min((description.length / maxChars) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Category & Emotional Tone */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <FiTag className="w-4 h-4 text-primary" />
                  Category
                  <span className="text-error">*</span>
                </label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className={`select select-bordered w-full bg-base-100 ${
                    errors.category ? "select-error" : ""
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.value}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-error text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              {/* Emotional Tone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <FiHeart className="w-4 h-4 text-primary" />
                  Emotional Tone
                  <span className="text-error">*</span>
                </label>
                <select
                  {...register("emotionalTone", { required: "Emotional tone is required" })}
                  className={`select select-bordered w-full bg-base-100 ${
                    errors.emotionalTone ? "select-error" : ""
                  }`}
                >
                  <option value="">Select a tone</option>
                  {emotionalTones.map((tone) => (
                    <option key={tone.value} value={tone.value}>
                      {tone.icon} {tone.value}
                    </option>
                  ))}
                </select>
                {errors.emotionalTone && (
                  <p className="text-error text-sm mt-1">{errors.emotionalTone.message}</p>
                )}
              </div>
            </div>

            {/* Access Level & Visibility */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Access Level */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <FiLock className="w-4 h-4 text-primary" />
                  Access Level
                  <span className="text-error">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="Free"
                      {...register("accessLevel", { required: "Access level is required" })}
                      className="peer hidden"
                    />
                    <div className="p-4 rounded-xl border-2 border-base-300 bg-base-100 text-center transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50">
                      <span className="text-2xl block mb-1">🆓</span>
                      <span className="font-medium">Free</span>
                      <p className="text-xs text-base-content/60 mt-1">Everyone can view</p>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="Premium"
                      {...register("accessLevel", { required: "Access level is required" })}
                      className="peer hidden"
                    />
                    <div className="p-4 rounded-xl border-2 border-base-300 bg-base-100 text-center transition-all peer-checked:border-warning peer-checked:bg-warning/5 hover:border-warning/50">
                      <span className="text-2xl block mb-1">⭐</span>
                      <span className="font-medium">Premium</span>
                      <p className="text-xs text-base-content/60 mt-1">Premium users only</p>
                    </div>
                  </label>
                </div>
                {errors.accessLevel && (
                  <p className="text-error text-sm mt-2">{errors.accessLevel.message}</p>
                )}
              </div>

              {/* Visibility */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <FiEye className="w-4 h-4 text-primary" />
                  Visibility
                  <span className="text-error">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="Public"
                      {...register("visibility", { required: "Visibility is required" })}
                      className="peer hidden"
                    />
                    <div className="p-4 rounded-xl border-2 border-base-300 bg-base-100 text-center transition-all peer-checked:border-success peer-checked:bg-success/5 hover:border-success/50">
                      <span className="text-2xl block mb-1">🌍</span>
                      <span className="font-medium">Public</span>
                      <p className="text-xs text-base-content/60 mt-1">Visible to all</p>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      value="Private"
                      {...register("visibility", { required: "Visibility is required" })}
                      className="peer hidden"
                    />
                    <div className="p-4 rounded-xl border-2 border-base-300 bg-base-100 text-center transition-all peer-checked:border-secondary peer-checked:bg-secondary/5 hover:border-secondary/50">
                      <span className="text-2xl block mb-1">🔒</span>
                      <span className="font-medium">Private</span>
                      <p className="text-xs text-base-content/60 mt-1">Only you can see</p>
                    </div>
                  </label>
                </div>
                {errors.visibility && (
                  <p className="text-error text-sm mt-2">{errors.visibility.message}</p>
                )}
              </div>
            </div>

            {/* Tips Section */}
            <div className="alert bg-info/10 border border-info/20">
              <div>
                <h4 className="font-semibold text-info mb-2">💡 Tips for a Great Lesson</h4>
                <ul className="text-sm text-base-content/70 space-y-1">
                  <li>• Be specific about the situation and context</li>
                  <li>• Share what you learned and how it changed you</li>
                  <li>• Include actionable advice others can apply</li>
                  <li>• Be authentic - real stories resonate more</li>
                </ul>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-ghost flex-1 sm:flex-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary flex-1 gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    Save Lesson
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

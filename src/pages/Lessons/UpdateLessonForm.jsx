import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from './../../hooks/useAuth';
import { imageUpload } from './../../utils/index';



export default function UpdateLessonForm({ lesson ,updaterFormRef,refetchFn}) {
    
    const lessonId = lesson?._id; 
    
    const axiosInstance = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: lesson.title,
            description: lesson.description,
            category: lesson.category,
            emotionalTone: lesson.emotionalTone,
            accessLevel: lesson.accessLevel,
            visibility: lesson.visibility,
        },
    });

    const description = watch("description") || "";
    const maxChars = 1200;

  const onSubmit = async (data) => {
       
        let imageUrl = lesson.image;
        console.log(imageUrl)
        if (data.image && data.image.length > 0) {
            Swal.fire({
                title: "Uploading Image...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            try {
                imageUrl = await imageUpload(data.image);
            } catch (error) {
                Swal.fire('Error', 'Failed to upload new image.', error.message);
                return;
            }
        }

        const updatedLesson = {
            title: data.title,
            description: data.description,
            category: data.category,
            emotionalTone: data.emotionalTone,
            accessLevel: data.accessLevel,
            visibility: data.visibility,
            image: imageUrl, 
            updatedAt: new Date(), 
        };

        try {
            
            const result = await axiosInstance.patch(`/update-lessons/${lessonId}`, updatedLesson);
            
            if (result.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Lesson Updated!",
                    text: "Your life lesson has been successfully modified.",
                    icon: "success",
                });
                refetchFn()
                updaterFormRef.current.close()
                navigate("/dashboard/my-lessons");
            } else {
                 Swal.fire({
                    title: "No Changes",
                    text: "No changes were detected or the update failed.",
                    icon: "info",
                });
            }
        } catch (error) {
             Swal.fire({
                title: "Update Failed",
                text: error.response?.data?.message || "An error occurred during update.",
                icon: "error",
            });
        }
    };

    return (
        <div
            className="
            min-h-screen
            max-w-5xl mx-auto px-5 py-10 md:px-10 
            rounded-3xl shadow-xl
            bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-50
            backdrop-blur-xl border border-white/60
        "
        >
            {/* HEADING */}
            <h1
                className="
                text-4xl font-extrabold text-center mb-5
                bg-gradient-to-r from-sky-600 to-cyan-600 
                bg-clip-text text-transparent
            "
            >
                Update Life Lesson
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
                
                <div className="flex justify-between gap-8 sm:flex-row flex-col">
                <div className="sm:mb-4 flex-1">
                    <label className="block mb-2 font-medium text-gray-700">
                        Current Featured Image
                    </label>
                    <img 
                        src={lesson.image} 
                        alt="Current Lesson" 
                        className=" object-cover rounded-xl shadow-md border-2 border-cyan-400"
                    />
                    <p className="text-sm text-gray-500 mt-1">Leave blank to keep the current image.</p>
                </div>
              
               
                <div className="flex-1 sm:mt-5">
                {/* IMAGE UPLOAD */}
                <div >
                    <label className="block mb-2 font-medium text-gray-700">
                        Upload New Image (Optional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className="block w-full bg-white/80 
                        border border-dashed border-cyan-300 
                        rounded-xl p-4 sm:p-5 text-sm cursor-pointer
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
                        
                        className="w-full mt-2 p-4 sm:p-5 rounded-xl border 
                        bg-white/80 border-gray-300
                        focus:ring-2 focus:ring-cyan-400"
                    />
                    {errors.title && (
                        <p className="text-sm text-red-500 mt-1">Title is required</p>
                    )}
                </div>
                </div>
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="font-semibold text-gray-700">
                        Full Story / Description
                    </label>
                    <textarea
                        rows="4"
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
                <div className="flex justify-between gap-8">

                    <button
                        type="submit"
                        className="
                        w-full py-2 mt-4 rounded-2xl text-lg font-bold 
                        text-white shadow-lg
                        bg-gradient-to-r from-sky-500 to-cyan-600
                        hover:shadow-2xl hover:scale-[1.02] 
                        transition-all"
                    >
                        Update Lesson
                    </button>
            <button
              type="button" 
              onClick={() => updaterFormRef.current.close()} 
                        className="
                        w-full py-2 mt-4 rounded-2xl text-lg font-bold 
                        text-white shadow-lg
                        bg-gradient-to-r from-red-500 to-yellow-600
                        hover:shadow-2xl hover:scale-[1.02] 
                        transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
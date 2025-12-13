import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { imageUpload, saveOrUpdate } from "../../utils";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, image } = data;
    const imageFile = image;

    try {
      const imageURL = await imageUpload(imageFile);

      await createUser(email, password);

      await saveOrUpdate({ name, email, imageURL });

      await updateUserProfile(name, imageURL);

      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Something went wrong!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      await saveOrUpdate({
        name: user?.displayName,
        email: user?.email,
        imageUrl: user?.photoURL,
      });
      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-50 px-4 py-10">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">
            Join Digital Life Lessons Community 💡
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="text-sm block mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-3 py-3 rounded-md border border-gray-300 bg-gray-100 focus:outline-lime-500"
              {...register("name", {
                required: "Name is required",
                maxLength: { value: 30, message: "Name too long" },
              })}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label className="text-sm block mb-1 text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Profile photo is required",
              })}
              className="w-full text-sm bg-gray-100 border border-dashed border-lime-400 rounded-md cursor-pointer p-2"
            />
            {errors.image && (
              <p className="text-xs text-red-500 mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-3 rounded-md border border-gray-300 bg-gray-100 focus:outline-lime-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm block mb-1 text-gray-700">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                className="w-full px-3 py-3 rounded-md border border-gray-300 bg-gray-100 focus:outline-lime-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                    message:
                      "Must include uppercase, lowercase, number & special character",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-xl text-gray-500"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 text-white py-3 rounded-md font-semibold hover:bg-lime-600 transition"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin mx-auto" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition"
        >
          <FcGoogle size={30} />
          <span className="font-medium">Continue with Google</span>
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-lime-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

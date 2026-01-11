import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FiImage, FiLock, FiMail, FiUser } from "react-icons/fi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";

import useAuth from "../../hooks/useAuth";
import { imageUpload, saveOrUpdate } from "../../utils";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    const { name, email, password, image } = data;
    setIsSubmitting(true);

    try {
      const imageURL = await imageUpload(image);
      await createUser(email, password);
      await saveOrUpdate({ name, email, imageURL });
      await updateUserProfile(name, imageURL);

      toast.success("Account created successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
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
      toast.success("Account created successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Google sign up failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-base-100 gradient-hero">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card-uniform p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-gradient">Digital Life Lessons</span>
            </Link>
            <h1 className="text-2xl font-bold text-base-content">Create Account</h1>
            <p className="text-base-content/60 text-sm mt-1">
              Join our community of learners and sharers
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Profile Image */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-base-200 border-4 border-primary/20 overflow-hidden mx-auto">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiImage className="w-8 h-8 text-base-content/30" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 btn btn-circle btn-sm btn-primary cursor-pointer">
                  <FiImage className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image", {
                      required: "Profile photo is required",
                      onChange: handleImageChange,
                    })}
                  />
                </label>
              </div>
              {errors.image && (
                <p className="text-error text-xs mt-2">{errors.image.message}</p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: { value: 30, message: "Name too long" },
                  })}
                  className={`input input-bordered w-full pl-12 ${
                    errors.name ? "input-error" : ""
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-error text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`input input-bordered w-full pl-12 ${
                    errors.email ? "input-error" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-error text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                      message: "Must include uppercase, lowercase, number & special character",
                    },
                  })}
                  className={`input input-bordered w-full pl-12 pr-12 ${
                    errors.password ? "input-error" : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-error text-xs mt-1">{errors.password.message}</p>
              )}
              <p className="text-xs text-base-content/50 mt-1">
                Min 8 chars with uppercase, lowercase, number & special character
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm mt-0.5"
                {...register("terms", {
                  required: "You must accept the terms",
                })}
              />
              <label className="text-sm text-base-content/70">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-error text-xs">{errors.terms.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="btn btn-primary w-full"
            >
              {isSubmitting || loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-base-300" />
            <span className="px-4 text-sm text-base-content/50">OR</span>
            <div className="flex-1 h-px bg-base-300" />
          </div>

          {/* Social Login */}
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full gap-3"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-center text-base-content/60 text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              state={from}
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <p className="text-center mt-6">
          <Link to="/" className="text-sm text-base-content/60 hover:text-primary">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

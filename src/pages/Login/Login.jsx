import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FiLock, FiMail, FiZap } from "react-icons/fi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, Navigate, useLocation, useNavigate } from "react-router";

import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { saveOrUpdate } from "../../utils";

const DEMO_CREDENTIALS = {
  email: "admin@email.com",
  password: "AAAa@1234",
};

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace />;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { user } = await signIn(data.email, data.password);

      await saveOrUpdate({
        name: user?.displayName,
        email: user?.email,
        imageUrl: user?.photoURL,
      });

      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Login failed!");
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

      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error(err?.message || "Google login failed!");
    }
  };

  const handleDemoLogin = () => {
    setValue("email", DEMO_CREDENTIALS.email);
    setValue("password", DEMO_CREDENTIALS.password);
    toast.success("Demo credentials filled! Click Continue to login.");
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
            <h1 className="text-2xl font-bold text-base-content">Welcome Back 👋</h1>
            <p className="text-base-content/60 text-sm mt-1">
              Login to access your account
            </p>
          </div>

          {/* Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full btn btn-outline btn-accent mb-6 gap-2"
          >
            <FiZap className="w-5 h-5" />
            Fill Demo Credentials
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
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
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
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
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Continue"
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

          {/* Sign Up Link */}
          <p className="text-center text-base-content/60 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              state={from}
              className="text-primary font-semibold hover:underline"
            >
              Create Account
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

export default Login;

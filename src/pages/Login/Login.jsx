import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { saveOrUpdate } from "../../utils";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace />;

  const onSubmit = async (data) => {
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

  return (
    <div className="flex justify-center items-center min-h-screen py-10 bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome Back 👋</h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to access your Digital Life Lessons account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-sm block text-gray-700 mb-1">
              Email Address
            </label>
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
              className="w-full px-3 py-3 rounded-md bg-gray-100 border focus:outline-lime-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm block text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
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
                className="w-full px-3 py-3 rounded-md bg-gray-100 border focus:outline-lime-500"
              />

              <button
                type="button"
                className="absolute right-3 top-3 text-xl text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-lime-500 text-white font-semibold hover:bg-lime-600 transition"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin mx-auto" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div className="flex items-center py-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-md hover:bg-gray-50 transition"
        >
          <FcGoogle size={26} />
          <span className="font-medium">Continue with Google</span>
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            state={from}
            className="text-lime-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router"
import toast from "react-hot-toast"
import LoadingSpinner from "../../components/Shared/LoadingSpinner"
import useAuth from "../../hooks/useAuth"
import { FcGoogle } from "react-icons/fc"
import { TbFidgetSpinner } from "react-icons/tb"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import { saveOrUpdate } from "../../utils"

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || "/"

  // Password show/hide state
  const [showPassword, setShowPassword] = useState(false)

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace />

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.target
    const email = form.email.value
    const password = form.password.value

    try {
      const { user } = await signIn(email, password);
      await saveOrUpdate(
              {
                name: user?.displayName,
                email: user?.email,
                imageUrl: user?.photoURL
              })
      toast.success("Login Successful")
      navigate(from, { replace: true })
    } catch (err) {
      console.error(err)
      toast.error(err?.message || "Login failed!")
    }
  }

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const {user} = await signInWithGoogle();
       await saveOrUpdate(
              {
                name: user?.displayName,
                email: user?.email,
                imageUrl: user?.photoURL
              })
      toast.success("Login Successful")
      navigate(from, { replace: true })
    } catch (err) {
      console.error(err)
      setLoading(false)
      toast.error(err?.message || "Google login failed!")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-50  px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome Back 👋</h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to access your Digital Life Lessons account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm mb-1 block text-gray-700">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-lime-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm mb-1 block text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="current-password"
                placeholder="Enter Password"
                className="w-full px-3 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-lime-500"
              />

              {/* Show/Hide Password Button */}
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-lime-500 text-white font-semibold hover:bg-lime-600 transition"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin mx-auto text-white" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-right mt-2">
          <button className="text-xs text-gray-500 hover:text-lime-500">
            Forgot password?
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center py-6">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition cursor-pointer"
        >
          <FcGoogle size={28} />
          <span className="font-medium">Continue with Google</span>
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
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
  )
}

export default Login

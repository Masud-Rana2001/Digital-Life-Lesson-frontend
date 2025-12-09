import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Pricing() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const axiosInstance = useAxiosSecure()

  // -------- Fetch user's plan status --------
  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user-plan", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/plan/${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return (
      <div className="py-20 text-center text-xl font-semibold">
        Loading your plan...
      </div>
    );
  }

  const isPremium = userData?.isPremium === true;

  // -------- Handle Payment (Stripe Checkout) --------
  const handleCheckout = async () => {
    try {
      const paymentInfo =  {
        email: user?.email,
        price: 1500
      }
      const res = await axiosInstance.post("/create-checkout-session",paymentInfo);

      window.location.href = res.data.url; 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-10 bg-gradient-to-r bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-50 shadow rounded-2xl">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Choose Your Plan</h1>
          <p className="text-gray-600 mt-2">
            Unlock lifelong value with a one-time upgrade to Premium.
          </p>

          {isPremium && (
            <span className="inline-block mt-4 bg-yellow-400 text-black font-semibold px-4 py-1 rounded-full">
              ⭐ You are already a Premium Member
            </span>
          )}
        </div>

        {/* --- PRICING TABLE --- */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* FREE PLAN */}
          <div className="bg-white rounded-xl shadow-md p-8 border">
            <h2 className="text-2xl font-bold text-gray-800">Free Plan</h2>
            <p className="text-gray-500 mb-6">For new users</p>

            <ul className="space-y-3 text-gray-700">
              <li>✔ 50 lessons max</li>
              <li>✔ Normal lesson editor</li>
              <li>✔ Limited visibility</li>
              <li>✔ Community access</li>
              <li>✖ Ads may appear</li>
              <li>✖ No priority listing</li>
              <li>✖ Cannot create premium lessons</li>
              <li>✖ No advanced analytics</li>
            </ul>

            <div className="mt-6 font-bold text-3xl">৳0</div>

            <button
              disabled
              className="mt-4 w-full bg-gray-300 text-gray-600 py-2 rounded-lg cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* PREMIUM PLAN */}
          <div className="bg-white rounded-xl shadow-xl p-8 border border-blue-400">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              Premium Plan ⭐
            </h2>
            <p className="text-gray-500 mb-6">Lifetime Access</p>

            <ul className="space-y-3 text-gray-700">
              <li>✔ Unlimited lessons</li>
              <li>✔ Premium lesson creation tools</li>
              <li>✔ Ad-free experience</li>
              <li>✔ Priority listing on homepage</li>
              <li>✔ Exclusive featured badge</li>
              <li>✔ Early access to new features</li>
              <li>✔ Lifetime access (one-time payment)</li>
              <li>✔ Premium support</li>
            </ul>

            <div className="mt-6 font-bold text-3xl text-blue-600">৳1500</div>

            {!isPremium ? (
              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Upgrade to Premium
              </button>
            ) : (
              <button
                disabled
                className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg font-semibold"
              >
                You’re Premium ⭐
              </button>
            )}
          </div>
        </div>

        {/* FOOTNOTE */}
        <p className="text-center text-gray-500 mt-10">
          100% secure payment powered by Stripe. Test mode enabled.
        </p>
      </div>
    </div>
  );
}

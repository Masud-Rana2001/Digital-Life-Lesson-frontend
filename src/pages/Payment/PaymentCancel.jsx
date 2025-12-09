import React from "react"
import { useNavigate } from "react-router"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import LoadingSpinner from "../../components/Shared/LoadingSpinner"
import useAuth from './../../hooks/useAuth';


export default function PaymentCancelled() {
  const {user} = useAuth()
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()

  // Read session id from URL
  const params = new URLSearchParams(window.location.search)
  const sessionId = params.get("session_id")

  const { data: cancelData = {}, isLoading } = useQuery({
    queryKey: ["payment-cancel", sessionId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-cancel?session_id=${sessionId}`
      )
      return res.data
    },
    enabled: !!sessionId,
  })

  if (isLoading) return <LoadingSpinner />


   // -------- Handle Payment (Stripe Checkout) --------
  const handleCheckout = async () => {
    try {
      const paymentInfo =  {
        email: user?.email,
        price: 1500
      }
      const res = await axiosSecure.post("/create-checkout-session",paymentInfo);

      window.location.href = res.data.url; 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* ❌ Red Cancel Icon */}
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          You cancelled the payment. You can retry anytime.
        </p>

        {/* INFO BOX */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left border">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Plan:</strong> {cancelData?.planName || "Premium Plan"}
          </p>

          <p className="text-sm text-gray-700 mb-2">
            <strong>Amount:</strong>{" "}
            {cancelData?.amount
              ? `${cancelData.amount} TK`
              : "Not Available"}
          </p>

          <p className="text-sm text-gray-700">
            <strong>Status:</strong> Cancelled
          </p>
        </div>

        {/* Retry Button */}
        <button
          onClick={handleCheckout}
          className="btn bg-red-500 hover:bg-red-600 text-white w-full mb-3"
        >
          Retry Payment
        </button>

        {/* Dashboard */}
        {/* <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-outline w-full mb-3"
        >
          Go to Dashboard
        </button> */}

        {/* Home */}
        <button
          onClick={() => navigate("/")}
          className="btn btn-outline w-full mb-3"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

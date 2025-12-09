import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (session_id) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/payment-success`, {
          sessionId: session_id,
        })
        .then((res) => {
          setVerified(true);
        })
        .catch((err) => {
          console.error("Verification failed:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [session_id]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-base-100 shadow-xl rounded-2xl p-10 max-w-lg w-full text-center border border-base-content/10">

        {/* ICON */}
        <IoCheckmarkCircleOutline className="w-24 h-24 text-green-500 mx-auto mb-4" />

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-base-content mb-3">
          {loading
            ? "Verifying Payment..."
            : verified
            ? "Payment Successful!"
            : "Payment Verified"}
        </h1>

        {/* MESSAGE */}
        <p className="text-base-content/70 mb-6 leading-relaxed">
          {loading
            ? "Please wait while we verify your premium membership..."
            : "Thank you! Your Premium Membership is now activated 🎉"}
        </p>

        {/* BADGE */}
        {!loading && verified && (
          <div className="badge badge-success badge-lg py-4 px-6 mb-6 text-white">
            ⭐ Lifetime Premium Activated
          </div>
        )}

        {/* CTA BUTTONS */}
        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard"
            className="btn btn-primary btn-lg w-full"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/"
            className="btn btn-outline btn-accent w-full"
          >
            Explore Life Lessons
          </Link>
        </div>

        {/* SMALL NOTE */}
        {!loading && (
          <p className="mt-6 text-xs text-base-content/40">
            A confirmation email has been sent to your account.
          </p>
        )}
      </div>
    </div>
  );
}

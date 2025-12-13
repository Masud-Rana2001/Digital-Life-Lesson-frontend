
import React from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import Button from "../components/Shared/Button/Button";
import Erroranimation from "../assets/lottie/Erroranimation.json";

const  ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl mx-auto text-center bg-white p-10 rounded-2xl shadow-2xl border border-red-100">

        <div className="w-full max-w-xs mx-auto mb-8">
          <Lottie
            animationData={Erroranimation}
            loop
            autoplay
            style={{ height: 250 }}
          />
        </div>

        <h1 className="text-6xl font-extrabold text-red-500 mb-4">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-800 md:text-4xl mb-3">
          Oops! Page Not Found.
        </h2>

        <p className="mt-4 text-gray-600">
          It looks like you've stumbled upon a digital black hole. We can't find the wisdom you are looking for.
        </p>

        <div className="flex items-center w-full mt-8 gap-x-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center px-5 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-lg gap-x-2 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:rotate-180 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>Go Back</span>
          </button>

          <Button
            label="Take Me Home"
            onClick={() => navigate("/")}
            className="bg-red-500 text-white hover:bg-red-600 transition-colors py-2 px-5 rounded-lg"
          />
        </div>

      </div>
    </section>
  );
};


export default ErrorPage
import Lottie from "lottie-react";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router";

import Erroranimation from "../assets/lottie/Erroranimation.json";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-base-100 gradient-hero">
      <div className="max-w-xl mx-auto text-center card-uniform p-10">
        {/* Animation */}
        <div className="w-full max-w-xs mx-auto mb-6">
          <Lottie
            animationData={Erroranimation}
            loop
            autoplay
            style={{ height: 200 }}
          />
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-gradient mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-3">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="text-base-content/70 mb-8">
          It looks like you've stumbled upon a digital black hole. 
          The wisdom you're looking for isn't here.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline gap-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="btn btn-primary gap-2"
          >
            <FiHome className="w-4 h-4" />
            Take Me Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;

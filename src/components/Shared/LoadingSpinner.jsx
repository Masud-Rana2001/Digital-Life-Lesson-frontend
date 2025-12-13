// src/components/Shared/LottieLoadingSpinner.jsx

import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie/loading.json";

const LottieLoadingSpinner = ({ smallHeight = false }) => {
  return (
    <div
      className={`
        w-full
        ${smallHeight ? "min-h-[200px]" : "min-h-screen"}
        flex
        flex-col
        justify-center
        items-center
        px-4
        text-center
      `}
    >
      {/* Lottie Animation */}
      <div
        className="
          w-60 h-60
          md:w-80 md:h-80
          lg:w-100 lg:h-100
        "
      >
        <Lottie
          animationData={loadingAnimation}
          loop
          autoplay
        />
      </div>

     
    </div>
  );
};

export default LottieLoadingSpinner;

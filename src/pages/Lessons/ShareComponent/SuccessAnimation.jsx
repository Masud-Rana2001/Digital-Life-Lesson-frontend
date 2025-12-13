import Lottie from "lottie-react";
import successAnimation from "../../../assets/lottie/Success.json";

export default function SuccessAnimation({ message }) {
  return (
    <div className="
      fixed inset-0 z-[9999]
      flex flex-col items-center justify-center
      bg-black/40 backdrop-blur-sm
    ">
      <div className="w-72">
        <Lottie animationData={successAnimation} loop={false} />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        {message || "Lesson Saved Successfully"}
      </h2>
    </div>
  );
}

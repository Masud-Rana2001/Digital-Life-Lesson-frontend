import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { motion } from "framer-motion";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    title: "Preserve Your Personal Wisdom",
    subtitle:
      "Store, organize, and reflect on the insights you've gathered throughout your journey so they never fade away.",
    buttonText: "Start Your First Lesson",
    buttonClass: "btn-primary",
    route: "/dashboard/add-lesson",
  },
  {
    id: 2,
    title: "Grow Through Shared Experience",
    subtitle:
      "Explore public lessons, learn emotional perspectives, and grow faster with community-driven experiences.",
    buttonText: "Explore Public Lessons",
    buttonClass: "btn-secondary",
    route: "/lessons",
  },
  {
    id: 3,
    title: "Unlock Exclusive Insights",
    subtitle:
      "Upgrade to premium to access expert-curated lessons, unlock hidden insights, and track your emotional growth deeply.",
    buttonText: "Upgrade to Premium",
    buttonClass: "btn-accent",
    route: "/pricing",
  },
];

const contentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, delay: 0.25 },
  },
};

export default function Banner() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="
          min-h-[550px] relative  overflow-hidden rounded-3xl shadow

          /* Light Blue Gradient Background */
          bg-[radial-gradient(circle_at_20%_20%,#d0f0ff88,transparent_60%),
             radial-gradient(circle_at_80%_80%,#a0e0ff77,transparent_70%),
             radial-gradient(circle_at_50%_100%,#b0e8ff55,transparent_80%),
             linear-gradient(to_br,#e0f7ff,#bbf0ff)]
        "
      >

        {/* Light Beams */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-300/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] bg-blue-300/15 blur-3xl rounded-full"></div>
          <div className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-cyan-300/15 blur-2xl rounded-full"></div>
        </div>

        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex items-center justify-center min-h-[550px] py-20 px-4 relative z-10 ">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={contentVariants}
                className="w-full max-w-4xl text-center"
              >
                {/* Glass Card */}
                <div className="
                   bg-sky-900/20       
                    backdrop-blur-3xl
                    shadow-2xl shadow-sky-300/30  
                    border border-white/30
                    p-10 md:p-16
                    rounded-3xl 
                    transition-all duration-300
                ">
                  <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-gray-900">
                    {slide.title}
                  </h2>

                  <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
                    {slide.subtitle}
                  </p>

                  <Link
                    to={slide.route}
                    className={`btn ${slide.buttonClass} btn-lg font-semibold px-10 transition duration-300 hover:scale-[1.02]`}
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

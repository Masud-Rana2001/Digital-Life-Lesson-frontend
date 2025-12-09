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
        className="min-h-[530px]  rounded-2xl shadow overflow-hidden  bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-50  transition-all duration-300"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex items-center justify-center min-h-[530px] py-20">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={contentVariants}
                className="container mx-auto px-6 max-w-4xl text-center"
              >
                <div className="bg-white  backdrop-blur-xl shadow-md p-10 md:p-16 rounded-2xl border border-white/30 dark:border-white/10">
                  <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-primary dark:text-accent leading-tight">
                    {slide.title}
                  </h2>

                  <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-base-content/80 dark:text-base-content/70">
                    {slide.subtitle}
                  </p>

                  <Link
                    to={slide.route}
                    className={`btn ${slide.buttonClass} btn-lg font-semibold px-10`}
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

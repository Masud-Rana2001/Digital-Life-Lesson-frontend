// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// import { motion } from "framer-motion";
// import { FiArrowRight } from "react-icons/fi";
// import { Link } from "react-router";

// const slides = [
//   {
//     id: 1,
//     title: "Preserve Your Personal Wisdom",
//     subtitle:
//       "Store, organize, and reflect on the insights you've gathered throughout your journey so they never fade away.",
//     buttonText: "Start Your First Lesson",
//     buttonClass: "btn-primary",
//     route: "/dashboard/add-lesson",
//     image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=800&fit=crop",
//   },
//   {
//     id: 2,
//     title: "Grow Through Shared Experience",
//     subtitle:
//       "Explore public lessons, learn emotional perspectives, and grow faster with community-driven experiences.",
//     buttonText: "Explore Public Lessons",
//     buttonClass: "btn-secondary",
//     route: "/lessons",
//     image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
//   },
//   {
//     id: 3,
//     title: "Unlock Exclusive Insights",
//     subtitle:
//       "Upgrade to premium to access expert-curated lessons, unlock hidden insights, and track your emotional growth deeply.",
//     buttonText: "Upgrade to Premium",
//     buttonClass: "btn-accent",
//     route: "/pricing",
//     image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop",
//   },
// ];

// const contentVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 120, delay: 0.25 },
//   },
// };

// export default function Banner() {
//   return (
//     <div className="w-full">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay, EffectFade]}
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         effect="fade"
//         loop
//         className="h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[450px] max-h-[700px] rounded-3xl overflow-hidden shadow-xl"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative w-full h-full">
//               {/* Background Image */}
//               <div
//                 className="absolute inset-0 bg-cover bg-center"
//                 style={{ backgroundImage: `url(${slide.image})` }}
//               />
              
//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-r from-white-100/10 via-base-100/80 to-transparent dark:from-base-100/98 dark:via-base-100/85" />

//               {/* Content */}
//               <div className="relative z-10 h-full flex items-center">
//                 <div className="container-custom">
//                   <motion.div
//                     initial="hidden"
//                     animate="visible"
//                     variants={contentVariants}
//                     className="max-w-2xl"
//                   >
//                     <h1 className="heading-xl mb-6 leading-tight">
//                       {slide.title}
//                     </h1>

//                     <p className="text-lg md:text-xl text-base-content/80 mb-8 leading-relaxed">
//                       {slide.subtitle}
//                     </p>

//                     <div className="flex flex-wrap gap-4">
//                       <Link
//                         to={slide.route}
//                         className={`btn ${slide.buttonClass} btn-lg gap-2`}
//                       >
//                         {slide.buttonText}
//                         <FiArrowRight className="w-5 h-5" />
//                       </Link>
//                       <Link
//                         to="/lessons"
//                         className="btn btn-outline btn-lg"
//                       >
//                         Browse Lessons
//                       </Link>
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }










import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination, Parallax } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router";

// Import Swiper styles
"use client";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SLIDES = [
  {
    id: 1,
    title: "Preserve Your Personal Wisdom",
    subtitle: "Store, organize, and reflect on the insights you've gathered throughout your journey so they never fade away.",
    buttonText: "Start Your First Lesson",
    buttonClass: "btn-primary",
    route: "/dashboard/add-lesson",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 2,
    title: "Grow Through Shared Experience",
    subtitle: "Explore public lessons, learn emotional perspectives, and grow faster with community-driven experiences.",
    buttonText: "Explore Public Lessons",
    buttonClass: "btn-secondary",
    route: "/lessons",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 3,
    title: "Unlock Exclusive Insights",
    subtitle: "Upgrade to premium to access expert-curated lessons, unlock hidden insights, and track your emotional growth.",
    buttonText: "Upgrade to Premium",
    buttonClass: "btn-accent",
    route: "/pricing",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000",
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full overflow-hidden group rounded-2xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        parallax={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          renderBullet: (index, className) => 
            `<span class="${className} transition-all duration-300 w-3 h-3 bg-white/50 hover:bg-white rounded-full inline-block mx-1 cursor-pointer"></span>`,
        }}
        navigation={{
          nextEl: ".btn-next",
          prevEl: ".btn-prev",
        }}
        className="h-[70vh] md:h-[80vh] min-h-[550px] max-h-[850px]"
      >
        {SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full overflow-hidden">
              {/* Background with Zoom Effect */}
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: activeIndex === index ? 1 : 1.1 }}
                transition={{ duration: 6, ease: "linear" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Advanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-black/20" /> {/* Slight darkening for contrast */}

              {/* Content Container */}
              <div className="relative z-10 h-full container mx-auto px-6 flex items-center">
                <div className="max-w-3xl">
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6"
                        >
                          Discover Growth
                        </motion.span>
                        
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
                          {slide.title}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
                          {slide.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-5">
                          <Link
                            to={slide.route}
                            className={`btn ${slide.buttonClass} btn-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group/btn`}
                          >
                            {slide.buttonText}
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                          
                          <Link
                            to="/lessons"
                            className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-4 rounded-xl backdrop-blur-sm"
                          >
                            Browse Catalog
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Controls */}
        <div className="absolute bottom-10 right-10 z-20 hidden md:flex gap-4">
          <button className="btn-prev p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all cursor-pointer backdrop-blur-md">
            <FiChevronLeft size={24} />
          </button>
          <button className="btn-next p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all cursor-pointer backdrop-blur-md">
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* Custom Pagination & Progress */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="custom-pagination flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm" />
        </div>
      </Swiper>
    </section>
  );
};

export default Banner;
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Amanda Chen',
    role: 'Life Coach',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    content: 'Digital Life Lessons has transformed how I document my personal growth journey. The platform makes it easy to reflect on experiences and share wisdom with my clients.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Entrepreneur',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    content: 'As someone who learns from failures, this platform is invaluable. I can look back at my lessons and see how far I\'ve come. The community here is incredibly supportive.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sarah Williams',
    role: 'Teacher',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    content: 'I use Digital Life Lessons with my students to help them reflect on their experiences. It\'s become an essential tool for developing emotional intelligence.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    content: 'The insights I\'ve gained from reading others\' lessons have helped me navigate career challenges. This platform is a hidden gem for personal development.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding glass-effect rounded-3xl overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-xl mb-4">
            What Our <span className="text-gradient">Community</span> Says
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Join thousands of people who are already transforming their lives through reflection and shared wisdom.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 btn btn-circle btn-ghost bg-base-100 shadow-lg hidden md:flex"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 btn btn-circle btn-ghost bg-base-100 shadow-lg hidden md:flex"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="card-uniform p-8 md:p-12 text-center"
            >
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-primary/20"
              />

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl text-base-content/80 mb-6 italic">
                "{testimonials[currentIndex].content}"
              </blockquote>

              <div>
                <p className="font-bold text-lg">{testimonials[currentIndex].name}</p>
                <p className="text-primary text-sm">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-base-300 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <button onClick={prev} className="btn btn-circle btn-ghost bg-base-200">
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="btn btn-circle btn-ghost bg-base-200">
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

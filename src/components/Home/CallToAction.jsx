import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router';

const CallToAction = () => {
  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop)',
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />

        {/* Content */}
        <div className="relative z-10 py-16 md:py-24 px-8 md:px-16 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of learners and sharers. Your wisdom could be 
            the light that guides someone through their darkest moment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none"
            >
              Get Started Free
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/lessons"
              className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary"
            >
              Explore Lessons
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Free Forever Plan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span>Global Community</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;

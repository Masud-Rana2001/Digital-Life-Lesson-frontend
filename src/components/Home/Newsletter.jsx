import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiCheck, FiMail } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    setIsSubmitting(false);
    toast.success('Successfully subscribed to our newsletter!');
    setEmail('');
  };

  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-effect rounded-3xl p-8 md:p-12 relative overflow-hidden"
      >
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <FiMail className="w-8 h-8 text-primary" />
          </div>

          <h2 className="heading-lg mb-4">
            Get Weekly <span className="text-gradient">Wisdom</span>
          </h2>
          <p className="text-base-content/70 mb-8">
            Subscribe to our newsletter and receive curated life lessons, 
            personal growth tips, and inspiring stories every week.
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 text-success"
            >
              <FiCheck className="w-6 h-6" />
              <span className="font-medium">You're subscribed! Check your inbox.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered flex-1"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}

          <p className="text-xs text-base-content/50 mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;

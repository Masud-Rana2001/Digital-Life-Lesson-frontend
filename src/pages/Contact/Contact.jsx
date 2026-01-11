import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FiMail, FiMapPin, FiMessageCircle, FiPhone, FiSend } from 'react-icons/fi';

const contactInfo = [
  {
    icon: FiMail,
    title: 'Email Us',
    details: 'support@digitallessons.com',
    subtext: 'We reply within 24 hours',
  },
  {
    icon: FiPhone,
    title: 'Call Us',
    details: '+880 1234 567 890',
    subtext: 'Mon-Fri, 9am-6pm (BST)',
  },
  {
    icon: FiMapPin,
    title: 'Visit Us',
    details: 'Dhaka, Bangladesh',
    subtext: 'Gulshan-2, Road 45',
  },
];

const faqs = [
  {
    question: 'How quickly will I get a response?',
    answer: 'We typically respond to all inquiries within 24 hours during business days.',
  },
  {
    question: 'Can I schedule a demo?',
    answer: 'Yes! Use the contact form and mention you\'d like a demo. We\'ll set up a call.',
  },
  {
    question: 'Do you offer enterprise solutions?',
    answer: 'Absolutely. Contact us for custom enterprise packages and team features.',
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading-xl mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Have questions, feedback, or just want to say hello? We'd love to hear 
            from you. Our team is here to help.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="grid sm:grid-cols-3 gap-6 mb-16">
        {contactInfo.map((info, index) => (
          <motion.div
            key={info.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-uniform p-6 text-center hover:border-primary/50"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <info.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-1">{info.title}</h3>
            <p className="text-base-content font-medium">{info.details}</p>
            <p className="text-base-content/60 text-sm">{info.subtext}</p>
          </motion.div>
        ))}
      </section>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card-uniform p-8">
            <div className="flex items-center gap-3 mb-6">
              <FiMessageCircle className="w-6 h-6 text-primary" />
              <h2 className="heading-md">Send us a Message</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register('name', { required: 'Name is required' })}
                  className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  {...register('subject', { required: 'Please select a subject' })}
                  className={`select select-bordered w-full ${errors.subject ? 'select-error' : ''}`}
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="text-error text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  placeholder="Tell us how we can help..."
                  rows={5}
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 20,
                      message: 'Message must be at least 20 characters',
                    },
                  })}
                  className={`textarea textarea-bordered w-full ${errors.message ? 'textarea-error' : ''}`}
                />
                {errors.message && (
                  <p className="text-error text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Right Side - FAQ & Social */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Quick FAQ */}
          <div className="card-uniform p-8">
            <h2 className="heading-md mb-6">Quick Answers</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="collapse collapse-arrow bg-base-200/50">
                  <input type="radio" name="faq-accordion" />
                  <div className="collapse-title font-medium">{faq.question}</div>
                  <div className="collapse-content">
                    <p className="text-base-content/70">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="card-uniform p-8">
            <h2 className="heading-md mb-6">Connect With Us</h2>
            <p className="text-base-content/70 mb-6">
              Follow us on social media for updates, tips, and community highlights.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="card-uniform overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.4!3d23.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzAwLjAiTiA5MMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

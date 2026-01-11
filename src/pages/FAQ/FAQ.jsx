import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown, FiMessageCircle, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router';

const faqCategories = [
  {
    name: 'Getting Started',
    icon: '🚀',
    faqs: [
      {
        question: 'What is Digital Life Lessons?',
        answer: 'Digital Life Lessons is a platform where you can capture, organize, and share the wisdom gained from your life experiences. It helps you preserve personal insights, reflect on meaningful moments, and learn from others\' journeys.',
      },
      {
        question: 'How do I create an account?',
        answer: 'Click the "Sign Up" button in the navigation bar. You can register using your email address or sign in with Google for quick access. The process takes less than a minute.',
      },
      {
        question: 'Is Digital Life Lessons free to use?',
        answer: 'Yes! We offer a free tier that includes creating and sharing lessons, saving favorites, and accessing public lessons. Premium features like advanced analytics and exclusive content are available with our paid plans.',
      },
      {
        question: 'Can I use the platform on mobile devices?',
        answer: 'Absolutely! Our platform is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. Access your lessons anywhere, anytime.',
      },
    ],
  },
  {
    name: 'Creating Lessons',
    icon: '✍️',
    faqs: [
      {
        question: 'How do I create a new lesson?',
        answer: 'After logging in, click "Add Lesson" in the navigation or dashboard. Fill in the title, description, category, and emotional tone. You can also add images to make your lesson more engaging.',
      },
      {
        question: 'What makes a good life lesson?',
        answer: 'A good life lesson is authentic, specific, and actionable. Share the context, what you learned, and how it changed your perspective. The best lessons come from genuine experiences and offer practical wisdom.',
      },
      {
        question: 'Can I edit or delete my lessons?',
        answer: 'Yes, you have full control over your content. Go to "My Lessons" in your dashboard to edit, update, or delete any lesson you\'ve created.',
      },
      {
        question: 'What categories are available?',
        answer: 'We offer categories including Personal Growth, Career, Mindset, Relationships, Mistakes Learned, and Emotional Healing. Choose the one that best fits your lesson\'s theme.',
      },
    ],
  },
  {
    name: 'Premium Features',
    icon: '⭐',
    faqs: [
      {
        question: 'What\'s included in Premium?',
        answer: 'Premium members get access to exclusive lessons, advanced search filters, detailed analytics on their lessons\' performance, priority support, and an ad-free experience.',
      },
      {
        question: 'How much does Premium cost?',
        answer: 'We offer flexible pricing plans starting at $9.99/month. Annual subscriptions come with a 20% discount. Check our Pricing page for detailed information.',
      },
      {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your Premium subscription at any time. You\'ll continue to have access to Premium features until the end of your billing period.',
      },
      {
        question: 'Is there a free trial?',
        answer: 'Yes! New users can enjoy a 7-day free trial of Premium features. No credit card required to start your trial.',
      },
    ],
  },
  {
    name: 'Privacy & Security',
    icon: '🔒',
    faqs: [
      {
        question: 'Who can see my lessons?',
        answer: 'You control the visibility of each lesson. Public lessons are visible to everyone, while private lessons are only visible to you. Premium lessons are visible only to Premium members.',
      },
      {
        question: 'How is my data protected?',
        answer: 'We use industry-standard encryption and security practices to protect your data. Your personal information is never sold to third parties.',
      },
      {
        question: 'Can I export my data?',
        answer: 'Yes, you can export all your lessons and data at any time from your account settings. We believe in data portability and your right to your content.',
      },
      {
        question: 'How do I report inappropriate content?',
        answer: 'Each lesson has a "Report" option. Click it to flag content that violates our community guidelines. Our moderation team reviews all reports within 24 hours.',
      },
    ],
  },
  {
    name: 'Community',
    icon: '👥',
    faqs: [
      {
        question: 'How do likes and saves work?',
        answer: 'Liking a lesson shows appreciation to the creator. Saving a lesson adds it to your favorites for easy access later. Both actions help surface quality content to the community.',
      },
      {
        question: 'Can I follow other users?',
        answer: 'Currently, you can view creator profiles and see their public lessons. Full follow functionality is coming soon in our next update.',
      },
      {
        question: 'How do I become a Top Contributor?',
        answer: 'Top Contributors are recognized based on their weekly activity score, which includes lessons created, comments given, and engagement received. Keep sharing valuable content!',
      },
      {
        question: 'Are there community guidelines?',
        answer: 'Yes, we have community guidelines that promote respectful, authentic, and helpful content. Please review them in our Terms of Service.',
      },
    ],
  },
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Getting Started');
  const [openQuestion, setOpenQuestion] = useState(null);

  const filteredFaqs = faqCategories.map((category) => ({
    ...category,
    faqs: category.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((category) => category.faqs.length > 0);

  const currentCategory = searchTerm
    ? filteredFaqs
    : faqCategories.filter((c) => c.name === activeCategory);

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading-xl mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Find answers to common questions about Digital Life Lessons. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>
      </section>

      {/* Search */}
      <section className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-12 h-14 text-lg"
          />
        </div>
      </section>

      {/* Category Tabs */}
      {!searchTerm && (
        <section className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {faqCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setActiveCategory(category.name);
                  setOpenQuestion(null);
                }}
                className={`btn ${
                  activeCategory === category.name
                    ? 'btn-primary'
                    : 'btn-ghost bg-base-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* FAQ List */}
      <section className="max-w-3xl mx-auto">
        {currentCategory.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-base-content/60 text-lg">
              No questions found matching "{searchTerm}"
            </p>
          </div>
        ) : (
          currentCategory.map((category) => (
            <div key={category.name} className="mb-8">
              {searchTerm && (
                <h2 className="heading-md mb-4 flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.name}
                </h2>
              )}
              <div className="space-y-3">
                {category.faqs.map((faq, index) => {
                  const isOpen = openQuestion === `${category.name}-${index}`;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="card-uniform overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setOpenQuestion(isOpen ? null : `${category.name}-${index}`)
                        }
                        className="w-full p-5 flex items-center justify-between text-left hover:bg-base-200/50 transition-colors"
                      >
                        <span className="font-medium pr-4">{faq.question}</span>
                        <FiChevronDown
                          className={`w-5 h-5 flex-shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-5 pb-5 text-base-content/70">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Contact CTA */}
      <section className="mt-16 glass-effect rounded-3xl p-8 md:p-12 text-center">
        <FiMessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="heading-lg mb-4">Still Have Questions?</h2>
        <p className="text-base-content/70 mb-8 max-w-xl mx-auto">
          Our support team is here to help. Reach out and we'll get back to you 
          within 24 hours.
        </p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          Contact Support
        </Link>
      </section>
    </div>
  );
};

export default FAQ;

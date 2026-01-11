import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowRight, FiClock, FiSearch, FiUser } from 'react-icons/fi';
import { Link } from 'react-router';

const blogPosts = [
  {
    id: 1,
    title: '10 Life Lessons That Changed My Perspective Forever',
    excerpt: 'Discover the transformative insights that helped me navigate life\'s challenges and find deeper meaning in everyday experiences.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop',
    author: 'Sarah Johnson',
    date: 'Jan 5, 2026',
    readTime: '8 min read',
    category: 'Personal Growth',
  },
  {
    id: 2,
    title: 'The Power of Reflection: Why Journaling Matters',
    excerpt: 'Learn how the simple act of writing down your thoughts can lead to profound self-discovery and emotional clarity.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop',
    author: 'Michael Chen',
    date: 'Jan 3, 2026',
    readTime: '6 min read',
    category: 'Mindfulness',
  },
  {
    id: 3,
    title: 'Building Resilience: Lessons from Failure',
    excerpt: 'How embracing failure as a teacher rather than an enemy can transform your approach to challenges and setbacks.',
    image: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=600&h=400&fit=crop',
    author: 'Emily Rodriguez',
    date: 'Dec 28, 2025',
    readTime: '10 min read',
    category: 'Resilience',
  },
  {
    id: 4,
    title: 'The Art of Meaningful Conversations',
    excerpt: 'Tips and techniques for having deeper, more authentic conversations that strengthen relationships.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&h=400&fit=crop',
    author: 'David Park',
    date: 'Dec 22, 2025',
    readTime: '7 min read',
    category: 'Relationships',
  },
  {
    id: 5,
    title: 'Finding Purpose in the Digital Age',
    excerpt: 'Navigating the complexities of modern life while staying true to your values and finding genuine fulfillment.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    author: 'Lisa Wang',
    date: 'Dec 18, 2025',
    readTime: '9 min read',
    category: 'Purpose',
  },
  {
    id: 6,
    title: 'Emotional Intelligence: The Key to Success',
    excerpt: 'Understanding and managing emotions is crucial for personal and professional success. Here\'s how to develop it.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop',
    author: 'James Wilson',
    date: 'Dec 15, 2025',
    readTime: '11 min read',
    category: 'Emotional Intelligence',
  },
];

const categories = ['All', 'Personal Growth', 'Mindfulness', 'Resilience', 'Relationships', 'Purpose', 'Emotional Intelligence'];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            Our <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Insights, stories, and wisdom to help you on your journey of 
            personal growth and self-discovery.
          </p>
        </motion.div>
      </section>

      {/* Search & Filter */}
      <section className="glass-effect rounded-2xl p-6 mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-12"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm ${
                  selectedCategory === category
                    ? 'btn-primary'
                    : 'btn-ghost bg-base-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-uniform overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <img
                src={filteredPosts[0].image}
                alt={filteredPosts[0].title}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="p-8 flex flex-col justify-center">
                <span className="badge badge-primary mb-4">{filteredPosts[0].category}</span>
                <h2 className="heading-md mb-4">{filteredPosts[0].title}</h2>
                <p className="text-base-content/70 mb-6">{filteredPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-base-content/60 mb-6">
                  <span className="flex items-center gap-1">
                    <FiUser className="w-4 h-4" />
                    {filteredPosts[0].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    {filteredPosts[0].readTime}
                  </span>
                </div>
                <Link
                  to={`/blog/${filteredPosts[0].id}`}
                  className="btn btn-primary w-fit"
                >
                  Read Article
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Blog Grid */}
      <section>
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-base-content/60 text-lg">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-uniform overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 badge badge-primary">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-base-content/60">
                    <span className="flex items-center gap-1">
                      <FiUser className="w-4 h-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="mt-16 glass-effect rounded-3xl p-8 md:p-12 text-center">
        <h2 className="heading-lg mb-4">Stay Updated</h2>
        <p className="text-base-content/70 mb-8 max-w-xl mx-auto">
          Subscribe to our newsletter and get the latest articles, tips, and 
          insights delivered straight to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered flex-1"
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default Blog;

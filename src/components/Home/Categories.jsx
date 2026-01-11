import { motion } from 'framer-motion';
import { Link } from 'react-router';

const categories = [
  {
    name: 'Personal Growth',
    icon: '🌱',
    description: 'Self-improvement and development',
    color: 'from-green-500/20 to-emerald-500/20',
    count: 2500,
  },
  {
    name: 'Career',
    icon: '💼',
    description: 'Professional insights and advice',
    color: 'from-blue-500/20 to-indigo-500/20',
    count: 1800,
  },
  {
    name: 'Mindset',
    icon: '🧠',
    description: 'Mental frameworks and thinking',
    color: 'from-purple-500/20 to-violet-500/20',
    count: 2100,
  },
  {
    name: 'Relationships',
    icon: '❤️',
    description: 'Love, family, and friendships',
    color: 'from-pink-500/20 to-rose-500/20',
    count: 1600,
  },
  {
    name: 'Mistakes Learned',
    icon: '💡',
    description: 'Wisdom from failures',
    color: 'from-amber-500/20 to-orange-500/20',
    count: 1400,
  },
  {
    name: 'Emotional Healing',
    icon: '🌈',
    description: 'Recovery and resilience',
    color: 'from-cyan-500/20 to-teal-500/20',
    count: 1200,
  },
];

const Categories = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-xl mb-4">
            Explore <span className="text-gradient">Categories</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Discover life lessons across different areas of personal development and growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/lessons?category=${encodeURIComponent(category.name)}`}
                className={`card-uniform p-6 block group hover:border-primary/50 bg-gradient-to-br ${category.color}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{category.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-base-content/70 text-sm mb-2">
                      {category.description}
                    </p>
                    <span className="text-xs text-base-content/50">
                      {category.count.toLocaleString()} lessons
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

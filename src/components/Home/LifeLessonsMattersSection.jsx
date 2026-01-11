import { motion } from 'framer-motion';
import { Link } from 'react-router';

const benefits = [
  {
    title: "Self-Awareness & Clarity",
    icon: "🧠",
    description: "Understand your strengths, weaknesses, and true motivations to live a more intentional life.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Better Decision Making",
    icon: "⚖️",
    description: "By reflecting on past outcomes, you develop intuition and make informed choices faster.",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Emotional Resilience",
    icon: "💪",
    description: "Lessons learned from failures build mental toughness, helping you bounce back from setbacks.",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Deeper Empathy & Connection",
    icon: "🤝",
    description: "Learning from diverse experiences increases your capacity to understand and relate to others.",
    color: "from-green-500/20 to-emerald-500/20",
  },
];

function LifeLessonsMattersSection() {
  return (
    <section className="section-padding glass-effect rounded-3xl">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-xl mb-4">
            Why Learning From <span className="text-gradient">Life Matters</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Every experience holds a lesson. Here's why capturing and reflecting on 
            life's wisdom can transform your journey.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`card-uniform p-6 text-center hover:border-primary/50 bg-gradient-to-br ${benefit.color}`}
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="font-bold text-lg mb-3">{benefit.title}</h3>
              <p className="text-base-content/70 text-sm mb-4">{benefit.description}</p>
              <Link
                to="/lessons"
                className="btn btn-sm btn-ghost text-primary"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LifeLessonsMattersSection;

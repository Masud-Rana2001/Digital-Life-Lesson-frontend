import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [
  { label: 'Active Users', value: 10000, suffix: '+', icon: '👥' },
  { label: 'Lessons Shared', value: 50000, suffix: '+', icon: '📚' },
  { label: 'Countries', value: 120, suffix: '+', icon: '🌍' },
  { label: 'Daily Reflections', value: 5000, suffix: '+', icon: '💭' },
];

const AnimatedCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const Statistics = () => {
  return (
    <section className="py-12">
      <div className="glass-effect rounded-3xl p-8 md:p-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-base-content/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;

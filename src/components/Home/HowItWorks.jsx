import { motion } from 'framer-motion';
import { FiEdit3, FiHeart, FiShare2, FiTrendingUp } from 'react-icons/fi';

const steps = [
  {
    icon: FiEdit3,
    title: 'Capture Your Lesson',
    description: 'Write down your life experience, the lesson learned, and the emotional context.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: FiShare2,
    title: 'Share with Community',
    description: 'Choose to keep it private or share with others who might benefit from your wisdom.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: FiHeart,
    title: 'Connect & Engage',
    description: 'Like, save, and comment on lessons that resonate with you. Build meaningful connections.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: FiTrendingUp,
    title: 'Grow Together',
    description: 'Track your journey, reflect on your growth, and inspire others along the way.',
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding glass-effect rounded-3xl">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-xl mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Start your journey of self-discovery and wisdom sharing in four simple steps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-base-300 to-transparent" />
              )}

              <div className="text-center">
                {/* Step Number */}
                <div className="relative inline-block mb-4">
                  <div className={`w-24 h-24 rounded-full ${step.bgColor} flex items-center justify-center`}>
                    <step.icon className={`w-10 h-10 ${step.color}`} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-base-100 border-2 border-primary flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-base-content/70 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

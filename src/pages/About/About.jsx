import { motion } from 'framer-motion';
import { FaHeart, FaLightbulb, FaRocket, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router';

const stats = [
  { label: 'Active Users', value: '10,000+' },
  { label: 'Lessons Shared', value: '50,000+' },
  { label: 'Countries', value: '120+' },
  { label: 'Success Stories', value: '5,000+' },
];

const values = [
  {
    icon: FaLightbulb,
    title: 'Wisdom Preservation',
    description: 'We believe every life experience holds valuable lessons worth preserving and sharing.',
  },
  {
    icon: FaUsers,
    title: 'Community Growth',
    description: 'Learning from others accelerates personal growth and builds meaningful connections.',
  },
  {
    icon: FaHeart,
    title: 'Emotional Intelligence',
    description: 'Understanding emotions helps us navigate life with greater clarity and compassion.',
  },
  {
    icon: FaRocket,
    title: 'Continuous Improvement',
    description: 'Every day is an opportunity to learn, grow, and become a better version of ourselves.',
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    bio: 'Former psychologist with 15 years of experience in personal development.',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    bio: 'Tech visionary passionate about building tools that improve lives.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Community',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    bio: 'Community builder dedicated to creating safe spaces for sharing.',
  },
];

const About = () => {
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
            About <span className="text-gradient">Digital Life Lessons</span>
          </h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            We're on a mission to help people capture, preserve, and share the wisdom 
            gained from life's experiences. Every lesson learned is a gift that can 
            transform someone else's journey.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="glass-effect rounded-3xl p-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-base-content/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-lg mb-6">Our Story</h2>
            <div className="space-y-4 text-base-content/80">
              <p>
                Digital Life Lessons was born from a simple observation: the most 
                valuable lessons in life often come from personal experiences, yet 
                they're rarely documented or shared in a meaningful way.
              </p>
              <p>
                Founded in 2023, we set out to create a platform where people could 
                capture their life lessons, reflect on their journey, and share their 
                wisdom with others who might benefit from it.
              </p>
              <p>
                Today, we're proud to serve a global community of learners, thinkers, 
                and sharers who believe in the power of collective wisdom.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
              alt="Team collaboration"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">2023</div>
              <div className="text-sm">Founded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16">
        <h2 className="heading-lg text-center mb-12">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-uniform p-6 text-center hover:border-primary/50"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <value.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{value.title}</h3>
              <p className="text-base-content/70 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="heading-lg text-center mb-12">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-uniform p-6 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
              />
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-primary text-sm mb-2">{member.role}</p>
              <p className="text-base-content/70 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass-effect rounded-3xl p-8 md:p-12 text-center">
        <h2 className="heading-lg mb-4">Ready to Start Your Journey?</h2>
        <p className="text-base-content/70 mb-8 max-w-2xl mx-auto">
          Join thousands of people who are already capturing and sharing their 
          life lessons. Your wisdom could change someone's life.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/signup" className="btn btn-primary btn-lg">
            Get Started Free
          </Link>
          <Link to="/lessons" className="btn btn-outline btn-lg">
            Explore Lessons
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;

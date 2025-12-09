
function LifeLessonsMattersSection() {
  const benefits = [
    {
      title: "Self-Awareness & Clarity",
      icon: "🧠",
      description: "Understand your strengths, weaknesses, and true motivations to live a more intentional life."
    },
    {
      title: "Better Decision Making",
      icon: "⚖️",
      description: "By reflecting on past outcomes, you develop intuition and make informed choices faster."
    },
    {
      title: "Emotional Resilience",
      icon: "💪",
      description: "Lessons learned from failures build mental toughness, helping you bounce back from setbacks."
    },
    {
      title: "Deeper Empathy & Connection",
      icon: "🤝",
      description: "Learning from diverse experiences increases your capacity to understand and relate to others."
    }
  ];

  return (
    
    <section className="bg-gradient-to-r bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-50 mt-10 rounded-2xl
                   shadow     transition-colors duration-300 py-16 px-4">
      
      <div className="container mx-auto max-w-6xl">
       
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 
                       text-secondary dark:text-primary transition-colors">
          Why Learning From Life Matters
        </h2>
        
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {benefits.map((benefit, index) => (
           
            <div 
              key={index}
              className="card shadow-xl bg-base-100 p-6 flex flex-col items-center 
                         text-center border-t-4 border-accent 
                         hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out"
            >
              
            
              <div className="text-6xl mb-4">{benefit.icon}</div>
              
              
              <h3 className="text-xl font-bold mb-3 text-primary dark:text-accent">
                {benefit.title}
              </h3>
              
              
              <p className="text-base-content/90 flex-grow">
                {benefit.description}
              </p>
              
              
              <button className="btn btn-sm btn-secondary  mt-4 text-base-100 hover:bg-opacity-90">
                Start Reflecting
              </button>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LifeLessonsMattersSection;
import Banner from '../../components/Home/Banner'
import CallToAction from '../../components/Home/CallToAction'
import Categories from '../../components/Home/Categories'
import HowItWorks from '../../components/Home/HowItWorks'
import LifeLessonsMattersSection from '../../components/Home/LifeLessonsMattersSection'
import MostSavedLessons from '../../components/Home/MostSaveLesson'
import Newsletter from '../../components/Home/Newsletter'
import Statistics from '../../components/Home/Statistics'
import Testimonials from '../../components/Home/Testimonials'
import TopContributors from '../../components/TopContributors/TopContributors'
import FeaturedLessons from '../Lessons/FeaturedLessons'

const Home = () => {
  return (
    <div className="space-y-8">
      {/* 1. Hero Banner */}
      <Banner />
      
      {/* 2. Statistics Counter */}
      <Statistics />
      
      {/* 3. Featured Lessons */}
      <FeaturedLessons />
      
      {/* 4. How It Works */}
      <HowItWorks />
      
      {/* 5. Categories */}
      <Categories />
      
      {/* 6. Why Life Lessons Matter */}
      <LifeLessonsMattersSection />
      
      {/* 7. Top Contributors */}
      <TopContributors />
      
      {/* 8. Most Saved Lessons */}
      <MostSavedLessons />
      
      {/* 9. Testimonials */}
      <Testimonials />
      
      {/* 10. Newsletter */}
      <Newsletter />
      
      {/* 11. Call to Action */}
      <CallToAction />
    </div>
  )
}

export default Home

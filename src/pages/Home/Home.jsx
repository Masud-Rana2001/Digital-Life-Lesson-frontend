import Banner from '../../components/Home/Banner'
import LifeLessonsMattersSection from '../../components/Home/LifeLessonsMattersSection'
import Plants from '../../components/Home/Plants'
import FeaturedLessons from '../Lessons/FeaturedLessons'

const Home = () => {
  return (
    <div>
      <Banner />
      <LifeLessonsMattersSection/>
      <FeaturedLessons/>
    </div>
  )
}

export default Home

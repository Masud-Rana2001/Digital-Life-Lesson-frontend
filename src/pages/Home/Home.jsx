import Banner from '../../components/Home/Banner'
import LifeLessonsMattersSection from '../../components/Home/LifeLessonsMattersSection'
import Plants from '../../components/Home/Plants'
import TopContributors from '../../components/TopContributors/TopContributors'
import FeaturedLessons from '../Lessons/FeaturedLessons'

const Home = () => {
  return (
    <div>
      <Banner />
      <LifeLessonsMattersSection/>
      <FeaturedLessons />
      <TopContributors/>
    </div>
  )
}

export default Home

import Banner from '../../components/Home/Banner'
import LifeLessonsMattersSection from '../../components/Home/LifeLessonsMattersSection'
import MostSavedLessons from '../../components/Home/MostSaveLesson'
import Plants from '../../components/Home/Plants'
import TopContributors from '../../components/TopContributors/TopContributors'
import FeaturedLessons from '../Lessons/FeaturedLessons'

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedLessons />
      <LifeLessonsMattersSection/>
      <TopContributors />
      <MostSavedLessons/>
    </div>
  )
}

export default Home

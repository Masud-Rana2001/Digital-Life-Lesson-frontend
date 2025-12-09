// layouts/MainLayout.jsx
import { Outlet } from 'react-router'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import Container from '../components/Shared/Container'

const MainLayout = () => {
  return (
   
    <div className="min-h-screen bg-gradient-radial from-white via-[#f5f0ff] to-[#dbe7ff] 
      bg-[radial-gradient(circle_at_70%_40%,#e6d7ff_0%,#f6f2ff_35%,#e4f0ff_70%,#ffffff_100%)] 
      bg-no-repeat bg-cover">

    
      <div className="fixed top-0 w-full z-50 pt-2 pb-2"> 
        <Container>
          <Navbar />
        </Container>
      </div>


      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Container>
          <Outlet />
        </Container>
      </div>

      {/* FOOTER */}
      <Container>
        <Footer />
      </Container>
    </div>
  )
}

export default MainLayout
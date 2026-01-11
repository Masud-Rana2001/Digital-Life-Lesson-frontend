import { Outlet } from 'react-router'
import Container from '../components/Shared/Container'
import Footer from '../components/Shared/Footer/Footer'
import Navbar from '../components/Shared/Navbar/Navbar'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-base-100 gradient-hero">
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full z-50 pt-2 pb-2 px-2">
        <Container>
          <Navbar />
        </Container>
      </div>

      {/* Main Content */}
      <main className="pt-24 min-h-[calc(100vh-68px)]">
        <Container>
          <Outlet />
        </Container>
      </main>

      {/* Footer */}
      <Container>
        <Footer />
      </Container>
    </div>
  )
}

export default MainLayout

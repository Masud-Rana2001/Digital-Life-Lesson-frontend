import { createBrowserRouter } from 'react-router'
import CreatorProfile from '../components/profile/CreatorProfile'
import Profile from '../components/profile/Profile'
import DashboardLayout from '../layouts/DashboardLayout'
import MainLayout from '../layouts/MainLayout'
import About from '../pages/About/About'
import Blog from '../pages/Blog/Blog'
import Contact from '../pages/Contact/Contact'
import ManageLessons from '../pages/Dashboard/Admin/ManageLessons'
import ManageReportedLessons from '../pages/Dashboard/Admin/ManageReportedLessons'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Statistics from '../pages/Dashboard/Common/Statistics'
import ErrorPage from '../pages/ErrorPage'
import FAQ from '../pages/FAQ/FAQ'
import Home from '../pages/Home/Home'
import AddLesson from '../pages/Lessons/AddLesson'
import FavoriteLessons from '../pages/Lessons/FavoriteLessons'
import LessonDetailsPage from '../pages/Lessons/LessonDetailsPage'
import MyLessons from '../pages/Lessons/MyLessons'
import PublicLessons from '../pages/Lessons/PublicLessons'
import Login from '../pages/Login/Login'
import PaymentCancelled from '../pages/Payment/PaymentCancel'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import Pricing from '../pages/Pricing'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'lessons',
        element: <PublicLessons />,
      },
      {
        path: 'lesson/:id',
        element: <LessonDetailsPage />,
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess />,
      },
      {
        path: '/pricing',
        element: <PrivateRoute><Pricing /></PrivateRoute>,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/blog/:id',
        element: <Blog />,
      },
      {
        path: '/faq',
        element: <FAQ />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-lesson',
        element: (
          <PrivateRoute>
            <AddLesson />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'creator-profile/:email',
        element: (
          <PrivateRoute>
            <CreatorProfile />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-lessons',
        element: (
          <PrivateRoute>
            <ManageLessons />
          </PrivateRoute>
        ),
      },
      { 
        path: 'my-lessons',
        element: (
          <PrivateRoute>
            <MyLessons />
          </PrivateRoute>
        ),
      },
      { 
        path: 'favorite-lessons',
        element: (
          <PrivateRoute>
            <FavoriteLessons />
          </PrivateRoute>
        ),
      },
      { 
        path: 'reported-lessons',
        element: (
          <PrivateRoute>
            <ManageReportedLessons />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-lessons/:id',
        element: (
          <PrivateRoute>
            <LessonDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-success',
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-cancelled',
        element: (
          <PrivateRoute>
            <PaymentCancelled />
          </PrivateRoute>
        ),
      },
    ],
  },
])

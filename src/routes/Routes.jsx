import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PlantDetails from '../pages/PlantDetails/PlantDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import AddPlant from '../pages/Dashboard/Seller/AddPlant'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'

import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'

import MyOrders from '../pages/Dashboard/Customer/MyOrders'
import { createBrowserRouter } from 'react-router'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import AddLesson from '../pages/Lessons/AddLesson'
import MyLessons from '../pages/Lessons/MyLessons'
import LessonDetailsPage from '../pages/Lessons/LessonDetailsPage'
import Pricing from '../pages/Pricing'
import PaymentCancelled from '../pages/Payment/PaymentCancel'
import PublicLessons from '../pages/Lessons/PublicLessons'
import Profile from '../components/profile/Profile'
import FavoriteLessons from '../pages/Lessons/FavoriteLessons'
import CreatorProfile from '../components/profile/CreatorProfile'
import ManageLessons from '../pages/Dashboard/Admin/ManageLessons'
import ManageReportedLessons from '../pages/Dashboard/Admin/ManageReportedLessons'


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
        path: '/payment-success',
        element: <PaymentSuccess />,
      },
      {
        path: '/pricing',
        element: <Pricing />,
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

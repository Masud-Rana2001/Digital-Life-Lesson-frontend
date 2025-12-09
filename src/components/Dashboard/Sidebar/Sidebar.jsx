import { useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import logo from '../../../assets/images/logo-flat.png'
// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'

// User Menu
import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import SellerMenu from './Menu/SellerMenu'
import CustomerMenu from './Menu/CustomerMenu'
import Logo from '../../Shared/Logo'
import Container from '../../Shared/Container'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <>
      <aside className="w-20 lg:w-64 bg-base-200 p-4 flex flex-col">

        {/* Logo */}
          <NavLink to="/">
        <div className="flex items-center gap-2 mb-6">

          <img className="sm:w-10 h-10" src={logo} alt="" />
           <h3 className="-ms-2.5 sm:text-3xl hidden sm:inline font-bold">ZapShift</h3>
        </div>
          </NavLink>

        {/* Menu */}
        <ul className="menu w-full">

          {/* Home */}
          <NavItem 
            to="/dashboard" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round"
                strokeWidth="2" fill="none" stroke="currentColor" className="size-6">
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
            } 
            label="Home" 
          />

          {/* My Parcels */}
          <NavItem 
            to="/dashboard/my-percels" 
            icon={<CiDeliveryTruck />} 
            label="My Parcels" 
          />

          {/* Add Parcel */}
          <NavItem 
            to="/add-parcel" 
            icon={<FiPackage />} 
            label="Add Parcel" 
          />

          {/* Payments History */}
          <NavItem 
            to="/dashboard/payments-history" 
            icon={<LuReceiptText />} 
            label="Payments History" 
          />

          {/* Rider menu */}
          {role === "rider" && (
            <>
              <NavItem 
                to="/dashboard/assigned-deliveries" 
                icon={<MdDeliveryDining />} 
                label="Assigned Deliveries" 
              />

              <NavItem 
                to="/dashboard/completed-deliveries" 
                icon={<FaTrophy />} 
                label="Completed Deliveries" 
              />
            </>
          )}

          {/* Admin menu */}
          {role === "admin" && (
            <>
              <NavItem 
                to="/dashboard/approve-riders" 
                icon={<FaMotorcycle />} 
                label="Approve Riders" 
              />

              <NavItem 
                to="/dashboard/manage-users" 
                icon={<MdManageAccounts />} 
                label="Manage Users" 
              />

              <NavItem 
                to="/dashboard/assign-riders" 
                icon={<LuBike />} 
                label="Assign Riders" 
              />
            </>
          )}

          {/* Settings */}
          <NavItem 
            to="/dashboard/settings" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round"
                strokeWidth="2" fill="none" stroke="currentColor"
                className="size-6">
                <path d="M20 7h-9"></path>
                <path d="M14 17H5"></path>
                <circle cx="17" cy="17" r="3"></circle>
                <circle cx="7" cy="7" r="3"></circle>
              </svg>
            } 
            label="Settings" 
          />

        </ul>
      </aside>
    </>
  )
}

export default Sidebar

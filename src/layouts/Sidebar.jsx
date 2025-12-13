import { FaBook, FaHome, FaUserTie } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import Logo from "../components/Shared/Logo";
import NavItem from "../components/Shared/NavItem";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import ProfileCard from "./ProfileCard";

export default function Sidebar({ role, dashboardNavItems, onClose }) {
  const { logOut } = useAuth();

  // Common navigation items
  const commonNav = [
    {
      to: "/dashboard",
      label: "Home",
      icon: <FaHome className="size-5" />,
    },
    
  ];

  return (
    <aside
      className={`
        flex flex-col p-5 
        border-r border-base-300 shadow-xl 
        bg-base-100/80 backdrop-blur-md
        ${onClose
          ? "fixed top-0 left-0 z-40 w-64 h-full"
          : "hidden lg:flex lg:fixed lg:top-0 lg:left-0 lg:h-screen w-64"}
      `}
    >
      {/* Logo Row */}
      {onClose ? (
        <div className="flex justify-between items-center mb-5">
          <Logo />
          <button className="btn btn-ghost" onClick={onClose}>
            ✖
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-5 pl-2">
          <Logo />
        </div>
      )}

      <hr className="border-base-300 mb-3" />

      <ul className="menu flex-1 space-y-1">
        {/* Common Nav */}
        {commonNav.map(({ to, label, icon }) => (
          <NavItem
            key={to}
            to={to}
            label={label}
            icon={icon}
            onClick={onClose}
          />
        ))}

        <hr className="border-base-400 my-4" />

        {/* Role-specific Nav */}
        {dashboardNavItems.map(({ to, label, icon: Icon }) => (
          <NavItem
            key={to}
            to={to}
            label={label}
            icon={<Icon className="size-5" />}
            onClick={onClose}
          />
        ))}

        <hr className="border-base-400 my-4" />
        <li>
          <ProfileCard logOut={ logOut} />
        </li>

       
      </ul>
    </aside>
  );
}

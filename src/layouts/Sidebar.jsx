

import Logo from "../components/Shared/Logo";
import NavItem from "../components/Shared/NavItem";

export default function Sidebar({ role, dashboardNavItems, onClose }) {
  return (
    <aside
      className={`
        flex flex-col p-5 
        border-r border-base-300 shadow-xl 
        bg-base-100/80 backdrop-blur-md
        ${onClose 
          ? "fixed top-0 left-0 z-40 w-64 h-full" 
          : "hidden lg:flex lg:fixed lg:top-0 lg:left-0 lg:h-screen w-64"
        }
      `}
    >
      {/* Logo row */}
      {onClose ? (
        <div className="flex justify-between items-center mb-5">
          <Logo />
          <button className="btn btn-ghost" onClick={onClose}>✖</button>
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-5 pl-2">
          <Logo />
        </div>
      )}

      <hr className="border-base-300 mb-3" />

      <ul className="menu flex-1 space-y-1">
        {/* Common Nav */}
        {[
          { to: "/dashboard", label: "Home", icon: "FaHome" },
          {
            to: "/dashboard/profile",
            label: role === "user" ? "My Profile" : "Admin Profile",
            icon: "FaUserTie",
          },
          { to: "/dashboard/settings", label: "Settings", icon: "MdSettings" },
        ].map(({ to, label }) => (
          <NavItem
            key={to}
            to={to}
            label={label}
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
      </ul>
    </aside>
  );
}

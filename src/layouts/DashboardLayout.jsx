import { useState } from "react";
import { FaBook, FaHome, FaPlus, FaUser, FaUserTie } from "react-icons/fa";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { MdDashboard, MdFavorite } from "react-icons/md";
import { RiAlarmWarningFill } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router";

import LoadingSpinner from "../components/Shared/LoadingSpinner";
import Logo from "../components/Shared/Logo";
import ThemeToggle from "../components/Shared/ThemeToggle";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

// User Navigation Items
const userNavItems = [
  { to: "/dashboard", label: "Overview", icon: MdDashboard, end: true },
  { to: "/dashboard/my-lessons", label: "My Lessons", icon: FaBook },
  { to: "/dashboard/add-lesson", label: "Add Lesson", icon: FaPlus },
  { to: "/dashboard/favorite-lessons", label: "Saved Lessons", icon: MdFavorite },
  { to: "/dashboard/profile", label: "Profile", icon: FaUser },
];

// Admin Navigation Items
const adminNavItems = [
  { to: "/dashboard", label: "Overview", icon: MdDashboard, end: true },
  { to: "/dashboard/manage-users", label: "Manage Users", icon: FaUserTie },
  { to: "/dashboard/manage-lessons", label: "Manage Lessons", icon: FaBook },
  { to: "/dashboard/reported-lessons", label: "Reported Lessons", icon: RiAlarmWarningFill },
  { to: "/dashboard/profile", label: "Profile", icon: FaUser },
];

const NavItem = ({ item, onClick }) => (
  <NavLink
    to={item.to}
    end={item.end}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive
          ? "bg-primary text-white shadow-lg shadow-primary/30"
          : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
      }`
    }
  >
    <item.icon className="w-5 h-5" />
    <span className="font-medium">{item.label}</span>
  </NavLink>
);

export default function DashboardLayout() {
  const { role, isRoleLoading } = useRole();
  const { user, logOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isRoleLoading) return <LoadingSpinner />;

  const navItems = role === "admin" ? adminNavItems : userNavItems;

  const handleLogout = () => {
    logOut();
  };

  return (
    <div className="min-h-screen bg-base-100 gradient-hero">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 glass-effect transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between mb-8">
            <Logo />
            <button
              onClick={() => setSidebarOpen(false)}
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="card-uniform p-4 mb-6">
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL || "https://i.ibb.co/L5hY5Fz/default-user.png"}
                alt={user?.displayName}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{user?.displayName || "User"}</p>
                <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
                <span className={`badge badge-sm mt-1 ${role === "admin" ? "badge-error" : "badge-primary"}`}>
                  {role === "admin" ? "Admin" : "User"}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                item={item}
                onClick={() => setSidebarOpen(false)}
              />
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-2 pt-4 border-t border-base-300">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base-content/70 hover:bg-base-200 transition-colors"
            >
              <FaHome className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/10 transition-colors w-full"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 glass-effect border-b border-base-300">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="btn btn-ghost btn-circle lg:hidden"
              >
                <FiMenu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold hidden sm:block">
                {role === "admin" ? "Admin Dashboard" : "My Dashboard"}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link to="/dashboard/profile" className="btn btn-ghost btn-circle">
                <img
                  src={user?.photoURL || "https://i.ibb.co/L5hY5Fz/default-user.png"}
                  alt={user?.displayName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

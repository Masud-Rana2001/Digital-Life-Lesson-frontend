import { useState } from "react";
import { Outlet } from "react-router";
import { RiAlarmWarningFill } from "react-icons/ri";
import {
  MdSettings,
  MdFavorite,
} from "react-icons/md";
import { FaBook, FaHome, FaUserTie } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";

import Container from "../components/Shared/Container";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import Sidebar from "./Sidebar";



// User Nav
const userNavItems = [
  { to: "/dashboard/my-lessons", label: "My Lessons", icon: FaBook },
  { to: "/dashboard/add-lesson", label: "Add Lesson", icon: CiBookmarkPlus },
  { to: "/dashboard/favorite-lessons", label: "Favorite Lessons", icon: MdFavorite },
];

// Admin Nav
const adminNavItems = [
  { to: "/dashboard/manage-users", label: "Manage Users", icon: FaUserTie },
  { to: "/dashboard/manage-lessons", label: "Manage Lessons", icon: FaBook },
  { to: "/dashboard/reported-lessons", label: "Reported Lessons", icon: RiAlarmWarningFill },
];

export default function DashboardLayout() {
  const { role, isRoleLoading } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  if (isRoleLoading) return <LoadingSpinner />;

  // role based nav
  let dashboardNavItems = role === "admin" ? adminNavItems : userNavItems;

  return (
    
    <div className="min-h-screen bg-gradient-radial from-white via-[#f5f0ff] to-[#dbe7ff] 
      bg-[radial-gradient(circle_at_70%_40%,#e6d7ff_0%,#f6f2ff_35%,#e4f0ff_70%,#ffffff_100%)] 
      bg-no-repeat bg-cover ">
      <Container>
        <div className="flex min-h-screen">

          {/* Desktop Sidebar */}
          <Sidebar role={role} dashboardNavItems={dashboardNavItems} />

          {/* Main Content */}
          <main className="flex-1 flex flex-col ml-0 lg:ml-64">

            <nav className="navbar sticky top-0 z-10 px-6 py-4 bg-base-100/95
              backdrop-blur-md border-b border-base-200 shadow-sm">
              
              {/* Mobile Menu */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(true)}
                  className="btn btn-ghost btn-circle text-2xl"
                >
                  ☰
                </button>
                <h1 className="text-xl font-semibold ml-3">Dashboard</h1>
              </div>

              <h1 className="text-2xl lg:text-3xl font-semibold text-primary hidden lg:block">
                {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
              </h1>
            </nav>

            {/* Routed content */}
            <div className="p-6 flex-1">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-30 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <Sidebar
              role={role}
              dashboardNavItems={dashboardNavItems}
              onClose={() => setIsOpen(false)}
            />
          </>
        )}
      </Container>
    </div>
  );
}

import { useState } from "react";
import { Outlet } from "react-router";
import { RiAlarmWarningFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { FaBook, FaUserTie } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";

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

  const dashboardNavItems = role === "admin" ? adminNavItems : userNavItems;

  return (
    <div className="min-h-screen bg-gradient-radial from-white via-[#f5f0ff] to-[#dbe7ff]">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <Sidebar role={role} dashboardNavItems={dashboardNavItems} />

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 lg:ml-64">
          {/* min-w-0 → table overflow fix */}

          <nav className="sticky top-0 z-10 px-4 py-4 bg-base-100/95 backdrop-blur-md border-b">
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsOpen(true)} className="btn btn-ghost text-2xl">
                ☰
              </button>
              <h1 className="text-lg font-semibold ml-3">Dashboard</h1>
            </div>

            <h1 className="text-2xl font-semibold hidden lg:block">
              {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
            </h1>
          </nav>

          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <Sidebar
            role={role}
            dashboardNavItems={dashboardNavItems}
            onClose={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
}

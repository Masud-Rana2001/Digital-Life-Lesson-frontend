import { useState } from "react";
import { NavLink, Outlet } from "react-router";

import {
  MdSettings,
} from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

import Logo from "../components/Shared/Logo";
import Container from "../components/Shared/Container";
import NavItem from "../components/Shared/NavItem";


export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-gradient-radial from-white via-[#f5f0ff] to-[#dbe7ff] 
        bg-[radial-gradient(circle_at_70%_40%,#e6d7ff_0%,#f6f2ff_35%,#e4f0ff_70%,#ffffff_100%)] 
        bg-no-repeat bg-cover">

    <Container>
      
      <div className="min-h-screen flex ">
  
        {/* SIDEBAR for Large Devices */}
        <aside
          className="
            hidden lg:flex flex-col w-64 p-5 
             backdrop-blur-xl
            border-r border-base-300 shadow-sm
            rounded-r-2xl  bg-gradient-radial from-white via-[#f5f0ff] to-[#dbe7ff] 
        bg-[radial-gradient(circle_at_70%_40%,#e6d7ff_0%,#f6f2ff_35%,#e4f0ff_70%,#ffffff_100%)] 
        bg-no-repeat bg-cover
          "
        >
          <div className="flex items-center gap-2 mb-5 pl-2">
            <Logo />
          </div>
  
          <hr className="border-base-300 mb-3" />
  
          <ul className="menu flex-1 space-y-1">
  
            <NavItem
              to="/dashboard"
              label="Home"
              icon={
               <FaHome className="size-5"/>
              }
            />
  
            <NavItem
              to="/dashboard/my-lessons"
              label="My Lessons"
              icon={<FaBook className="size-5" />}
            />
  
            <NavItem
              to="/dashboard/add-lesson"
              label="Add Lesson"
              icon={<CiBookmarkPlus className="size-5" />}
            />
            <NavItem
              to="/dashboard/favorite-lessons"
              label="Favorite Lessons"
              icon={<MdFavorite  className="size-5" />}
            />
  
            <hr className="border-base-300 my-4" />
  
            <NavItem
              to="/dashboard/settings"
              label="Settings"
              icon={<MdSettings className="size-5" />}
            />
          </ul>
        </aside>
  
        {/* MOBILE SIDEBAR */}
        <div className="lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="btn btn-xl btn-ghost "
          >
            ☰
          </button>
  
          {open && (
            <div className="fixed inset-0 bg-black/40 z-30" onClick={() => setOpen(false)} />
          )}
  
          <aside
            className={`
              fixed top-0 left-0 h-full w-64 p-5 z-40
              bg-base-100 border-r border-base-300 
              shadow-xl transition-transform duration-300
              ${open ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <div className="flex justify-between items-center mb-5">
              <Logo />
              <button className="btn  btn-ghost" onClick={() => setOpen(false)}>✖</button>
            </div>
  
            <ul className="menu space-y-2">
              
              <NavItem to="/dashboard" label="Home" icon="🏠" />
              <NavItem to="/dashboard/my-lessons" label="My Lessons" icon="📚" />
              <NavItem to="/dashboard/add-lesson" label="Add Lesson" icon="➕" />
              <NavItem to="/dashboard/favorite-lessons" label="Favorite Lessons" icon="💖" />
              <hr className="border-base-300" />
              <NavItem to="/dashboard/settings" label="Settings" icon="⚙️" />
  
            </ul>
          </aside>
        </div>
  
        {/* MAIN CONTENT */}
        <main className="flex-1">
  
          {/* TOP NAVBAR */}
          <nav className="
            navbar px-6 py-4 bg-base-100/90 backdrop-blur 
            border-b  bg-gradient-radial from-white via-[#f5f0ff] to-[#dbe7ff] 
        bg-[radial-gradient(circle_at_70%_40%,#e6d7ff_0%,#f6f2ff_35%,#e4f0ff_70%,#ffffff_100%)] 
        bg-no-repeat bg-cover shadow-sm flex justify-center lg:justify-start
          ">
            <h1 className="text-2xl lg:text-3xl font-semibold text-primary">
              Dashboard
            </h1>
          </nav>
  
          {/* PAGE CONTENT */}
          <div className="p-6  bg-gradient-radial from-white via-[#f5f0ff] to-[#dbe7ff] 
        bg-[radial-gradient(circle_at_70%_40%,#e6d7ff_0%,#f6f2ff_35%,#e4f0ff_70%,#ffffff_100%)] 
        bg-no-repeat bg-cover">
            <Outlet />
          </div>
        </main>
      </div>
    </Container>
    </div>
    );
}

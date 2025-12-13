import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import Logo from "../Logo";
import usePremium from "../../../hooks/usePremium";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const {isPremium} = usePremium()
  const handleLogout = () => {
    logOut();
    setOpenDropdown(false);
  };

  // ------------------------
  // NAV LINKS
  // ------------------------
  const menuLinks = (
    <>
      <NavLink
        to="/"
        className="px-4  py-2 font-semibold hover:text-primary"
      >
        Home
      </NavLink>

      {/* PRIVATE ROUTES */}
      {user && (
        <>
          <NavLink
            to="/dashboard/add-lesson"
            className="px-4 py-2 font-semibold hover:text-primary"
          >
            Add Lesson
          </NavLink>

          <NavLink
            to="/dashboard/my-lessons"
            className="px-4 py-2 font-semibold hover:text-primary"
          >
            My Lessons
          </NavLink>
          
          {
            !isPremium &&
            <NavLink
            to="/pricing"
            className="px-4 py-2 font-semibold hover:text-primary"
            >
            ⭐ Upgrade
          </NavLink>
          }
        </>
      )}

      {/* PUBLIC ROUTE */}
      <NavLink
        to="/lessons"
        className="px-4 py-2 font-semibold hover:text-primary"
      >
        Public Lessons
      </NavLink>
    </>
  );

  return (
    <div className="
  navbar 
    rounded-2xl
  bg-gradient-to-br from-sky-50/40 via-cyan-50/40 to-sky-50/40
  backdrop-blur-md
  border-b border-white/30
  shadow-md
  px-4
">

      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Menu Button */}
        <div className="dropdown lg:hidden">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="btn btn-ghost"
          >
            <AiOutlineMenu size={22} />
          </button>

          {openDropdown && (
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-md mt-3 w-60 p-2">
              {menuLinks}
            </ul>
          )}
        </div>

        {/* Logo */}
        <Logo />
      </div>

      {/* CENTER LINKS (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuLinks}</ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end">
        {/* If NOT logged in */}
        {!user && (
          <>
            <NavLink to="/login" className="btn btn-primary mx-2">
              Login
            </NavLink>
            <NavLink to="/signup" className="btn btn-secondary">
              Signup
            </NavLink>
          </>
        )}

        {/* If LOGGED IN */}
        {user && (
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost p-0"
            >
              <img
                src={user.photoURL || avatarImg}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full border shadow"
              />
            </button>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box shadow-md mt-3 w-52 p-2 space-y-1"
            >
              <li className="px-3 py-2 font-bold text-sm text-primary">
                {user.displayName || "User"}
              </li>

              <li>
                <NavLink to="/dashboard/profile" className="font-semibold">
                  Profile
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard" className="font-semibold">
                  Dashboard
                </NavLink>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="font-semibold text-error"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

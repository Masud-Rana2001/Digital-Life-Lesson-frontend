import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { NavLink } from "react-router";
import avatarImg from "../../../assets/images/placeholder.jpg";
import useAuth from "../../../hooks/useAuth";
import usePremium from "../../../hooks/usePremium";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);
  const { isPremium } = usePremium();
  const dropdownRef = useRef(null);
  const resourcesRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
        setResourcesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut();
    setProfileDropdown(false);
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 font-medium rounded-lg transition-colors ${
      isActive
        ? "text-primary bg-primary/10"
        : "text-base-content hover:text-primary hover:bg-base-200"
    }`;

  // Public routes (logged out)
  const publicLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/lessons" className={navLinkClass}>
        Explore Lessons
      </NavLink>
      <NavLink to="/about" className={navLinkClass}>
        About
      </NavLink>
    </>
  );

  // Private routes (logged in)
  const privateLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/lessons" className={navLinkClass}>
        Explore
      </NavLink>
      <NavLink to="/dashboard/add-lesson" className={navLinkClass}>
        Add Lesson
      </NavLink>
      <NavLink to="/dashboard/my-lessons" className={navLinkClass}>
        My Lessons
      </NavLink>

      {/* Resources Dropdown */}
      <div className="relative" ref={resourcesRef}>
        <button
          onClick={() => setResourcesDropdown(!resourcesDropdown)}
          className="flex items-center gap-1 px-4 py-2 font-medium rounded-lg text-base-content hover:text-primary hover:bg-base-200 transition-colors"
        >
          Resources
          <FiChevronDown
            className={`w-4 h-4 transition-transform ${
              resourcesDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {resourcesDropdown && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-base-100 rounded-xl shadow-lg border border-base-300 py-2 z-50">
            <NavLink
              to="/about"
              className="block px-4 py-2 hover:bg-base-200 transition-colors"
              onClick={() => setResourcesDropdown(false)}
            >
              About Us
            </NavLink>
            <NavLink
              to="/blog"
              className="block px-4 py-2 hover:bg-base-200 transition-colors"
              onClick={() => setResourcesDropdown(false)}
            >
              Blog
            </NavLink>
            <NavLink
              to="/contact"
              className="block px-4 py-2 hover:bg-base-200 transition-colors"
              onClick={() => setResourcesDropdown(false)}
            >
              Contact
            </NavLink>
            <NavLink
              to="/faq"
              className="block px-4 py-2 hover:bg-base-200 transition-colors"
              onClick={() => setResourcesDropdown(false)}
            >
              FAQ
            </NavLink>
          </div>
        )}
      </div>

      {!isPremium && (
        <NavLink to="/pricing" className={navLinkClass}>
          <span className="flex items-center gap-1">
            ⭐ Upgrade
          </span>
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="w-full glass-effect rounded-2xl shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {user ? privateLinks : publicLinks}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Buttons / Profile */}
            {!user ? (
              <div className="hidden sm:flex items-center gap-2">
                <NavLink to="/login" className="btn btn-ghost btn-sm">
                  Login
                </NavLink>
                <NavLink to="/signup" className="btn btn-primary btn-sm">
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-primary/30 transition-all"
                >
                  <img
                    src={user.photoURL || avatarImg}
                    referrerPolicy="no-referrer"
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                  />
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-base-100 rounded-xl shadow-lg border border-base-300 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-base-300">
                      <p className="font-semibold text-base-content truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-base-content/60 truncate">
                        {user.email}
                      </p>
                      {isPremium && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full">
                          ⭐ Premium
                        </span>
                      )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-base-200 transition-colors"
                        onClick={() => setProfileDropdown(false)}
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/dashboard/profile"
                        className="block px-4 py-2 hover:bg-base-200 transition-colors"
                        onClick={() => setProfileDropdown(false)}
                      >
                        Profile Settings
                      </NavLink>
                      <NavLink
                        to="/dashboard/favorite-lessons"
                        className="block px-4 py-2 hover:bg-base-200 transition-colors"
                        onClick={() => setProfileDropdown(false)}
                      >
                        Saved Lessons
                      </NavLink>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-base-300 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-error hover:bg-error/10 transition-colors"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden btn btn-ghost btn-circle"
            >
              {mobileMenuOpen ? (
                <AiOutlineClose size={22} />
              ) : (
                <AiOutlineMenu size={22} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-base-300">
            <div className="flex flex-col gap-1">
              {user ? (
                <>
                  <NavLink
                    to="/"
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/lessons"
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Explore Lessons
                  </NavLink>
                  <NavLink
                    to="/dashboard/add-lesson"
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Add Lesson
                  </NavLink>
                  <NavLink
                    to="/dashboard/my-lessons"
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Lessons
                  </NavLink>
                  <NavLink
                    to="/about"
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/blog"
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </NavLink>
                  {!isPremium && (
                    <NavLink
                      to="/pricing"
                      className={navLinkClass}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ⭐ Upgrade
                    </NavLink>
                  )}
                </>
              ) : (
                <>
                  <NavLink
                    to="/"
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/lessons"
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Explore Lessons
                  </NavLink>
                  <NavLink
                    to="/about"
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/blog"
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </NavLink>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-base-300">
                    <NavLink
                      to="/login"
                      className="btn btn-ghost flex-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="btn btn-primary flex-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { NavLink, useLocation } from "react-router";

export default function NavItem({ to, icon, label }) {
  const location = useLocation();

  return (
    <li className="mt-1">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `
          group flex items-center gap-3 relative 
          px-3 py-2 rounded-xl cursor-pointer 
          transition-all duration-300

          ${isActive 
            ? "bg-primary/10 text-primary font-semibold shadow-sm" 
            : "hover:bg-base-300 text-base-content/80"
          }
        `
        }
      >
        {/* LEFT ACTIVE BAR */}
        <span
          className={`
            absolute left-0 top-0 h-full w-1 rounded-r-lg transition-all
            ${location.pathname === to ? "bg-primary" : "group-hover:bg-primary/40"}
          `}
        ></span>

        {/* ICON */}
        <span
          className={`
            text-xl transition-all duration-300
            ${location.pathname === to ? "text-primary" : "group-hover:text-primary"}
          `}
        >
          {icon}
        </span>

        {/* LABEL - only visible on large screens */}
        <span className="hidden lg:inline text-sm">{label}</span>

        {/* Tooltip for mobile collapsed view */}
        <span
          className="
            lg:hidden absolute left-full top-1/2 -translate-y-1/2 ml-3
            px-2 py-1 rounded-md bg-base-200 shadow text-xs font-medium
            opacity-0 invisible group-hover:opacity-100 group-hover:visible
            transition-all duration-300 whitespace-nowrap 
            border border-base-300
          "
        >
          {label}
        </span>
      </NavLink>
    </li>
  );
}

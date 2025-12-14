import { FaHome } from "react-icons/fa";
import Logo from "../components/Shared/Logo";
import NavItem from "../components/Shared/NavItem";
import useAuth from "../hooks/useAuth";
import ProfileCard from "./ProfileCard";

export default function Sidebar({ role, dashboardNavItems, onClose }) {
  const { logOut } = useAuth();

  const commonNav = [
    { to: "/dashboard", label: "Home", icon: <FaHome className="size-5" /> },
  ];

  return (
    <aside
      className={`
        flex flex-col bg-base-100/90 backdrop-blur-md border-r shadow-xl
        w-64
        ${onClose
          ? "fixed top-0 left-0 z-40 h-full"
          : "hidden lg:flex lg:fixed lg:top-0 lg:left-0 lg:h-screen"}
      `}
    >
      <div className="flex justify-between items-center p-3">
        <Logo />
        {onClose && (
          <button onClick={onClose} className="btn btn-ghost">✖</button>
        )}
      </div>

      <hr />

      <ul className="menu flex-1 space-y-1 px-2">
        {commonNav.map(item => (
          <NavItem key={item.to} {...item} onClick={onClose} />
        ))}

        <hr className="my-3" />

        {dashboardNavItems.map(({ to, label, icon: Icon }) => (
          <NavItem
            key={to}
            to={to}
            label={label}
            icon={<Icon className="size-5" />}
            onClick={onClose}
          />
        ))}

        <hr className="my-3" />
        <ProfileCard logOut={logOut} />
      </ul>
    </aside>
  );
}

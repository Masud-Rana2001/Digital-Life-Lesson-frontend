import { Link } from 'react-router';
import logo from "../../assets/images/logodll.png";

function Logo({ size = "default" }) {
  const sizeClasses = {
    small: "w-28",
    default: "w-36",
    large: "w-44",
  };

  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        className={`${sizeClasses[size]} h-auto`} 
        src={logo} 
        alt="Digital Life Lessons" 
      />
    </Link>
  );
}

export default Logo;

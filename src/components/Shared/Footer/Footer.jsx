import { Link } from "react-router";
import Logo from "../Logo";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-50 backdrop-blur-xl shadow rounded-2xl  mt-10 ">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* LOGO + NAME */}
          <div>
            <div className="flex items-center gap-3">
              <Logo />
              
            </div>
            <p className="mt-3 text-base-content/70 leading-relaxed">
              Digital Life Lessons is a platform where you can capture, organize, and share the wisdom of your life journey. Preserve your personal insights, reflect on meaningful experiences, and explore lessons shared by others. Grow, learn, and inspire—one lesson at a time.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-base-content/70">Email: support@digitallessons.com</p>
            <p className="text-base-content/70">Phone: +880 1234 567 890</p>
            <p className="text-base-content/70">Address: Dhaka, Bangladesh</p>
          </div>

          {/* TERMS + SOCIAL */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Important Links</h3>

            <ul className="space-y-2">
              <li>
                <Link className="hover:text-primary">Terms & Conditions</Link>
              </li>
              <li>
                <Link className="hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link className="hover:text-primary">Support</Link>
              </li>
            </ul>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 mt-4">
              <a className="social-icon">
                <FaFacebookF size={20} />
              </a>
              <a className="social-icon">
                <FaTwitter size={20} />
              </a>
              <a className="social-icon">
                <FaLinkedinIn size={20} />
              </a>
              <a className="social-icon">
                <FaYoutube size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t mt-10 pt-6 text-center text-base-content/60">
          © {new Date().getFullYear()} Digital Life Lessons — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

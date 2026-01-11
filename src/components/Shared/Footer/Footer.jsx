import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Link } from "react-router";
import Logo from "../Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Lessons', path: '/lessons' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const supportLinks = [
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="glass-effect rounded-t-3xl mt-16">
      <div className="container-custom py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-base-content/70 text-sm leading-relaxed">
              Digital Life Lessons is a platform where you can capture, organize, 
              and share the wisdom of your life journey. Preserve your personal 
              insights and inspire others.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-icon"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-base-content/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-base-content/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-base-content/70">Email</p>
                  <a 
                    href="mailto:support@digitallessons.com"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    support@digitallessons.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-base-content/70">Phone</p>
                  <a 
                    href="tel:+8801234567890"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    +880 1234 567 890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-base-content/70">Address</p>
                  <p className="text-sm">Gulshan-2, Dhaka, Bangladesh</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-base-300 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-base-content/60">
              © {currentYear} Digital Life Lessons. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-base-content/60">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link, Outlet, useLocation } from "react-router";
import { Menu, X, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { useState } from "react";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Events", path: "/events" },
    { name: "Instructors", path: "/instructors" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Talent", path: "/talent" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/windupdancetour", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/windupdancetour", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/windupdancetour/", label: "Instagram" },
    { icon: Mail, href: "mailto:windupdancetour@gmail.com", label: "Email" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/assets/images/windupdollonlylogo.png" 
                alt="Wind Up Dance Tours Logo"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <span className="font-bold text-xl text-gray-900">
                WindUp 2.0
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive(item.path)
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive(item.path)
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                {/* replace this logo with  /src/assets/images/logo.png*/}
                <img 
                
                  src="https://placehold.co/40x40/9333ea/ffffff?text=LOGO" 
                  alt="Wind Up Dance Tours Logo"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span className="font-bold text-lg">Wind Up Dance Tours</span>
              </div>
              <p className="text-gray-400 text-sm">
                Premier dance events bringing together students and world-renowned
                choreographers for unforgettable learning experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/events" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/instructors" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Instructors
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-2 rounded-lg hover:bg-purple-600 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                Email: info@windupdancetours.com
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Wind Up Dance Tours. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
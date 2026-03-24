import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Socials", path: "/social-portfolio" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/shailesh_logo.png"
              alt="Shailesh Kumar"
              className="
      h-10 md:h-16 w-auto
      object-contain
      transition-all duration-300
      group-hover:scale-105
    "
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${isActive(link.path)
                  ? "text-primary"
                  : scrolled
                    ? "text-gray-800 hover:text-primary"
                    : "text-white/80 hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <Link to="/contact">
              <button className="ml-4 px-5 h-10 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-all">
                Hire Me
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-border"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center gap-8 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-semibold ${isActive(link.path)
                ? "text-primary"
                : "text-text-secondary hover:text-primary"
                }`}
            >
              {link.name}
            </Link>
          ))}

          <Link to="/contact" onClick={() => setIsOpen(false)}>
            <button className="mt-6 px-6 py-3 rounded-xl bg-primary text-white font-medium">
              Hire Me
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

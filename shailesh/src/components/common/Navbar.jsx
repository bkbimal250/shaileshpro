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
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-bg-canvas/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src="/shailesh_logo.png"
              alt="Logo"
              className="h-12 w-25 object-contain"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-6">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-medium transition ${isActive(link.path)
                  ? "text-primary"
                  : "text-white/70 hover:text-white"
                  }`}
              >
                {link.name}

                {/* ACTIVE UNDERLINE */}
                {isActive(link.path) && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            ))}

            {/* CTA */}
            <Link to="/contact">
              <button className="ml-4 px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition">
                Hire Me
              </button>
            </Link>

          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center border border-white/10 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 bg-bg-canvas flex flex-col items-center justify-center gap-8 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={`text-2xl font-semibold ${isActive(link.path)
              ? "text-primary"
              : "text-white/70 hover:text-white"
              }`}
          >
            {link.name}
          </Link>
        ))}

        <Link to="/contact" onClick={() => setIsOpen(false)}>
          <button className="mt-6 px-6 py-3 rounded-lg bg-primary text-white font-medium">
            Hire Me
          </button>
        </Link>
      </div>
    </>
  );
}
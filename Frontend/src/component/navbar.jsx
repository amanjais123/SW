import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Event", href: "#event" },
  { label: "Team", href: "#team" },
  { label: "Verify Certificate", href: "#verify" },
  { label: "Contact Us", href: "#contact" }
];

export default function GlassNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollHandler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-30 h-20 transition-all duration-300 border-b
        ${
          scrolled
            ? "bg-gradient-to-r from-white/80 via-orange-100/70 to-orange-400/40 shadow-2xl border-white/25"
            : "bg-gradient-to-r from-white/30 via-slate-800/30 to-orange-500/20 border-white/10"
        }
        backdrop-blur-xl
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg md:text-xl text-orange-500 cursor-pointer">
          <span className="text-2xl drop-shadow">🚁</span>
          <span className="hidden sm:block">DroneX</span>
        </div>

        <div className="hidden md:flex gap-6 items-center text-base font-semibold text-white drop-shadow">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`
                px-2 py-1 rounded transition
                hover:bg-orange-400/20 hover:text-orange-300
                ${
                  typeof window !== "undefined" && window.location.hash === link.href
                    ? "text-orange-400"
                    : ""
                }
              `}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen((p) => !p)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden text-white"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-gradient-to-br from-slate-900/90 to-orange-400/40 backdrop-blur-2xl border-t border-white/10 px-6 py-4 space-y-4 animate-fadeIn"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-white font-semibold rounded hover:bg-orange-400/20 hover:text-orange-300 transition py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}


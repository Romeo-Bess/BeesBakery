import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Bianca' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/custom', label: 'Custom Orders' },
  { path: '/testimonials', label: 'Testimonials' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-primary/15 shadow-[0_10px_30px_-15px_rgba(244,180,0,0.12)] transition-all duration-300">
        <div className="flex justify-between items-center px-4 lg:px-margin-desktop py-4 max-w-container-max mx-auto h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-primary hover:opacity-90 transition-opacity">
            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 48 48">
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" />
            </svg>
            <h1 className="font-serif text-2xl font-bold tracking-widest text-on-surface uppercase">
              Bee's Bakery
            </h1>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 py-1 border-b-2 hover:text-primary ${
                    isActive
                      ? 'text-primary border-primary'
                      : 'text-on-surface-variant border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Header Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/custom"
              className="bg-on-surface text-background border border-on-surface px-5 py-2.5 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-on-surface transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(244,180,0,0.15)]"
            >
              Inquire Now
            </Link>
          </div>

          {/* Mobile Hamburg */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-primary p-2 h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-container"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-primary/10 bg-surface overflow-hidden shadow-inner"
            >
              <div className="flex flex-col px-6 py-6 gap-4">
                {NAV_LINKS.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`font-sans text-sm font-bold uppercase tracking-widest py-2 border-l-4 pl-3 block transition-colors ${
                        isActive
                          ? 'text-primary border-primary bg-surface-container-low'
                          : 'text-on-surface-variant border-transparent hover:text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  to="/custom"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-center bg-on-surface text-background px-6 py-3 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors block"
                >
                  Inquire Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

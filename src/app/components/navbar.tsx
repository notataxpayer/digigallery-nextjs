'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(100);
  const [isHovered, setIsHovered] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Smooth opacity changes based on scroll direction
      if (currentScrollY < lastScrollY.current) {
        // Scrolling up - increase opacity
        setOpacity(Math.min(100, 70 + (currentScrollY / 2)));
      } else {
        // Scrolling down - decrease opacity
        setOpacity(Math.max(30, 100 - (currentScrollY / 2)));
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Gallery', 'Artists', 'Events', 'Contact'];

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 h-[70px] md:h-[80px] bg-cover bg-center transition-all"
      style={{
        opacity: `${isHovered ? 100 : opacity}%`,
        backdropFilter: isHovered ? 'blur(10px)' : 'blur(5px)',
        backgroundColor: `rgba(15, 23, 42, ${isHovered ? 0.9 : 0.7})`,
        backgroundImage: "url('https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg')",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 pointer-events-none" />

      <div className="relative container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo with animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="flex items-center gap-2">
            {/* <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">D</span>
            </div> */}
            <span className="text-white font-extrabold text-xl md:text-2xl tracking-wide bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-200">
              DIGIVISION
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/${item.toLowerCase()}`}
                className="relative px-4 py-2 text-white/90 hover:text-white transition-colors font-medium group"
              >
                {item}
                <motion.span
                  className="absolute bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 w-0 group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                />
              </Link>
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-purple-500/20 transition-all"
          >
            Join Now
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 p-2 rounded-lg bg-white/10 backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {isOpen ? (
              <span className="text-white text-2xl">✕</span>
            ) : (
              <>
                <span className="block w-6 h-0.5 bg-white mb-1.5"></span>
                <span className="block w-6 h-0.5 bg-white mb-1.5"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
              </>
            )}
          </div>
        </motion.button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-gray-900 to-indigo-900/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-white text-3xl font-medium hover:text-purple-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium text-xl shadow-lg"
              >
                Join Community
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
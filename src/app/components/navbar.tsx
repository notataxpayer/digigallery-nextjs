'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-cover bg-center h-[50px] md:h-[70px] transition-all duration-500
        ${isScrolled ? 'opacity-50' : 'opacity-100'}
      `}
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar content */}
      <div className="relative lg:max-w-screen mx-auto lg:px-20 px-4 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/">
          <span className="text-white font-extrabold text-2xl md:text-3xl tracking-wide drop-shadow-md">
            DIGIARTS
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {['Gallery', 'Artists', 'Events', 'Contact'].map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-white hover:text-purple-300 text-lg flex px-2 font-bold transition duration-300"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none text-3xl"
          >
            {isOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`fixed top-0 left-0 w-full h-full bg-black/90 flex flex-col items-center justify-center gap-8 z-40 transition-all duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {['Gallery', 'Artists', 'Events', 'Contact'].map((item) => (
          <Link 
            key={item}
            href={`/${item.toLowerCase()}`}
            className="text-white text-2xl font-semibold hover:text-purple-400 transition"
            onClick={() => setIsOpen(false)}
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

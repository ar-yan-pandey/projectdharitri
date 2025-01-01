'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { translations } = useLanguage();

  useEffect(() => {
    // If not on home page, always show solid navbar
    if (pathname !== '/') {
      setIsScrolled(true);
      return;
    }

    // Only add scroll listener on home page
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: translations?.common?.nav?.home || 'Home' },
    { href: '/about', label: translations?.common?.nav?.about || 'About' },
    { href: '/products', label: translations?.common?.nav?.products || 'Products' },
    { href: '/vets', label: translations?.common?.nav?.vets || 'Vets' },
    { href: '/news', label: translations?.common?.nav?.news || 'News' },
    { href: '/donate', label: translations?.common?.nav?.donate || 'Donate' },
    { href: '/dashboard', label: translations?.common?.nav?.dashboard || 'Dashboard' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Dharitri Logo"
                  width={40}
                  height={40}
                  className={`transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'brightness-0 invert'}`}
                />
              </div>
              <span className={`text-2xl font-bold ${
                isScrolled ? 'text-green-700' : 'text-white'
              }`}>
                Dharitri
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`font-medium transition-colors ${
                    isScrolled
                      ? pathname === href
                        ? 'text-green-700'
                        : 'text-gray-600 hover:text-green-700'
                      : pathname === href
                        ? 'text-white font-bold'
                        : 'text-white/90 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className={`${
                isScrolled ? 'text-gray-600' : 'text-white'
              }`}>
                <LanguageSelector />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100/10"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className={`w-6 h-6 ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
                ) : (
                  <FaBars className={`w-6 h-6 ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? 'max-h-96 opacity-100 visible'
                : 'max-h-0 opacity-0 invisible'
            } overflow-hidden`}
          >
            <div className={`pt-4 pb-3 space-y-2 ${
              isScrolled ? 'bg-white' : 'bg-gray-900/90'
            }`}>
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 font-medium transition-colors ${
                    isScrolled
                      ? pathname === href
                        ? 'text-green-700'
                        : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
                      : pathname === href
                        ? 'text-white font-bold'
                        : 'text-white/90 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer div to push content down on non-home pages */}
      {pathname !== '/' && <div className="h-14" />}
    </>
  );
};

export default Navbar;

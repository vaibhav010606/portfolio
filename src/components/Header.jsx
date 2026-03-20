import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Header = () => {
  const { portfolioData } = usePortfolio();
  const firstName = portfolioData?.personal?.name?.split(' ')[0]?.toUpperCase() || 'VAIBHAV';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group transition-transform hover:-translate-y-1">
          <span className="text-[#00D4FF] font-black text-3xl group-hover:animate-pulse drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]">&gt;_</span>
          <span className="font-['Orbitron'] font-black text-3xl tracking-wider text-white text-3d transition-all duration-300">
            {firstName}<span className="text-[#00D4FF]">.AI</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-[#00FFF5] hover:glow-text transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full glass flex flex-col items-center py-6 gap-6 transition-transform duration-300 transform origin-top ${
          mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
      >
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            className="text-lg font-medium text-gray-300 hover:text-[#00FFF5]"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;

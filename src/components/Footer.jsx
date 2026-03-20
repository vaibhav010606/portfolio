import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
  const { portfolioData } = usePortfolio();
  const firstName = portfolioData?.personal?.name?.split(' ')[0]?.toUpperCase() || 'VAIBHAV';
  const fullName = portfolioData?.personal?.name || 'Vaibhav Panchakshari';
  
  return (
    <footer className="border-t border-gray-800 bg-[#0a0a0f] py-10 relative overflow-hidden">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-['Orbitron'] font-bold text-xl tracking-wider text-white">
            {firstName}<span className="text-[#00D4FF]">.AI</span>
          </span>
          <p className="text-gray-400 text-sm mt-2">Designing intelligent systems for the future.</p>
        </div>

        {/* Socials */}
        <div className="flex gap-4">
          <a href={portfolioData?.personal?.github} target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 rounded-full hover:border-[#00FFF5] hover:text-[#00FFF5] transition-all group">
            <Github size={20} className="text-gray-400 group-hover:text-[#00FFF5]" />
          </a>
          <a href={portfolioData?.personal?.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 rounded-full hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all group">
            <Linkedin size={20} className="text-gray-400 group-hover:text-[#00D4FF]" />
          </a>
          <a href={`mailto:${portfolioData?.personal?.email}`} className="p-2 border border-gray-800 rounded-full hover:border-[#A855F7] hover:text-[#A855F7] transition-all group">
            <Mail size={20} className="text-gray-400 group-hover:text-[#A855F7]" />
          </a>
        </div>

      </div>
      
      {/* Copyright */}
      <div className="container mx-auto px-6 text-center mt-8 text-sm text-gray-500 flex items-center justify-center gap-1">
        <span>© {new Date().getFullYear()} {fullName}. Built with</span>
        <Heart size={14} className="text-[#A855F7]" />
        <span>and AI.</span>
      </div>
    </footer>
  );
};

export default Footer;

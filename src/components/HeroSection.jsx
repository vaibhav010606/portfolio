import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, ChevronRight, Download } from 'lucide-react';

const HeroSection = () => {
  const { portfolioData } = usePortfolio();
  
  const [text, setText] = useState('');
  const [skillIndex, setSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const skillsToType = ["AI", "Machine Learning", "Python", "Data Science", "Deep Learning"];

  useEffect(() => {
    let timer;
    const currentSkill = skillsToType[skillIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentSkill.substring(0, text.length - 1));
        setTypingSpeed(50);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(currentSkill.substring(0, text.length + 1));
        setTypingSpeed(150);
      }, typingSpeed);
    }

    if (!isDeleting && text === currentSkill) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Pause at end of word
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setSkillIndex((prev) => (prev + 1) % skillsToType.length);
      setTypingSpeed(500); // Pause before next word starts
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, skillIndex, typingSpeed, skillsToType]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop')" }}
    >
      
      {/* Gradient Overlays to darken the image so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/80 via-[#0a0a0f]/90 to-[#0a0a0f] z-0"></div>
      
      <div className="container relative z-10 px-6 md:px-12 flex flex-col items-center justify-center text-center mt-20">
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-['Orbitron'] font-bold mb-4"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#A855F7] glow-text">{portfolioData.personal.name}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-2 font-medium"
        >
          {portfolioData.personal.title}
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="h-10 text-xl md:text-2xl text-[#00FFF5] font-['Orbitron'] flex justify-center items-center gap-1 mb-8"
        >
          <span>&gt; Specialized in</span>
          <span className="font-bold border-r-2 border-[#00FFF5] pr-1 animate-pulse">{text}</span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl text-gray-400 text-lg mb-12"
        >
          {portfolioData.personal.tagline}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a href="#projects" className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#00D4FF]/10 border border-[#00D4FF] text-[#00D4FF] rounded font-medium transition-all hover:bg-[#00D4FF] hover:text-[#0a0a0f] glow-border">
            <Terminal size={20} />
            <span>Explore AI Work</span>
          </a>
          
          <a 
            href={portfolioData.personal.resume || "/resume.pdf"} 
            download="Vaibhav_Panchakshari_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center justify-center gap-2 px-8 py-4 glass text-[#A855F7] border border-[#A855F7]/30 rounded font-medium transition-all hover:border-[#A855F7] hover:bg-[#A855F7]/10"
          >
            <span>Download Resume</span>
            <Download size={20} />
          </a>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;

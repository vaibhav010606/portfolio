import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const SkillBar = ({ name, level, index }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <span className="font-['Orbitron'] text-gray-300 font-medium">{name}</span>
      <span className="text-[#00D4FF] text-sm font-bold">{level}%</span>
    </div>
    {/* 3D Track */}
    <div className="w-full bg-[#0a0a0f] rounded-full h-4 border-b border-white/5 shadow-[inset_0_4px_6px_rgba(0,0,0,0.8),inset_0__-1px_2px_rgba(255,255,255,0.05)] overflow-hidden relative">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.1 * index, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-[#00D4FF] via-[#4d88ff] to-[#A855F7] rounded-full relative shadow-[inset_0_2px_3px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.5)]"
      >
        {/* Top specular 3D highlight */}
        <div className="absolute top-0 left-0 w-full h-[35%] bg-gradient-to-b from-white/40 to-transparent rounded-t-full"></div>
        
        {/* Glowing tip */}
        <div className="absolute top-0 right-0 w-2 h-full bg-white/80 shadow-[0_0_12px_4px_rgba(255,255,255,0.8)] rounded-r-full"></div>
      </motion.div>
    </div>
  </div>
);

const SkillsSection = () => {
  const { portfolioData } = usePortfolio();
  
  const [activeTab, setActiveTab] = useState('programming');
  const categories = [
    { id: 'programming', label: 'Programming' },
    { id: 'aiml', label: 'AI & ML' },
    { id: 'tools', label: 'Tools & Core' },
    { id: 'soft_skills', label: 'Soft Skills' }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0a0a0f]/90 border-t border-b border-gray-900">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-['Orbitron'] font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Technical</span>
            <span className="text-[#00D4FF] glow-text ml-2">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 rounded-full font-['Orbitron'] font-semibold transition-all duration-300 ${
                  activeTab === cat.id 
                    ? 'bg-[#00D4FF]/20 text-[#00FFF5] border border-[#00FFF5] glow-border'
                    : 'bg-transparent text-gray-500 border border-gray-800 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skill Bars */}
          <div className="glass p-8 rounded-2xl border border-gray-800 min-h-[320px]">
            {Object.keys(portfolioData.skills).map((key) => (
              <div 
                key={key} 
                className={`transition-opacity duration-500 ${activeTab === key ? 'block opacity-100' : 'hidden opacity-0'}`}
              >
                {portfolioData.skills[key].map((skill, index) => (
                  <SkillBar 
                    key={skill.name} 
                    name={skill.name} 
                    level={skill.level} 
                    index={index} 
                  />
                ))}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default SkillsSection;

import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap } from 'lucide-react';

const EducationSection = () => {
  const { portfolioData } = usePortfolio();

  return (
    <section id="education" className="py-24 relative bg-[#0a0a0f]">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 justify-center mb-4 text-[#A855F7] glow-text">
            <GraduationCap size={32} />
            <h2 className="text-4xl font-['Orbitron'] font-bold text-white">
              Academic <span className="text-[#A855F7]">Foundation</span>
            </h2>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#A855F7]/50 to-transparent transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {portfolioData.education.map((edu, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`relative flex flex-col md:flex-row items-center justify-between group ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[#0a0a0f] border-2 border-[#A855F7] transform -translate-x-1/2 group-hover:bg-[#A855F7] group-hover:scale-150 transition-all duration-300 z-10 glow-border"></div>

                <div className="w-full md:w-5/12 ml-8 md:ml-0">
                  <div className={`glass p-6 rounded-xl border border-gray-800 hover:border-[#A855F7]/50 transition-colors ${
                    index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                  }`}>
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-bold font-['Orbitron'] tracking-wider text-[#A855F7] bg-[#A855F7]/10 rounded-full">
                      {edu.period}
                    </span>
                    <h3 className="text-xl font-['Orbitron'] font-bold text-white mb-1 group-hover:text-[#00DPFF] transition-colors">
                      {edu.degree}
                    </h3>
                    <h4 className="text-[#00FFF5] font-medium mb-3">{edu.institution}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default EducationSection;

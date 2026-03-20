import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { ExternalLink, Github, Network } from 'lucide-react';

const ProjectsSection = () => {
  const { portfolioData } = usePortfolio();

  return (
    <section id="projects" className="py-24 relative bg-[#0a0a0f]">
      
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4 text-[#00D4FF]">
            <Network size={24} />
            <h2 className="text-4xl font-['Orbitron'] font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Deployed</span>
              <span className="text-[#00D4FF] glow-text ml-2">Modules</span>
            </h2>
          </div>
          <p className="text-gray-400">Showcasing autonomous systems and machine learning models.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden border border-gray-800 flex flex-col h-full group relative"
            >
              {/* Card top accent */}
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00FFF5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="px-3 py-1 text-xs font-['Orbitron'] font-semibold tracking-wider rounded-full border border-[#00FFF5]/30 text-[#00FFF5] bg-[#00FFF5]/5">
                    {project.type}
                  </div>
                  <div className="flex gap-3">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00D4FF] transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <h3 className="text-xl font-['Orbitron'] font-bold mb-3 text-white group-hover:text-[#00D4FF] transition-colors">{project.title}</h3>
                
                <p className="text-gray-400 text-sm mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="mt-auto">
                  <div className="text-xs font-['Orbitron'] text-gray-500 mb-2 uppercase tracking-wide">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-[#0a0a0f] border border-gray-700 text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Glow Overlay on hover */}
              <div className="absolute inset-0 border-2 border-[#00D4FF] rounded-xl opacity-0 group-hover:opacity-100 group-hover:glow-border pointer-events-none transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;

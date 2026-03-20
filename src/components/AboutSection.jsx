import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Brain, Code, Database, Cpu } from 'lucide-react';

const AboutSection = () => {
  const { portfolioData } = usePortfolio();

  const highlights = [
    { icon: <Brain />, title: "Machine Learning", desc: "Building predictive models and deep neural networks." },
    { icon: <Code />, title: "Software Engineering", desc: "Writing clean, scalable, and maintainable code." },
    { icon: <Database />, title: "Data Science", desc: "Extracting actionable insights from complex datasets." },
    { icon: <Cpu />, title: "Edge AI", desc: "Deploying lightweight models on resource-constrained devices." },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden backdrop-blur-sm bg-[#0a0a0f]/80">
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#A855F7]/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-['Orbitron'] font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">About</span>
            <span className="text-[#A855F7] glow-text ml-2">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#A855F7] to-transparent mx-auto"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/3 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00D4FF] to-[#A855F7] rounded-full blur-xl opacity-40 animate-pulse"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-[#A855F7]/30 glass">
                <img 
                  src={portfolioData.personal.image} 
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="w-full lg:w-2/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-['Orbitron'] text-[#00FFF5] mb-4 border-l-2 border-[#00FFF5] pl-4">
                Initializing Bio...
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {portfolioData.personal.about}
              </p>
            </motion.div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  className="glass p-5 rounded-lg border border-gray-800 hover:border-[#00D4FF]/50 transition-colors group cursor-default"
                >
                  <div className="text-[#00D4FF] mb-3 group-hover:scale-110 group-hover:text-[#00FFF5] transition-all">
                    {item.icon}
                  </div>
                  <h4 className="font-['Orbitron'] font-semibold text-lg mb-2 text-white">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

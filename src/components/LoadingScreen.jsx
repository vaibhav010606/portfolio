import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal } from 'lucide-react';

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState('Initializing Core Systems');
  
  useEffect(() => {
    const texts = [
      'Initializing Core Systems...',
      'Loading Neural Weights...',
      'Connecting to Matrix...',
      'Compiling Interface Models...',
      'System Ready.'
    ];
    let step = 0;
    
    const interval = setInterval(() => {
      step = (step + 1) % texts.length;
      setLoadingText(texts[step]);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] z-[9999] flex flex-col items-center justify-center text-white top-0 left-0 w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00D4FF]/10 to-[#A855F7]/10 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00D4FF]/20 rounded-full blur-[100px] animate-pulse"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           className="relative flex items-center justify-center w-24 h-24 mb-8"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 border-t-2 border-l-2 border-[#00FFF5] rounded-full"></div>
          {/* Inner ring */}
          <div className="absolute inset-2 border-b-2 border-r-2 border-[#00D4FF] rounded-full"></div>
          
          <Cpu className="text-[#A855F7] animate-pulse" size={32} />
        </motion.div>

        <div className="flex items-center gap-3 text-xl font-['Orbitron'] font-medium tracking-widest text-[#00FFF5]">
          <Terminal size={20} className="text-[#00D4FF]" />
          <span>{loadingText}</span>
        </div>
        
        <div className="w-64 h-1 bg-gray-800 rounded-full mt-6 overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-[#00D4FF] via-[#00FFF5] to-[#A855F7]"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending', 'success'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('https://formspree.io/f/xzdjwjky', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Failed to send message');
        setStatus(null);
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      setStatus(null);
    } finally {
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0a0a0f]">
      
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#00FFF5]/5 rounded-tl-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Info Side */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-['Orbitron'] font-bold mb-6">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#00FFF5] glow-text">Connect</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md">
                Interested in collaborating on a machine learning project, discussing AI research, or exploring job opportunities? My inbox is always open.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#00D4FF]">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h4 className="font-['Orbitron'] font-semibold text-white">System Status</h4>
                    <span className="text-sm text-[#00FFF5]">Online and ready for new challenges</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-1/2 max-w-lg">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass p-8 rounded-2xl border border-gray-800 relative z-10"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="relative group">
                  <label className="text-xs font-['Orbitron'] text-gray-400 uppercase tracking-widest mb-2 block">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#0a0a0f]/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
                    placeholder="Enter your name"
                  />
                  <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#00FFF5] opacity-0 group-focus-within:opacity-20 blur-md transition-opacity"></div>
                </div>

                <div className="relative group">
                  <label className="text-xs font-['Orbitron'] text-gray-400 uppercase tracking-widest mb-2 block">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#0a0a0f]/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#00FFF5] opacity-0 group-focus-within:opacity-20 blur-md transition-opacity"></div>
                </div>

                <div className="relative group">
                  <label className="text-xs font-['Orbitron'] text-gray-400 uppercase tracking-widest mb-2 block">Message</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#0a0a0f]/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FFF5] focus:ring-1 focus:ring-[#00FFF5] transition-all resize-none"
                    placeholder="Describe your project or inquiry..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="mt-2 w-full flex items-center justify-center gap-2 py-4 rounded-lg font-['Orbitron'] font-bold text-[#0a0a0f] bg-gradient-to-r from-[#00D4FF] to-[#00FFF5] hover:from-[#00FFF5] hover:to-[#00D4FF] transition-all glow-border focus:outline-none hover:scale-[1.02]"
                >
                  {status === 'sending' ? (
                    <span className="animate-pulse">Transmitting Data...</span>
                  ) : status === 'success' ? (
                    <span>Message Received!</span>
                  ) : (
                    <>
                      <span>Initialize Connection</span>
                      <Send size={18} />
                    </>
                  )}
                </button>

              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;

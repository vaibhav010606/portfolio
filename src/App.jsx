import React from 'react';
import Portfolio from './pages/Portfolio';
import { PortfolioProvider } from './context/PortfolioContext';
import './App.css'; // Keep if any vite-specific css is there, but we mostly use index.css

function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-cyan-500/30">
        <Portfolio />
      </div>
    </PortfolioProvider>
  );
}

export default App;

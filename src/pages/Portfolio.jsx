import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import EducationSection from '../components/EducationSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import { usePortfolio } from '../context/PortfolioContext';

const Portfolio = () => {
  const { loading, error } = usePortfolio();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    console.error("Failed to load portfolio standard config", error);
    // Ideally returning some gracefully degraded ui, but since we fallback to static mock we'll proceed usually.
  }

  return (
    <div className="relative">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;

// src/pages/LandingPage.jsx
import React from 'react';
import Navbar from '../componentes/Navbar';
import Hero from '../componentes/Hero';
import ArchitectureSection from '../componentes/ArchitectureSection';
import Footer from '../componentes/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page__container">
        <Navbar />
        <Hero />
        <ArchitectureSection />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
"use client"; // This page uses hooks, so it's a client component

import React from 'react';
import Header from '../components/Header.jsx';
import HeroBackground from '../components/HeroBackground.jsx';
import ServicesV2 from '../components/ServicesV2.jsx';
import Portfolio from '../components/Portfolio.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import StatCounter from '../components/StatCounter.jsx';

// This is the main page component for your site's root URL "/"
export default function HomePage({ launchTerminal, onResumeDownload }) {

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <HeroBackground />
      <Header onViewToggle={() => launchTerminal('help')} onResumeDownload={onResumeDownload} />
      <main className="agency-layout">
        
        {/* --- HERO SECTION --- */}
        <section className="hero-section text-center pt-32 pb-20 min-h-screen flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            From <span className="gradient-text">Data</span> to <span className="gradient-text">Deployment</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-text-secondary">
            We transform your data into intelligent solutions through custom AI models, advanced analytics, and secure, full-stack development.
          </p>
          <div className="flex justify-center gap-4 my-8">
            <button onClick={() => handleScrollTo('contact')} className="cta-button">[ Get Free Consultation ]</button>
            <button onClick={() => launchTerminal('help')} className="cta-button">[ Launch Terminal ]</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <StatCounter target={50} suffix="+" label="AI Models Deployed" />
            <StatCounter target={150} suffix="+" label="Projects Completed" />
            <StatCounter target={95} suffix="%" label="Client Satisfaction" />
            <StatCounter target={10000} suffix="+" label="Lines of Code" />
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <ServicesV2 />
        
        {/* --- PORTFOLIO SECTION --- */}
        <Portfolio />

        {/* --- TESTIMONIALS SECTION --- */}
        <Testimonials />

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="py-20 bg-bg-secondary border-y border-border-color -mx-8 px-8">
          <Contact />
        </section>
        
      </main>
      <Footer />
    </>
  );
}
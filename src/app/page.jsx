"use client";

import React from 'react';
import Header from '../components/Header.jsx';
import HeroBackground from '../components/HeroBackground.jsx';
import LiveHackingTerminal from '../components/LiveHackingTerminal.jsx';
import ProblemSection from '../components/ProblemSection.jsx';
import PricingTiers from '../components/PricingTiers.jsx'; // Import the Pricing Tiers
import Testimonials from '../components/Testimonials.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import { useAppContext } from '../context/AppContext';
import ServicesV2 from '../components/ServicesV2.jsx';
import Portfolio from '../components/Portfolio.jsx';
import StatCounter from '../components/StatCounter.jsx';

export default function HomePage() {
  const { launchTerminal } = useAppContext();

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <HeroBackground />
      <Header />
      <main className="agency-layout">
        
        {/* HERO SECTION */}
        <section className="hero-section text-center pt-32 pb-20 min-h-screen flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            From <span className="gradient-text">Data</span> to <span className="gradient-text">Deployment</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-text-secondary">
            We transform your data into intelligent solutions through custom AI models, advanced analytics, and secure, full-stack development.
          </p>
          <div className="flex justify-center gap-4 my-8">
            <button onClick={() => handleScrollTo('contact')} className="cta-button">[ Get Free Consultation ]</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <StatCounter target={50} suffix="+" label="AI Models Deployed" />
            <StatCounter target={150} suffix="+" label="Projects Completed" />
            <StatCounter target={95} suffix="%" label="Client Satisfaction" />
            <StatCounter target={10000} suffix="+" label="Lines of Code" />
          </div>
        </section>

        {/* SERVICES SECTION */}
        <ServicesV2 />

        {/* PRICING TIERS (THE SOLUTION) */}
        <PricingTiers />
        
        {/* PORTFOLIO SECTION (PROOF OF WORK) */}
        <Portfolio />

        {/* TESTIMONIALS SECTION (SOCIAL PROOF) */}
        <Testimonials />

        {/* CONTACT SECTION (CONVERSION) */}
        <section id="contact" className="py-20 bg-bg-secondary border-y border-border-color -mx-8 px-8">
          <Contact />
        </section>
        
      </main>
      <Footer />
    </>
  );
}
import React, { useState } from 'react';
import { FaShieldAlt, FaBrain, FaCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const servicesData = {
  cybersecurity: {
    icon: <FaShieldAlt />,
    title: 'Cybersecurity Solutions',
    description: 'We apply an offensive mindset to build impenetrable defensive strategies, protecting your critical assets from the inside out.',
    items: ['Penetration Testing & Red Teaming', 'Zero-Trust Architecture Design', 'CI/CD Pipeline Security', 'Incident Response & Forensics']
  },
  aiAndData: {
    icon: <FaBrain />,
    title: 'AI & Data Engineering',
    description: 'We architect and secure the entire data lifecycle, from ingestion and cleaning to model fine-tuning and deployment.',
    items: ['Secure Data Ingestion Pipelines', 'AI/ML Model Security Audits', 'Custom SLM/LLM Fine-Tuning', 'Data-Driven Threat Intelligence']
  },
  development: {
    icon: <FaCode />,
    title: 'Full-Stack Development',
    description: 'We build high-performance, scalable web applications and APIs with a security-first approach, ensuring your product is resilient by design.',
    items: ['Secure Web Application Development (React, Next.js)', 'High-Performance Backend APIs (Rust, Python)', 'Cloud-Native Infrastructure (AWS, Docker)', 'Architectural Design & Code Reviews']
  }
};

const TabButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`p-4 font-mono font-bold text-lg border-b-2 transition-colors ${
      isActive
        ? 'text-accent-green border-accent-green'
        : 'text-text-secondary border-transparent hover:text-text-primary'
    }`}
  >
    {label}
  </button>
);

export default function ServicesV2() {
  const [activeTab, setActiveTab] = useState('cybersecurity');
  const activeService = servicesData[activeTab];

  return (
    <section id="services" className="services-section">
      <h2 className="// Declassified Projects">// Core Service Matrix</h2>
      <div className="border-b border-border flex justify-center mb-12">
        <TabButton label="Cybersecurity" isActive={activeTab === 'cybersecurity'} onClick={() => setActiveTab('cybersecurity')} />
        <TabButton label="AI & Data" isActive={activeTab === 'aiAndData'} onClick={() => setActiveTab('aiAndData')} />
        <TabButton label="Development" isActive={activeTab === 'development'} onClick={() => setActiveTab('development')} />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
        >
          <div className="lg:col-span-1 text-center lg:text-left">
            <div className="text-6xl text-accent-green inline-block mb-4">{activeService.icon}</div>
            <h3 className="text-3xl font-bold font-mono text-accent-blue mb-4">{activeService.title}</h3>
            <p className="text-text-secondary text-lg">{activeService.description}</p>
          </div>
          <div className="lg:col-span-2">
            <ul className="space-y-4">
              {activeService.items.map(item => (
                <li key={item} className="bg-bg-secondary p-6 rounded-lg border border-border flex items-center">
                  <span className="text-accent-green mr-4 text-2xl">✓</span>
                  <span className="text-text-primary text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
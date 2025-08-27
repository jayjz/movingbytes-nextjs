import React from 'react';
import AnimatedCard from './AnimatedCard.jsx';

const tiers = [
  { 
    name: 'Reconnaissance', 
    price: '497', 
    description: 'Essential protection for growing businesses.',
    features: [
      '24/7 Network Monitoring', 
      'Vulnerability Scanning', 
      'Monthly Security Reports', 
      'Email Security & Phishing Defense'
    ] 
  },
  { 
    name: 'Infiltration', 
    price: '997', 
    popular: true, 
    description: 'Comprehensive security for established operations.',
    features: [
      'Everything in Reconnaissance', 
      'Advanced AI Threat Detection', 
      'Dark Web Monitoring', 
      'Compliance Management', 
      'Priority Incident Response'
    ] 
  },
  { 
    name: 'Citadel Protocol', 
    price: '2,497', 
    description: 'Maximum security and strategic partnership.',
    features: [
      'Everything in Infiltration', 
      'Virtual CISO Services', 
      'Custom Security Tool Development', 
      'Zero-Trust Architecture Design', 
      '24/7 Dedicated Support Hotline'
    ] 
  }
];

export default function PricingTiers() {
  return (
    <section id="pricing" className="services-section">
      <h2 className="// Declassified Projects">// Your Protection Fortress</h2>
      <p className="max-w-3xl mx-auto mb-16 text-lg text-center">
        Choose your shield. Every plan includes our zero-breach guarantee and scales with your business.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => (
          <AnimatedCard key={tier.name}>
            <div className={`service-card h-full text-center relative p-8 ${tier.popular ? 'border-accent-green' : ''}`}>
              {tier.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-accent-green text-bg-primary font-mono text-sm px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold font-mono mt-4">{tier.name}</h3>
              <p className="text-5xl font-mono font-bold my-4 text-accent-green">
                ${tier.price}
                <span className="text-lg text-text-secondary">/mo</span>
              </p>
              <p className="text-text-secondary h-12">{tier.description}</p>
              <ul className="text-left space-y-3 my-8 text-text-primary">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="text-accent-green mr-3 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="cta-button mt-auto">[ Fortify Now ]</button>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}
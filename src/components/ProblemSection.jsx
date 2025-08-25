import React from 'react';
import AnimatedCard from './AnimatedCard.jsx';
import { FaBiohazard, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const problems = [
  { 
    icon: <FaExclamationTriangle />, 
    stat: '$4.45M', 
    title: 'Average Breach Cost', 
    text: 'The financial fallout of a single data breach in 2024, capable of crippling a business.' 
  },
  { 
    icon: <FaClock />, 
    stat: '287 Days', 
    title: 'Average Dwell Time', 
    text: 'The time an attacker can remain undetected in your network, escalating damage and exfiltrating data.' 
  },
  { 
    icon: <FaBiohazard />, 
    stat: 'Every 11 Secs', 
    title: 'Attack Frequency', 
    text: 'A new business falls victim to a ransomware attack, highlighting a constant, ever-present threat.' 
  }
];

export default function ProblemSection() {
  return (
    <section id="the-threat" className="services-section">
      <h2 className="font-mono text-3xl md:text-4xl">// The Threat Landscape Is Asymmetric</h2>
      <p className="max-w-3xl mx-auto mb-16 text-lg">
        Attackers only need to find one weakness. You need to defend them all. Traditional security is no longer enough.
      </p>
      <div className="services-grid">
        {problems.map((problem, index) => (
          <AnimatedCard key={index}>
            <div className="service-card text-center items-center p-8">
              <div className="w-20 h-20 rounded-full bg-critical-red bg-opacity-10 text-critical-red flex items-center justify-center text-4xl mb-6">
                {problem.icon}
              </div>
              <p className="text-5xl font-mono font-bold text-critical-red mb-3">{problem.stat}</p>
              <h3 className="text-xl font-semibold text-text-primary mb-3">{problem.title}</h3>
              <p className="text-sm text-text-secondary">{problem.text}</p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}
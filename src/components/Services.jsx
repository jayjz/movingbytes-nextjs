import React from 'react';
import AnimatedCard from './AnimatedCard.jsx';
import { FaUserSecret, FaCodeBranch, FaShieldAlt, FaBrain } from 'react-icons/fa';

const servicesData = [
  {
    icon: <FaUserSecret className="text-accent-green text-4xl mb-4" />,
    title: 'Offensive Security Operations',
    description: 'We simulate real-world cyberattacks to identify and remediate vulnerabilities before malicious actors can exploit them. Our approach provides a true measure of your defensive capabilities.',
    capabilities: [
      'Penetration Testing (Web, Mobile, Network)',
      'Red Team & Adversary Emulation',
      'Social Engineering Assessments',
      'Vulnerability Research',
    ],
  },
  {
    icon: <FaShieldAlt className="text-accent-green text-4xl mb-4" />,
    title: 'Secure Application Development',
    description: 'Leveraging a "secure-by-design" philosophy, we build robust, resilient, and high-performance applications from the ground up, ensuring security is a feature, not an afterthought.',
    capabilities: [
      'Full-Stack Development (Rust, Python, React)',
      'Architectural Security Reviews & Threat Modeling',
      'Secure Code Auditing',
      'API Security Design',
    ],
  },
  {
    icon: <FaCodeBranch className="text-accent-green text-4xl mb-4" />,
    title: 'DevSecOps & Pipeline Security',
    description: 'We integrate automated security controls directly into your CI/CD pipeline, enabling your team to ship features faster and more securely. Security at the speed of DevOps.',
    capabilities: [
      'CI/CD Pipeline Hardening (GitHub Actions, GitLab)',
      'Infrastructure as Code (IaC) Security',
      'Container Security (Docker, Kubernetes)',
      'Intrusion Detection System (IDS) Implementation',
    ],
  },
  {
    icon: <FaBrain className="text-accent-green text-4xl mb-4" />,
    title: 'AI & Data Security',
    description: 'We specialize in securing the entire machine learning lifecycle, from data ingestion and cleaning to model deployment, protecting your valuable data assets and proprietary algorithms.',
    capabilities: [
      'Secure Data Ingestion & Cleaning Pipelines',
      'ML Model Vulnerability Assessment',
      'Adversarial AI Attack Simulation',
      'AI-Powered Threat Detection Systems',
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section">
      <h2 className="// Declassified Projects">// Core Service Matrix</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {servicesData.map((service, index) => (
          <AnimatedCard key={index}>
            <div className="service-card h-full p-8">
              {service.icon}
              <h3 className="text-accent-blue text-2xl mb-4">{service.title}</h3>
              <p className="text-text-secondary mb-6">{service.description}</p>
              <ul className="space-y-2 text-left">
                {service.capabilities.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-accent-green mr-3 mt-1">✓</span>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}
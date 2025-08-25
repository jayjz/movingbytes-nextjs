import React, { useState, useEffect } from 'react';
import NewsFeed from '../components/NewsFeed';
import AnimatedCard from '../components/AnimatedCard';
import ViewSwitcher from '../components/ViewSwitcher';

// This is the card for your GitHub projects
const CaseStudyCard = ({ repo }) => (
  <AnimatedCard>
    <div className="service-card">
      <h3>{repo.name}</h3>
      <p>{repo.description || 'No description available.'}</p>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="case-study-link">
        View on GitHub &rarr;
      </a>
    </div>
  </AnimatedCard>
);

export default function AgencyLandingPage({ launchTerminal }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    // Fetch your actual projects from GitHub
    fetch('https://api.github.com/users/fordaculture/repos?sort=pushed&per_page=3')
      .then(res => res.json())
      .then(data => setRepos(data))
      .catch(error => console.error("Failed to fetch GitHub repos:", error));
  }, []);

  return (
    <>
      <ViewSwitcher onViewToggle={() => launchTerminal('help')} />
      <div className="agency-layout">
        {/* --- Hero Section --- */}
        <section className="hero-section">
          <h1>Offense Informs Defense.</h1>
          <p>MovingBytes provides elite cybersecurity and development services by leveraging the mindset of the attacker to build impenetrable systems.</p>
          <a href="#cyber-range" className="cta-button">[ View Live Threat Simulations ]</a>
        </section>

        {/* --- Interactive Cyber Range Section --- */}
        <section id="cyber-range" className="services-section">
          <h2>// Interactive Cyber Range</h2>
          <div className="services-grid">
            <AnimatedCard>
              <div className="service-card interactive-card" onClick={() => launchTerminal('scan-demo')}>
                <h3>Red Team: Network Recon</h3>
                <p>Simulate an Nmap-style port scan to identify open vulnerabilities. A demo of our offensive mindset.</p>
                <span className="launch-button">[ Launch Scan ]</span>
              </div>
            </AnimatedCard>
            <AnimatedCard>
              <div className="service-card interactive-card" onClick={() => launchTerminal('log-analysis-demo')}>
                <h3>Blue Team: Log Analysis</h3>
                <p>Analyze a stream of server logs to detect anomalous activity. A look into our defensive capabilities.</p>
                <span className="launch-button">[ Begin Analysis ]</span>
              </div>
            </AnimatedCard>
            <AnimatedCard>
              <div className="service-card interactive-card" onClick={() => launchTerminal('projects')}>
                 <h3>Project Showcase</h3>
                <p>Explore my latest open-source projects directly within the terminal interface.</p>
                <span className="launch-button">[ Run Project Demo ]</span>
              </div>
            </AnimatedCard>
          </div>
        </section>

        {/* --- Case Studies Section --- */}
        <section className="services-section">
          <h2>// Declassified Projects</h2>
          <div className="services-grid">
            {repos.length > 0 
              ? repos.map(repo => <CaseStudyCard key={repo.id} repo={repo} />)
              : <p>Fetching projects from GitHub...</p>
            }
          </div>
        </section>
        
        {/* ... (Your existing NewsFeed and Resources sections would go here) ... */}

      </div>
    </>
  );
}
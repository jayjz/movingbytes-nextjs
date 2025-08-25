import React, { useState, useEffect } from 'react';
import AnimatedCard from './AnimatedCard.jsx';

const CaseStudyCard = ({ repo }) => (
  <AnimatedCard>
    <div className="service-card h-full flex flex-col">
      <h3 className="text-accent-blue">{repo.name}</h3>
      <p className="flex-grow text-text-secondary">{repo.description || 'No description available.'}</p>
      <div className="flex flex-wrap gap-2 my-4">
        {repo.topics.map(topic => (
          <span key={topic} className="text-xs font-mono bg-bg-primary px-2 py-1 rounded-full border border-border">{topic}</span>
        ))}
      </div>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="case-study-link mt-auto">
        View on GitHub &rarr;
      </a>
    </div>
  </AnimatedCard>
);

export default function Portfolio() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [filters, setFilters] = useState(['All']);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch('https://api.github.com/users/fordaculture/repos?sort=pushed&per_page=20')
      .then(res => res.json())
      .then(data => {
        const validRepos = data.filter(repo => repo.name !== 'fordaculture' && !repo.fork && repo.topics.length > 0);
        setRepos(validRepos);
        setFilteredRepos(validRepos);
        const allTopics = new Set(['All']);
        validRepos.forEach(repo => {
          repo.topics.forEach(topic => allTopics.add(topic));
        });
        setFilters(Array.from(allTopics));
      })
      .catch(error => console.error("Failed to fetch GitHub repos:", error));
  }, []);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredRepos(repos);
    } else {
      setFilteredRepos(repos.filter(repo => repo.topics.includes(activeFilter)));
    }
  }, [activeFilter, repos]);

  return (
    <section id="projects" className="services-section">
      <h2>// Declassified Projects</h2>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`font-mono px-4 py-2 border rounded-md transition-colors text-sm ${
              activeFilter === filter
                ? 'bg-accent-green text-bg-primary border-accent-green'
                : 'bg-transparent border-border text-text-secondary hover:border-accent-green hover:text-text-primary'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="services-grid">
        {filteredRepos.length > 0
          ? filteredRepos.map(repo => <CaseStudyCard key={repo.id} repo={repo} />)
          : <p className="text-center col-span-3 text-text-secondary">Fetching projects from GitHub...</p>
        }
      </div>
    </section>
  );
}
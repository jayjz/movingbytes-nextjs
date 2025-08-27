import React, { useState, useEffect } from 'react';
import AnimatedCard from './AnimatedCard.jsx';

const CaseStudyCard = ({ repo }) => (
  <AnimatedCard>
    <div className="service-card h-full flex flex-col">
      <h3 className="text-accent-blue">{repo.name}</h3>
      <p className="flex-grow text-text-secondary">{repo.description || 'No description available.'}</p>
      {/* CORRECTED: Use repo.url which is provided by the GraphQL API */}
      <a href={repo.url} target="_blank" rel="noopener noreferrer" className="case-study-link mt-auto">
        View on GitHub &rarr;
      </a>
    </div>
  </AnimatedCard>
);

export default function Portfolio() {
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [status, setStatus] = useState('loading'); // loading, success, error

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const username = 'fordaculture';
      
      if (!githubToken) {
        console.error("GitHub token is missing. Please check your .env.local file and ensure it's named NEXT_PUBLIC_GITHUB_TOKEN.");
        setStatus('error');
        return;
      }
      
      const query = `
        query {
          user(login: "${username}") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  url
                  id
                }
              }
            }
          }
        }
      `;

      try {
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${githubToken}`,
          },
          body: JSON.stringify({ query }),
        });
        const data = await response.json();
        if (data.data && data.data.user) {
          setPinnedRepos(data.data.user.pinnedItems.nodes);
          setStatus('success');
        } else {
          // This handles cases where the token is invalid or has wrong scopes
          console.error("GitHub API Error:", data.errors || "Invalid response structure.");
          setStatus('error');
        }
      } catch (error) {
        console.error("Failed to fetch GitHub pinned repos:", error);
        setStatus('error');
      }
    };

    fetchPinnedRepos();
  }, []);

  return (
    <section id="projects" className="services-section">
      <h2>// Declassified Projects</h2>
      <div className="services-grid">
        {status === 'loading' && <p className="text-center col-span-3 text-text-secondary">Fetching pinned projects from GitHub...</p>}
        {status === 'error' && <p className="text-center col-span-3 text-critical-red">Failed to load projects. Ensure your GitHub token is correct and you have pinned repositories.</p>}
        {status === 'success' && pinnedRepos.length > 0 && 
          pinnedRepos.map(repo => <CaseStudyCard key={repo.id} repo={repo} />)
        }
        {status === 'success' && pinnedRepos.length === 0 && <p className="text-center col-span-3 text-text-secondary">No pinned projects found on GitHub profile.</p>}
      </div>
    </section>
  );
}
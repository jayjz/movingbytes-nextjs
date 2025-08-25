import React from 'react';
import { projectData } from '../data/projects';
import ProjectCard from './ProjectCard';

const Projects = () => {
  return (
    <section id="projects" className="py-20 max-w-7xl mx-auto px-8">
      <h2 className="text-4xl font-bold mb-12 text-center text-accent-green">Featured Projects</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        {projectData.map(project => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
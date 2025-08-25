import React, { useEffect, useRef, useState } from 'react';

const ProjectCard = ({ project }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(cardRef.current);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const cardClasses = `group relative rounded-xl border border-border-color bg-black/40 backdrop-blur-sm transition-all duration-300 ease-out ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`;

  return (
    <div 
      ref={cardRef} 
      className={cardClasses}
      onMouseMove={handleMouseMove}
    >
      {/* Background spotlight effect */}
      <div className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
           style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0, 255, 136, 0.15), transparent 40%)' }}
      ></div>

      <div className="relative p-8 z-10"> {/* Content must be relative and have z-index */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-green to-accent-cyan"></div>
        <h3 className="text-2xl font-bold text-accent-cyan mb-2">{project.title}</h3>
        <p className="text-text-secondary mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(tag => (
            <span key={tag} className="bg-accent-cyan/10 text-accent-cyan py-1 px-3 text-xs rounded-full border border-accent-cyan/30">{tag}</span>
          ))}
        </div>
        <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-green transition-transform duration-300 hover:translate-x-1 inline-block">
          View Code →
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
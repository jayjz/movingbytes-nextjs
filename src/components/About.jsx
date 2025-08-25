import React from 'react';

const SkillCategory = ({ title, skills }) => (
  <div className="bg-bg-card p-6 rounded-lg border border-border-color text-center">
    <h4 className="text-accent-green mb-4 font-bold">{title}</h4>
    <div className="flex flex-wrap gap-2 justify-center">
      {skills.map(skill => (
        <span key={skill} className="bg-accent-green/10 text-accent-green py-1 px-3 rounded-full text-xs border border-accent-green/30">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-20 max-w-7xl mx-auto px-8">
      <h2 className="text-4xl font-bold mb-12 text-center text-accent-green">About Me</h2>
      <div className="grid md:grid-cols-3 gap-16 items-center mb-20">
        <div className="md:col-span-1 flex justify-center">
           <div className="w-64 h-64 bg-gradient-to-br from-accent-green to-accent-cyan rounded-full flex items-center justify-center text-7xl font-bold text-bg-primary">
              JM
           </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-3xl font-bold mb-4 text-accent-cyan">Security-First Developer</h3>
          <p className="text-text-secondary mb-4 text-lg">
            As a Bachelor's student in Management Information Systems, I specialize in bridging the gap between cybersecurity, data and development. My approach blends technical precision with creative strategy to deliver projects that are not only functional, but future-proof.
          </p>
          <p className="text-text-secondary mb-4 text-lg">
            I believe in building tools that merge offensive security insight with defensive resilience. Every line of code is written with security in mind, from initial architecture decisions to deployment strategies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SkillCategory title="Security" skills={["Penetration Testing", "OSINT", "Cryptography", "Network Security"]} />
        <SkillCategory title="Backend" skills={["Python", "FastAPI", "Rust", "PostgreSQL"]} />
        <SkillCategory title="Frontend" skills={["React", "Next.js", "TypeScript", "Tailwind CSS"]} />
        <SkillCategory title="DevOps" skills={["Docker", "CI/CD", "AWS", "Kubernetes"]} />
      </div>
    </section>
  );
};

export default About;
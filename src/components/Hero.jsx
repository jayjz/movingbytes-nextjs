import React from 'react';

const Hero = () => {
  return (
    <section className="h-screen flex items-center justify-center text-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 100 100&quot;><defs><pattern id=&quot;grid&quot; width=&quot;10&quot; height=&quot;10&quot; patternUnits=&quot;userSpaceOnUse&quot;><path d=&quot;M 10 0 L 0 0 0 10&quot; fill=&quot;none&quot; stroke=&quot;%23333&quot; stroke-width=&quot;0.5&quot;/></pattern></defs><rect width=&quot;100%&quot; height=&quot;100%&quot; fill=&quot;url(%23grid)&quot;/></svg>')] opacity-30"></div>
      <div className="z-10 max-w-4xl animate-fadeInUp">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-accent-green to-accent-cyan text-transparent bg-clip-text">
          Justin // MovingBytes
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          Cybersecurity specialist building secure, future-proof applications with offensive security insight and defensive resilience. Fluent in Python, React, Next.js, Rust, and ML frameworks.
        </p>
        <div className="flex items-center justify-center gap-2 text-accent-green text-sm mb-12">
          <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
          <span>Available for new projects</span>
        </div>
        <div className="flex gap-6 justify-center flex-wrap">
          <a href="#projects" className="py-4 px-8 bg-accent-green text-bg-primary font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-green/30">
            View Projects
          </a>
          <a href="#contact" className="py-4 px-8 border-2 border-accent-cyan text-accent-cyan font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-cyan/30">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
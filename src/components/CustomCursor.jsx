"use client";

import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  // Logic from the hook is now directly inside the component
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updatePosition);
    
    const interactiveElements = document.querySelectorAll('a, button, .interactive-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Styling logic remains the same
  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`,
  };

  const dotStyle = {
    transform: `scale(${isHovering ? 0 : 1})`,
  };

  return (
    <div style={cursorStyle} className="custom-cursor hidden md:block">
      <div style={dotStyle} className="custom-cursor-dot"></div>
    </div>
  );
}
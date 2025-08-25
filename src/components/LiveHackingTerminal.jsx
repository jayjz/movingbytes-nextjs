import React, { useState, useEffect, useRef } from 'react';
import { scanSequence } from '../data/scanSequence.js';

export default function LiveHackingTerminal() {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    let delay = 0;
    scanSequence.forEach((line) => {
      delay += line.delay;
      setTimeout(() => {
        setLines(prevLines => [...prevLines, line]);
      }, delay);
    });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const renderLine = (line, index) => {
    if (line.type === 'prompt' || line.type === 'final-prompt') {
      return (
        <div key={index}>
          <span className="text-accent-green">{line.prompt}</span>
          <span className="text-command-blue ml-2">{line.command}</span>
          {line.type === 'final-prompt' && <span className="blinking-cursor"></span>}
        </div>
      );
    }
    
    let lineClass = 'text-text-secondary';
    if (line.type === 'output-red') lineClass = 'text-red-500';
    if (line.type === 'output-green') lineClass = 'text-accent-green';
    if (line.type === 'output-critical') lineClass = 'text-critical-red font-bold';
    
    return <p key={index} className={lineClass}>{line.text}</p>;
  };

  return (
    <div className="terminal-window bg-bg-secondary border border-border rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <div className="terminal-header bg-border h-8 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-sm text-text-secondary ml-auto">threat-scanner.exe</span>
      </div>
      <div ref={containerRef} className="terminal-content p-4 font-mono text-xs h-96 overflow-hidden leading-tight">
        {lines.map((line, index) => renderLine(line, index))}
      </div>
    </div>
  );
}
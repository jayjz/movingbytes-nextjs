import React, { useState, useEffect } from 'react';

const lines = [
  'Initializing MovingBytes protocol...',
  'Compiling threat intelligence modules...',
  'Establishing secure connection...',
  '> Offense Informs Defense.',
  '> Ready for tasking.',
];

export default function HeroTerminal() {
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const interval = setInterval(() => {
      setCurrentLine(prev => {
        const nextChar = lines[lineIndex][prev.length];
        if (nextChar) {
          return prev + nextChar;
        } else {
          // Move to the next line
          clearInterval(interval);
          setTimeout(() => {
            setLineIndex(prevIndex => prevIndex + 1);
            setCurrentLine('');
          }, 1000); // Pause before starting next line
          return prev;
        }
      });
    }, 50); // Typing speed

    return () => clearInterval(interval);
  }, [lineIndex]);

  return (
    <div className="font-mono text-left text-sm bg-black border border-border rounded-lg p-4 mt-8 max-w-2xl mx-auto min-h-[150px]">
      {lines.slice(0, lineIndex).map((line, i) => (
        <p key={i} className={line.startsWith('>') ? 'text-accent-green' : 'text-text-secondary'}>
          {line}
        </p>
      ))}
      <p className={lines[lineIndex]?.startsWith('>') ? 'text-accent-green' : 'text-text-secondary'}>
        {currentLine}
        <span className="bg-accent-green w-2 h-4 inline-block ml-1 animate-pulse"></span>
      </p>
    </div>
  );
}
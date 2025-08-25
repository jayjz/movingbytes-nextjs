import React, { useState, useEffect, useRef } from 'react';
import { commands } from '../components/commands.js';
import Header from '../components/Header.jsx';

const TerminalLine = ({ content }) => {
  const renderContent = () => {
    const parts = content.split(/(\x1b\[[0-9;]*m)/g);
    let currentColor = 'var(--color-text-primary)';
    return parts.map((part, index) => {
      const ansiMatch = part.match(/\x1b\[([0-9;]*)m/);
      if (ansiMatch) {
        const code = ansiMatch[1];
        switch (code) {
          case '31m': currentColor = 'var(--color-accent-red)'; break;
          case '32m': currentColor = 'var(--color-accent-green)'; break;
          case '33m': currentColor = 'var(--color-accent-yellow)'; break;
          case '36m': currentColor = 'var(--color-accent-blue)'; break;
          case '90m': currentColor = 'var(--color-text-secondary)'; break;
          case '0m':
          case '1;36m':
          case '1;33m':
          default: currentColor = 'var(--color-text-primary)'; break;
        }
        return null;
      }
      return <span key={index} style={{ color: currentColor }}>{part}</span>;
    });
  };
  return <div className="whitespace-pre-wrap">{renderContent()}</div>;
};

export default function TerminalView({ switchToGui, initialCommand, onResumeDownload }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const executeCommand = async (cmd) => {
    const [commandName, ...args] = cmd.trim().split(' ');
    setOutput(prev => [...prev, `\x1b[32mjustin@movingbytes:~$ \x1b[0m${cmd}`]);
    
    if (commandName) setHistory(prev => [cmd, ...prev]);

    if (commands[commandName]) {
      const updateOutput = (newContent) => {
        setOutput(prev => [...prev, newContent]);
      };
      const result = await commands[commandName].execute(updateOutput, args);
      
      if (result === 'clear') setOutput([]);
      else if (result === 'exit') switchToGui();
      else if (result) updateOutput(result);

    } else if (commandName) {
      setOutput(prev => [...prev, `\x1b[31mCommand not found: ${commandName}. Type 'help'.\x1b[0m`]);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    if (initialCommand) {
      executeCommand(initialCommand);
    } else {
      setOutput([`Welcome to the MovingBytes Terminal. Type 'help' for available commands.`]);
    }
  }, []);
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [output]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-bg-primary z-[999] p-4 md:p-8 flex flex-col font-mono" onClick={() => inputRef.current?.focus()}>
      <Header onViewToggle={switchToGui} onResumeDownload={onResumeDownload} isTerminalMode={true} />
      <div className="flex-1 bg-black border-2 border-border rounded-lg p-4 overflow-y-auto mt-20">
        {output.map((line, index) => <TerminalLine key={index} content={line} />)}
        <div ref={scrollRef} />
      </div>
      
      <form onSubmit={handleFormSubmit} className="mt-4 flex items-center">
        <span className="text-accent-green mr-2">justin@movingbytes:~$</span>
        <input
          ref={inputRef} type="text" value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-text-primary"
          autoComplete="off"
        />
      </form>
    </div>
  );
};
// src/components/ViewSwitcher.jsx

import React from 'react';

const ViewSwitcher = ({ onViewToggle, onResumeDownload }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-[1000] p-4 flex justify-between items-center
                       bg-bg-primary bg-opacity-70 backdrop-blur-lg border-b border-border">
      
      {/* Logo */}
      <div className="text-2xl font-mono font-bold text-text-primary">
        MovingBytes<span className="text-accent-green">.</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={onResumeDownload}
          title="Download Resume"
          className="px-4 py-2 font-mono text-sm border-2 border-accent-green bg-transparent text-accent-green rounded-md transition-all duration-300 hover:bg-accent-green hover:text-bg-primary"
        >
          Resume
        </button>
        <button 
          onClick={onViewToggle}
          title="Switch View"
          className="px-4 py-2 font-mono text-sm border-2 border-accent-green bg-accent-green text-bg-primary rounded-md transition-all duration-300 hover:bg-transparent hover:text-accent-green"
        >
          Terminal
        </button>
      </div>
      
    </header>
  );
};

export default ViewSwitcher;
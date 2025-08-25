"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import NewsletterModal from '../components/NewsletterModal';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalView from '../views/TerminalView';

// 1. Create the context
const AppContext = createContext(null);

// 2. Create the Provider component that will wrap our application
export function AppProvider({ children }) {
  const [viewMode, setViewMode] = useState('gui');
  const [initialCommand, setInitialCommand] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Logic for the newsletter popup
  useEffect(() => {
    if (!sessionStorage.getItem('newsletterShown')) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        sessionStorage.setItem('newsletterShown', 'true');
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  const launchTerminal = (command = '') => {
    setInitialCommand(command);
    setViewMode('terminal');
  };

  const switchToGui = () => {
    setViewMode('gui');
  };

  const handleResumeDownload = () => {
    const resumeUrl = '/Justin_Coulam_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Justin_Coulam_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Define the animation variants for Framer Motion
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  // The value that will be available to all children components
  const value = {
    viewMode,
    launchTerminal,
    switchToGui,
    handleResumeDownload,
  };

  return (
    <AppContext.Provider value={value}>
      {isModalOpen && <NewsletterModal onClose={() => setIsModalOpen(false)} />}
      <AnimatePresence mode="wait">
        {viewMode === 'gui' ? (
          <motion.div
            key="gui"
            initial="initial" animate="in" exit="out"
            variants={pageVariants} transition={pageTransition}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="terminal"
            initial="initial" animate="in" exit="out"
            variants={pageVariants} transition={pageTransition}
          >
            <TerminalView initialCommand={initialCommand} />
          </motion.div>
        )}
      </AnimatePresence>
    </AppContext.Provider>
  );
}

// 3. Create a custom hook to easily use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import GuiView from './views/GuiView';
import TerminalView from './views/TerminalView';
import NewsletterModal from './components/NewsletterModal';
import CustomCursor from './components/CustomCursor.jsx';

function App() {
  const [viewMode, setViewMode] = useState('gui');
  const [initialCommand, setInitialCommand] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <CustomCursor />
      {isModalOpen && <NewsletterModal onClose={() => setIsModalOpen(false)} />}
      
      <AnimatePresence mode="wait">
        {viewMode === 'gui' ? (
          <motion.div
            key="gui"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <GuiView launchTerminal={launchTerminal} onResumeDownload={handleResumeDownload} />
          </motion.div>
        ) : (
          <motion.div
            key="terminal"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <TerminalView switchToGui={switchToGui} initialCommand={initialCommand} onResumeDownload={handleResumeDownload} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
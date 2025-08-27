"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import NewsletterModal from '../components/NewsletterModal';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Logic for the newsletter popup (appears once per session)
  useEffect(() => {
    if (!sessionStorage.getItem('newsletterShown')) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        sessionStorage.setItem('newsletterShown', 'true');
      }, 15000); // 15 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  // No shared value is needed for now, but we keep the structure for the future
  const value = {};

  return (
    <AppContext.Provider value={value}>
      {isModalOpen && <NewsletterModal onClose={() => setIsModalOpen(false)} />}
      {children} {/* This will now always render the main GUI page */}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
import React, { useState } from 'react';
import Link from 'next/link'; // Import the Next.js Link component

// CORRECTED: The href for on-page links should just be the #id.
// The blog link is a true path.
const navLinks = [
  { title: 'Services', href: '#services' },
  { title: 'Projects', href: '#projects' },
  { title: 'Intel Hub', href: '/blog' },
  { title: 'Contact', href: '#contact' },
];

export default function Header({ onViewToggle, onResumeDownload, isTerminalMode = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth-scroll handler for on-page links
  const handleScrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] p-4 bg-bg-primary bg-opacity-70 backdrop-blur-lg border-b border-border">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-mono font-bold text-text-primary no-underline">
          MovingBytes<span className="text-accent-green">.</span>
        </Link>

        {/* Desktop Links - Hidden in Terminal Mode */}
        {!isTerminalMode && (
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.title}>
                {/* CORRECTED: Logic to handle either a scroll link or a page link */}
                {link.href.startsWith('/') ? (
                  <Link href={link.href} className="font-mono text-sm text-text-secondary hover:text-accent-green transition-colors no-underline">
                    {link.title}
                  </Link>
                ) : (
                  <a href={link.href} onClick={(e) => { e.preventDefault(); handleScrollTo(link.href); }}
                     className="font-mono text-sm text-text-secondary hover:text-accent-green transition-colors no-underline">
                    {link.title}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={onResumeDownload} className="font-mono text-sm text-accent-green hover:underline">
            Resume
          </button>
          <button onClick={onViewToggle} className="px-4 py-2 font-mono text-sm bg-accent-green text-bg-primary rounded-md transition-all duration-300 hover:opacity-80">
            {isTerminalMode ? 'GUI View' : 'Terminal'}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-primary text-3xl">
            {isMenuOpen ? '×' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-bg-secondary rounded-lg p-4">
          <ul className="flex flex-col items-center gap-4">
            {!isTerminalMode && navLinks.map((link) => (
              <li key={link.title}>
                {link.href.startsWith('/') ? (
                  <Link href={link.href} onClick={() => setIsMenuOpen(false)} className="font-mono text-lg text-text-primary block py-2 no-underline">
                    {link.title}
                  </Link>
                ) : (
                  <a href={link.href} onClick={(e) => { e.preventDefault(); handleScrollTo(link.href); }} className="font-mono text-lg text-text-primary block py-2 no-underline">
                    {link.title}
                  </a>
                )}
              </li>
            ))}
            <li className="w-full border-t border-border mt-2 pt-4 flex flex-col items-center gap-4">
              <button onClick={onResumeDownload} className="font-mono text-lg text-accent-green">
                Resume
              </button>
              <button onClick={onViewToggle} className="w-full px-4 py-3 font-mono text-lg bg-accent-green text-bg-primary rounded-md">
                {isTerminalMode ? 'GUI View' : 'Terminal'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
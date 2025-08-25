import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaTelegramPlane } from 'react-icons/fa';

const socials = [
  { icon: <FaGithub />, href: 'https://github.com/fordaculture', name: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://linkedin.com/in/your-profile', name: 'LinkedIn' }, // Replace with your LinkedIn
  { icon: <FaTelegramPlane />, href: 'https://t.me/thisiznotuser', name: 'Telegram' },
  { icon: <FaTwitter />, href: 'https://twitter.com/your-profile', name: 'Twitter' }, // Replace with your Twitter/X
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20 py-8">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-text-secondary text-sm">
          &copy; {new Date().getFullYear()} MovingBytes. All rights reserved.
        </p>
        <div className="flex gap-6">
          {socials.map(social => (
            <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
               aria-label={social.name} className="text-text-secondary hover:text-accent-green text-2xl transition-colors">
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
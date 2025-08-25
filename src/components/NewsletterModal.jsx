import React, { useState } from 'react';

export default function NewsletterModal({ onClose }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with a real email service (Mailchimp, ConvertKit, etc.)
    console.log(`Email submitted: ${email}`);
    alert('Thank you for subscribing to the Threat Intel Briefing!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center">
      <div className="bg-bg-secondary border border-border p-8 rounded-lg max-w-lg w-full relative text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary text-2xl">&times;</button>
        <h2 className="font-mono text-2xl text-accent-green mb-4">// Weekly Threat Intel Briefing</h2>
        <p className="text-text-secondary mb-6">
          Subscribe to get curated insights on the latest vulnerabilities, AI security trends, and red team techniques delivered to your inbox every week.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="operator@domain.com"
            required
            className="w-full bg-bg-primary border border-border rounded-md p-3 text-text-primary font-mono outline-none focus:border-accent-green"
          />
          <button type="submit" className="cta-button w-full">
            [ Subscribe ]
          </button>
        </form>
      </div>
    </div>
  );
}
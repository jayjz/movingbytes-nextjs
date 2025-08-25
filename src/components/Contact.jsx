import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID"); // IMPORTANT: Remember to use your Formspree ID

  if (state.succeeded) {
    return (
      <div className="text-center p-8">
        <h3 className="text-2xl font-bold font-mono text-accent-green mb-4">// Message Transmitted</h3>
        <p className="text-text-secondary">Thank you for reaching out. I will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="font-mono text-3xl md:text-4xl">// Initiate Secure Channel</h2>
        <p className="mt-4 text-lg text-text-secondary">Ready to build something truly resilient? Let's discuss your mission objectives.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-16 items-start">
        {/* Left Column: Contact Info */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold mb-6 text-accent-green font-mono">Contact Intel</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-text-secondary">
              <FaEnvelope className="text-accent-green text-2xl" />
              <div>
                <strong className="text-text-primary">Email</strong><br/>
                <a href="mailto:datawizardspro@gmail.com" className="text-accent-green no-underline hover:underline">datawizardspro@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4 text-text-secondary">
              <FaMapMarkerAlt className="text-accent-green text-2xl" />
              <div>
                <strong className="text-text-primary">Location</strong><br/>
                Boston, MA | Remote Worldwide
              </div>
            </div>
          </div>
          <p className="mt-8 text-text-secondary text-sm">
            Whether you need a security audit, custom penetration testing tools, or a full-stack application built with security-first principles, I'm here to help.
          </p>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-3 bg-bg-card border border-border rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-mono text-accent-green mb-2">// Your Callsign (Name)</label>
              <input type="text" id="name" name="name" required className="w-full p-3 bg-bg-secondary border border-border rounded-md text-text-primary font-mono outline-none focus:border-accent-green" />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-accent-green mb-2">// Secure Channel (Email)</label>
              <input type="email" id="email" name="email" required className="w-full p-3 bg-bg-secondary border border-border-color rounded-md text-text-primary font-mono outline-none focus:border-accent-green" />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-accent-red mt-1 text-sm font-mono" />
            </div>
            <div>
              <label htmlFor="message" className="block font-mono text-accent-green mb-2">// Message Payload</label>
              <textarea id="message" name="message" rows="5" required className="w-full p-3 bg-bg-secondary border border-border-color rounded-md text-text-primary font-mono outline-none focus:border-accent-green"></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-accent-red mt-1 text-sm font-mono" />
            </div>
            <button type="submit" disabled={state.submitting} className="cta-button w-full !mt-6">
              {state.submitting ? '[ Transmitting... ]' : '[ Transmit Message ]'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
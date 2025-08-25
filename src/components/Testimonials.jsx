import React from 'react';
import { testimonialsData } from '../data/testimonialsData.js';
import AnimatedCard from './AnimatedCard.jsx';
import { FaStar } from 'react-icons/fa';

const StarRating = () => (
  <div className="flex text-yellow-400 gap-1 mb-4">
    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
  </div>
);

const TestimonialCard = ({ quote, name, title, company, imageUrl }) => (
  <AnimatedCard>
    <div className="bg-bg-secondary border border-border rounded-lg p-6 h-full flex flex-col">
      <StarRating />
      <p className="text-text-secondary italic flex-grow">"{quote}"</p>
      <div className="flex items-center mt-6">
        <img src={imageUrl} alt={name} className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-accent-green" />
        <div>
          <p className="font-bold text-text-primary">{name}</p>
          <p className="text-sm text-text-secondary">{title}, {company}</p>
        </div>
      </div>
    </div>
  </AnimatedCard>
);

export default function Testimonials() {
  return (
    <section id="testimonials" className="services-section">
      <h2 className='// Declassified Projects'>// Field Intelligence</h2>
      <div className="services-grid mt-12">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
}
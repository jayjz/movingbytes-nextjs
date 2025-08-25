import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCard({ children }) {
  const cardVariants = {
    offscreen: {
      y: 50, // Start 50px below final position
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }} // Trigger animation once when 50% of it is in view
      variants={cardVariants}
    >
      {children}
    </motion.div>
  );
}
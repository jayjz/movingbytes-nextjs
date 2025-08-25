import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { animate } from 'framer-motion';

export default function StatCounter({ target, suffix, label }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, target, {
        duration: 2,
        onUpdate(value) {
          setCount(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-mono font-bold text-accent-blue">
        {count}{suffix}
      </p>
      <p className="text-sm text-text-secondary uppercase tracking-widest mt-2">{label}</p>
    </div>
  );
}
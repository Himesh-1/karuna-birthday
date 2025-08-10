
"use client";

import React, { useEffect, useState } from 'react';

const Firework = ({ style }) => (
  <div className="firework absolute" style={style}>
    <div className="explosion" />
  </div>
);

export function Fireworks() {
  const [fireworks, setFireworks] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const createFirework = () => {
      const newFirework = {
        id: Date.now() + Math.random(),
        style: {
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 40 + 10}%`,
          transform: `scale(${Math.random() * 0.5 + 0.5})`,
          '--firework-color-1': `hsl(${Math.random() * 360}, 100%, 70%)`,
          '--firework-color-2': `hsl(${Math.random() * 360}, 100%, 80%)`,
          animationDelay: `${Math.random() * 2}s`,
        },
      };
      setFireworks(prev => [...prev, newFirework]);
      setTimeout(() => {
        setFireworks(prev => prev.filter(f => f.id !== newFirework.id));
      }, 3000);
    };

    const interval = setInterval(createFirework, 700);
    
    // Create an initial burst
    for (let i=0; i < 5; i++) {
        setTimeout(createFirework, i * 200);
    }


    return () => clearInterval(interval);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {fireworks.map(fw => (
        <Firework key={fw.id} style={fw.style} />
      ))}
    </div>
  );
}

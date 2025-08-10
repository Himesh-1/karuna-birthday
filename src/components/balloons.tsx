
"use client";

import React, { useState, useEffect, useCallback } from 'react';

const BalloonShape = ({ style, colorClass }: { style: React.CSSProperties, colorClass: string }) => (
  <svg
    viewBox="0 0 100 125"
    className={`absolute drop-shadow-lg ${colorClass} animate-float`}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M50,5C25.1,5,5,25.1,5,50s20.1,45,45,45s45-20.1,45-45S74.9,5,50,5z M50,90C27.9,90,10,72.1,10,50S27.9,10,50,10s40,17.9,40,40S72.1,90,50,90z"
        className="opacity-80"
        fill="currentColor"
      />
      <path
        d="M50,100c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S52.8,100,50,100z"
        className="opacity-80"
        fill="currentColor"
      />
      <path
        d="M48.5,115h3c0.6,0,1-0.4,1-1v-14c0-0.6-0.4-1-1-1h-3c-0.6,0-1,0.4-1,1v14C47.5,114.6,47.9,115,48.5,115z"
        className="opacity-80"
        fill="currentColor"
      />
       <path 
        d="M 65 25 C 60 20, 50 20, 40 30 C 35 35, 35 45, 40 50" 
        fill="none" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round"
        className="opacity-50"
      />
    </g>
  </svg>
);


type BalloonObject = {
  id: number;
  style: React.CSSProperties;
  colorClass: string;
};

export function Balloons() {
  const [balloons, setBalloons] = useState<BalloonObject[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const createBalloon = useCallback(() => {
    if(!isMounted) return;
    const id = Date.now() + Math.random();
    const size = Math.random() * 80 + 80; // size between 80px and 160px
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}vw`,
      width: `${size}px`,
      height: `${size * 1.25}px`,
      animationDuration: `${Math.random() * 8 + 10}s`, // duration between 10s and 18s
      animationTimingFunction: 'linear',
      animationFillMode: 'forwards'
    };
    const colors = ['text-primary', 'text-secondary', 'text-accent', 'text-yellow-300', 'text-pink-400'];
    const colorClass = colors[Math.floor(Math.random() * colors.length)];

    setBalloons(prev => [...prev, { id, style, colorClass }]);
    setTimeout(() => {
        setBalloons(prev => prev.filter(b => b.id !== id));
    }, 18000); // Remove after animation ends

  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      const interval = setInterval(createBalloon, 3000);
      return () => clearInterval(interval);
    }
  }, [isMounted, createBalloon]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {balloons.map(balloon => (
        <BalloonShape key={balloon.id} style={balloon.style} colorClass={balloon.colorClass} />
      ))}
    </div>
  );
}

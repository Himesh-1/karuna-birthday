
"use client";

import React, { useState, useEffect, useCallback } from 'react';

const BalloonShape = ({ style, color }: { style: React.CSSProperties, color: { base: string, highlight: string } }) => (
    <svg
      viewBox="0 0 100 120"
      className="absolute drop-shadow-lg animate-float"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`grad-${color.base.replace(/[^a-zA-Z0-9]/g, '')}`} cx="40%" cy="40%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" style={{ stopColor: color.highlight, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: color.base, stopOpacity: 1 }} />
        </radialGradient>
      </defs>
      <path
        d="M50,110 C20,100 10,75 20,50 C30,25 70,25 80,50 C90,75 80,100 50,110 Z"
        fill={`url(#grad-${color.base.replace(/[^a-zA-Z0-9]/g, '')})`}
      />
      <path
        d="M50,110 Q48,115 45,118 L55,118 Q52,115 50,110 Z"
        fill={color.base}
      />
    </svg>
);

type BalloonObject = {
  id: number;
  style: React.CSSProperties;
  color: { base: string, highlight: string };
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
    const size = Math.random() * 60 + 40; // Smaller balloons
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}vw`,
      width: `${size}px`,
      height: `${size * 1.2}px`,
      animationDuration: `${Math.random() * 5 + 6}s`, // Faster animation
      animationTimingFunction: 'linear',
      animationFillMode: 'forwards',
      opacity: Math.random() * 0.5 + 0.4, // Lower opacity
    };

    const colors = [
        { base: 'hsl(330, 90%, 65%)', highlight: 'hsl(330, 90%, 85%)' }, // primary
        { base: 'hsl(180, 80%, 45%)', highlight: 'hsl(180, 80%, 65%)' }, // secondary
        { base: 'hsl(45, 100%, 60%)', highlight: 'hsl(45, 100%, 80%)' }, // accent
        { base: 'hsl(260, 90%, 70%)', highlight: 'hsl(260, 90%, 85%)' }, // purple
        { base: 'hsl(350, 90%, 70%)', highlight: 'hsl(350, 90%, 85%)' }, // pink
        { base: 'hsl(200, 90%, 70%)', highlight: 'hsl(200, 90%, 85%)' }, // blue
        { base: 'hsl(150, 90%, 60%)', highlight: 'hsl(150, 90%, 80%)' }, // green
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    setBalloons(prev => [...prev, { id, style, color }]);

    setTimeout(() => {
        setBalloons(prev => prev.filter(b => b.id !== id));
    }, 11000); // 11s to clear

  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      const interval = setInterval(createBalloon, 2000); // More frequent
      return () => clearInterval(interval);
    }
  }, [isMounted, createBalloon]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {balloons.map(balloon => (
        <BalloonShape key={balloon.id} style={balloon.style} color={balloon.color} />
      ))}
    </div>
  );
}

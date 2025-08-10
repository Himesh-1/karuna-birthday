
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
        <radialGradient id={`grad-${color.base}`} cx="40%" cy="40%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" style={{ stopColor: color.highlight, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: color.base, stopOpacity: 1 }} />
        </radialGradient>
      </defs>
      <path
        d="M50,110 C20,100 10,75 20,50 C30,25 70,25 80,50 C90,75 80,100 50,110 Z"
        fill={`url(#grad-${color.base})`}
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
    const size = Math.random() * 80 + 80;
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}vw`,
      width: `${size}px`,
      height: `${size * 1.2}px`,
      animationDuration: `${Math.random() * 8 + 10}s`,
      animationTimingFunction: 'linear',
      animationFillMode: 'forwards'
    };

    const colors = [
        { base: 'hsl(330, 90%, 65%)', highlight: 'hsl(330, 90%, 85%)' }, // primary
        { base: 'hsl(180, 80%, 45%)', highlight: 'hsl(180, 80%, 65%)' }, // secondary
        { base: 'hsl(45, 100%, 60%)', highlight: 'hsl(45, 100%, 80%)' }, // accent
        { base: 'hsl(54, 90%, 60%)', highlight: 'hsl(54, 90%, 80%)' },  // yellow
        { base: 'hsl(320, 80%, 70%)', highlight: 'hsl(320, 80%, 90%)' }  // pink
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    setBalloons(prev => [...prev, { id, style, color }]);
    setTimeout(() => {
        setBalloons(prev => prev.filter(b => b.id !== id));
    }, 18000);

  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      const interval = setInterval(createBalloon, 2500);
      return () => clearInterval(interval);
    }
  }, [isMounted, createBalloon]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {balloons.map(balloon => (
        <BalloonShape key={balloon.id} style={balloon.style} color={balloon.color} />
      ))}
    </div>
  );
}

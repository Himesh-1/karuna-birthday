
"use client";

import React, { useState, useEffect } from 'react';

type ConfettiPiece = {
  style: React.CSSProperties;
};

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  useEffect(() => {
    if (!isMounted) return;
    
    const newConfetti = Array.from({ length: 3000 }).map(() => ({
      style: {
        '--confetti-end-x': `${(Math.random() - 0.5) * 90}vw`,
        '--confetti-end-y': `${Math.random() * 50 + 50}vh`,
        '--confetti-end-rotation': `${Math.random() * 1080 - 540}deg`,
        left: `calc(50% + ${(Math.random() - 0.5) * 20}px)`,
        top: `calc(20% + ${(Math.random() - 0.5) * 20}px)`,
        backgroundColor: ['#D8B4FE', '#A78BFA', '#fecaca', '#fef08a', '#a5f3fc'][Math.floor(Math.random() * 5)],
        animationDelay: `${Math.random() * 0.3}s`,
        width: `${Math.floor(Math.random() * 8) + 8}px`,
        height: `${Math.floor(Math.random() * 6) + 6}px`,
      } as React.CSSProperties,
    }));
    setPieces(newConfetti);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {pieces.map((piece, index) => (
        <div
          key={index}
          className="confetti-piece absolute rounded-sm"
          style={piece.style}
        />
      ))}
    </div>
  );
}

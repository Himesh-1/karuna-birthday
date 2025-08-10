"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Confetti } from './confetti';

interface GiftBoxProps {
  onOpen: () => void;
}

export function GiftBox({ onOpen }: GiftBoxProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    // Wait for animation before calling onOpen
    setTimeout(onOpen, 1000); 
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-background transition-opacity duration-1000" style={{ opacity: isOpening ? 0 : 1 }}>
      {isOpening && <Confetti />}
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-6xl text-primary">A Special Surprise for You!</h1>
        <p className="font-body text-muted-foreground mt-2">Click the gift to open it</p>
      </div>
      <div 
        className="relative cursor-pointer group"
        onClick={handleClick}
      >
        <div className={`absolute -top-4 w-32 h-8 bg-accent rounded-t-md transition-transform duration-500 ease-in-out ${isOpening ? '-translate-y-20 rotate-12' : 'group-hover:-translate-y-1'}`} style={{ left: 'calc(50% - 64px)'}}></div>
        <div className={`absolute top-0 w-8 h-16 bg-accent/80 transition-transform duration-500 ease-in-out ${isOpening ? '-translate-x-20 -rotate-12' : 'group-hover:-translate-x-1'}`} style={{ left: 'calc(50% - 16px)', top: '-32px' }}></div>
        <Image
          src="https://placehold.co/300x300.png"
          alt="A gift box"
          width={300}
          height={300}
          className={`rounded-lg shadow-2xl transition-transform duration-500 ease-in-out ${isOpening ? 'scale-110' : 'group-hover:scale-105'}`}
          data-ai-hint="gift box present"
        />
      </div>
    </div>
  );
}

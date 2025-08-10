"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Confetti } from './confetti';

interface GiftBoxProps {
  onOpen: () => void;
}

const GiftBoxCSS = ({ isOpening, onClick }: { isOpening: boolean, onClick: () => void }) => {
  return (
    <div className="relative cursor-pointer group" onClick={onClick} style={{ width: '200px', height: '200px' }}>
      {/* Lid */}
      <div
        className={`absolute bg-accent w-[220px] h-[60px] rounded-md transition-all duration-700 ease-in-out ${isOpening ? 'transform -translate-y-40 rotate-12 opacity-0' : 'group-hover:-translate-y-1'}`}
        style={{ top: '0', left: '-10px', zIndex: 20 }}
      ></div>
      {/* Box */}
      <div className="absolute bg-primary w-[200px] h-[200px] rounded-lg" style={{ top: '40px', left: '0' }}></div>
      {/* Ribbon Vertical */}
      <div className="absolute bg-secondary/70 w-[30px] h-[240px]" style={{ top: '0', left: '85px', zIndex: 30 }}></div>
      {/* Ribbon Horizontal */}
      <div
        className={`absolute bg-secondary w-[220px] h-[30px] transition-all duration-700 ease-in-out ${isOpening ? 'opacity-0' : ''}`}
        style={{ top: '15px', left: '-10px', zIndex: 30 }}
      ></div>
       {/* Bow */}
      <div
        className={`absolute transition-all duration-500 ease-in-out ${isOpening ? 'opacity-0 scale-50' : 'group-hover:scale-110'}`}
        style={{ top: '-30px', left: '50%', transform: 'translateX(-50%)', zIndex: 40 }}
      >
        <div className="absolute w-[35px] h-[50px] bg-accent rounded-full -rotate-45" style={{left: '-30px'}}></div>
        <div className="absolute w-[35px] h-[50px] bg-accent rounded-full rotate-45" style={{left: '5px'}}></div>
      </div>
    </div>
  );
};


export function GiftBox({ onOpen }: GiftBoxProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    // Wait for animation before calling onOpen
    setTimeout(onOpen, 1200);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-background transition-opacity duration-1000" style={{ opacity: isOpening ? 0 : 1 }}>
      {isOpening && <Confetti />}
      <div className="text-center mb-16 z-10">
        <h1 className="font-headline text-4xl md:text-6xl text-primary">A Special Surprise for You!</h1>
        <p className="font-body text-muted-foreground mt-2">Click the gift to open it</p>
      </div>

      <div className="flex items-end justify-center gap-4">
          <Image
            src="https://placehold.co/200x250.png"
            alt="A cute teddy bear"
            width={200}
            height={250}
            className="transform -scale-x-100 animate-bobbing"
            data-ai-hint="teddy bear"
            style={{ animationDelay: '0.2s' }}
          />

        <div className="relative pt-[60px]">
           <GiftBoxCSS isOpening={isOpening} onClick={handleClick} />
        </div>

        <Image
          src="https://placehold.co/200x250.png"
          alt="A cute teddy bear"
          width={200}
          height={250}
          className="animate-bobbing"
          data-ai-hint="teddy bear"
        />
      </div>

    </div>
  );
}

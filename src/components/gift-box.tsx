
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Confetti } from './confetti';

interface GiftBoxProps {
  onOpen: () => void;
}

const GiftBoxCSS = ({ isOpening, onClick }: { isOpening: boolean, onClick: () => void }) => {
  return (
    <div className="relative cursor-pointer group" onClick={onClick} style={{ width: '150px', height: '150px' }}>
      {/* Lid */}
      <div
        className={`absolute bg-accent w-[165px] h-[45px] rounded-md transition-all duration-700 ease-in-out border-4 border-primary-foreground/30 ${isOpening ? 'transform -translate-y-40 rotate-12 opacity-0' : 'group-hover:-translate-y-1'}`}
        style={{ top: '0', left: '-7.5px', zIndex: 20 }}
      ></div>
      {/* Box */}
      <div className="absolute bg-primary w-[150px] h-[150px] rounded-lg border-4 border-primary-foreground/30" style={{ top: '30px', left: '0' }}></div>
      {/* Ribbon Vertical */}
      <div className="absolute bg-secondary/70 w-[22.5px] h-[180px]" style={{ top: '0', left: '63.75px', zIndex: 30 }}></div>
      {/* Ribbon Horizontal */}
      <div
        className={`absolute bg-secondary w-[165px] h-[22.5px] transition-all duration-700 ease-in-out ${isOpening ? 'opacity-0' : ''}`}
        style={{ top: '11.25px', left: '-7.5px', zIndex: 30 }}
      ></div>
       {/* Bow */}
      <div
        className={`absolute transition-all duration-500 ease-in-out ${isOpening ? 'opacity-0 scale-50' : 'group-hover:scale-110'}`}
        style={{ top: '-22.5px', left: '50%', transform: 'translateX(-50%)', zIndex: 40 }}
      >
        <div className="absolute w-[26.25px] h-[37.5px] bg-accent rounded-full -rotate-45" style={{left: '-22.5px'}}></div>
        <div className="absolute w-[26.25px] h-[37.5px] bg-accent rounded-full rotate-45" style={{left: '3.75px'}}></div>
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
    <div className="w-screen min-h-screen flex flex-col items-center justify-center p-4 transition-opacity duration-1000" style={{ opacity: isOpening ? 0 : 1 }}>
      {isOpening && <Confetti />}
      <div className="text-center mb-8 md:mb-16 z-10">
        <h1 className="font-headline text-4xl md:text-6xl text-primary">A Special Surprise for You!</h1>
        <p className="font-body text-muted-foreground mt-2">Click the gift to open it</p>
      </div>

      <div className="flex flex-row items-center justify-center gap-2 md:gap-12">
          <Image
            src="/images/your-image-1.png"
            alt="A cute teddy bear"
            width={200}
            height={250}
            className="transform md:-scale-x-100 animate-bobbing order-1 w-[120px] md:w-[200px] h-auto"
            data-ai-hint="lion waving"
            style={{ animationDelay: '0.2s' }}
          />

        <div className="relative order-2 my-4 md:my-0 scale-75 md:scale-100">
           <GiftBoxCSS isOpening={isOpening} onClick={handleClick} />
        </div>

        <Image
          src="/images/your-image-2.png"
          alt="A cute teddy bear"
          width={200}
          height={250}
          className="animate-bobbing order-3 w-[120px] md:w-[200px] h-auto"
          data-ai-hint="bear honey"
        />
      </div>

    </div>
  );
}

'use client';
import { HeroSection } from '@/components/sections/hero-section';
import { MemoriesSection } from '@/components/sections/memories-section';
import { CakeSection } from '@/components/sections/cake-section';
import { FinaleSection } from '@/components/sections/finale-section';
import React, { useEffect, useRef } from 'react';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Autoplay requires user interaction, but we can try.
    // Some browsers might block this.
    audioRef.current?.play().catch(() => {
      // If autoplay fails, we can prompt the user to click to enable sound.
      // For now, we'll just log it.
      console.log("Audio autoplay was blocked by the browser.");
    });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <audio ref={audioRef} src="/sounds/birthday-sound.mp3" loop={false} />
      <HeroSection />
      <MemoriesSection />
      <CakeSection />
      <FinaleSection />
    </main>
  );
}

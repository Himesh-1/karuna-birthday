
'use client';
import { GiftBox } from '@/components/gift-box';
import { MainContent } from '@/components/main-content';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // By starting with a "loading" state, we prevent hydration mismatches.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGiftOpen = () => {
    setIsGiftOpened(true);
    // Play sound on a user interaction
    // audioRef.current?.play().catch(console.error);
  };

  if (!isMounted) {
    // Render nothing or a loading spinner on the server and initial client render
    return null; 
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <audio ref={audioRef} src="/sounds/birthday-sound.mp3" loop={false} />
      {!isGiftOpened ? (
        <GiftBox onOpen={handleGiftOpen} />
      ) : (
        <MainContent />
      )}
    </main>
  );
}

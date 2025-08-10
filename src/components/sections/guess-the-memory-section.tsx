"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Eye, RefreshCw } from 'lucide-react';

const memories = [
  { id: 1, src: 'https://placehold.co/600x400.png', alt: 'Friends laughing on a beach', hint: 'friends laughing' },
  { id: 2, src: 'https://placehold.co/400x600.png', alt: 'Smiling person at a birthday party', hint: 'person smiling' },
  { id: 3, src: 'https://placehold.co/600x400.png', alt: 'Group photo on a mountain top', hint: 'group photo' },
  { id: 4, src: 'https://placehold.co/600x400.png', alt: 'A beautiful sunset over the ocean', hint: 'travel landscape' },
  { id: 5, src: 'https://placehold.co/400x600.png', alt: 'People dancing at a celebration', hint: 'celebration party' },
  { id: 6, src: 'https://placehold.co/600x400.png', alt: 'A funny moment with a pet', hint: 'funny moment' },
];

export function GuessTheMemorySection() {
  const [revealed, setRevealed] = useState(false);
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);

  const currentMemory = useMemo(() => memories[currentMemoryIndex], [currentMemoryIndex]);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    setRevealed(false);
    setTimeout(() => {
        setCurrentMemoryIndex((prevIndex) => (prevIndex + 1) % memories.length);
    }, 300); // wait for fade out animation
  };

  return (
    <section id="guess-the-memory" className="w-full bg-transparent py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground/90">
          Guess the Memory!
        </h2>
        <p className="mt-4 font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          Can you guess which amazing moment this is? Click reveal to see!
        </p>

        <Card className="mt-12 w-full max-w-2xl mx-auto shadow-2xl rounded-2xl border-primary/20 overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardContent className="p-4 md:p-6 relative aspect-video flex items-center justify-center">
            <AnimatePresence>
              <motion.div
                key={currentMemory.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <Image
                  src={currentMemory.src}
                  alt={currentMemory.alt}
                  width={600}
                  height={400}
                  className={`w-full h-full object-cover rounded-lg transition-all duration-700 ease-in-out ${revealed ? 'blur-none' : 'blur-2xl scale-110'}`}
                  data-ai-hint={currentMemory.hint}
                />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence>
            {revealed && (
                <motion.div
                    className="absolute inset-0 bg-black/20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <p className="text-white text-xl md:text-2xl font-bold font-body p-4 bg-black/50 rounded-lg">{currentMemory.alt}</p>
                </motion.div>
            )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={handleReveal} disabled={revealed} size="lg" className="rounded-full shadow-lg">
            <Eye className="mr-2" />
            Reveal
          </Button>
          <Button onClick={handleNext} variant="secondary" size="lg" className="rounded-full shadow-lg">
            <RefreshCw className="mr-2" />
            Next Memory
          </Button>
        </div>
      </div>
    </section>
  );
}

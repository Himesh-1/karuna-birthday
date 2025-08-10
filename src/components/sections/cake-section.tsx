
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Confetti } from '../confetti';
import { Fireworks } from '../fireworks';

const CakeLayer = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
  <div className={`relative ${className}`}>
    {children}
  </div>
);

const Candle = ({ left, animationDelay, isOut, flicker }: { left: string, animationDelay: string, isOut: boolean, flicker: boolean }) => (
  <div className="absolute bottom-full flex flex-col items-center" style={{ left, transform: 'translateX(-50%)' }}>
    <AnimatePresence>
      {!isOut && (
        <motion.div
          initial={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0, y: 10, transition: { duration: 0.3 } }}
          animate={{
            scaleY: flicker ? [1, 1.2, 0.9, 1.1, 1] : 1,
            opacity: flicker ? [1, 0.9, 1, 0.85, 1] : 1,
            transition: { duration: 0.15, ease: "easeInOut" }
          }}
          className="w-3 h-5 bg-amber-400 rounded-t-full origin-bottom"
          style={{ 
            animation: flicker ? 'none' : 'flame 1.5s ease-in-out infinite',
            animationDelay, 
            boxShadow: '0 0 10px 2px #fef08a, 0 0 20px 4px #fca5a5' 
          }}
        />
      )}
    </AnimatePresence>
    <div className="w-4 h-16 bg-pink-300 border-2 border-pink-400/50 rounded-t-lg" style={{
        backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.3) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.3) 75%, transparent 75%, transparent)'
    }} />
  </div>
);


const CSSCake = ({ onCakeClick, candlesOut, flicker }: { onCakeClick: () => void, candlesOut: boolean, flicker: boolean }) => (
  <div
    className="relative animate-bobbing cursor-pointer group"
    style={{ animationDelay: '0.5s', width: '350px', height: '350px' }}
    onClick={onCakeClick}
  >
      {/* Top Layer */}
      <CakeLayer className="w-[300px] h-[100px] bg-rose-200 rounded-2xl shadow-lg absolute bottom-[200px] left-1/2 -translate-x-1/2 group-hover:scale-105 transition-transform">
          <div className="absolute -bottom-2 w-[102%] h-8 bg-rose-300/50 rounded-full left-1/2 -translate-x-1/2" />
          <Candle left="30%" animationDelay="0s" isOut={candlesOut} flicker={flicker} />
          <Candle left="50%" animationDelay="0.2s" isOut={candlesOut} flicker={flicker} />
          <Candle left="70%" animationDelay="0.4s" isOut={candlesOut} flicker={flicker} />
      </CakeLayer>
      {/* Middle Layer */}
      <CakeLayer className="w-[350px] h-[120px] bg-purple-300 rounded-2xl shadow-xl absolute bottom-[80px] left-1/2 -translate-x-1/2 group-hover:scale-105 transition-transform">
          <div className="absolute top-0 w-full h-8 bg-white/50 rounded-t-2xl" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%)' }} />
          <div className="absolute -bottom-2 w-[102%] h-8 bg-purple-400/40 rounded-full left-1/2 -translate-x-1/2" />
      </CakeLayer>
      {/* Base Plate */}
      <div className="w-[400px] h-[20px] bg-rose-300/80 rounded-full absolute bottom-[70px] left-1/2 -translate-x-1/2 shadow-2xl" />
      <div className="w-[420px] h-[20px] bg-gray-200 rounded-full absolute bottom-[55px] left-1/2 -translate-x-1/2 shadow-inner" />
  </div>
);


export function CakeSection() {
  const [clickCount, setClickCount] = useState(0);
  const [candlesOut, setCandlesOut] = useState(false);
  const [message, setMessage] = useState('');
  const [flicker, setFlicker] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetGame = () => {
    setClickCount(0);
    setCandlesOut(false);
    setMessage('');
    if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
    }
  };

  const handleCakeClick = () => {
    if (candlesOut) return;

    // Trigger flicker animation
    setFlicker(true);
    setTimeout(() => setFlicker(false), 150);

    // Start timer on first click
    if (clickCount === 0) {
      timerRef.current = setTimeout(() => {
        if (!candlesOut && clickCount < 9) { // Check if not already won
             setMessage('Try harder next time! Click faster to blow out the candles.');
             setClickCount(0);
             timerRef.current = null;
        }
      }, 5000);
    }

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount >= 10) {
      setCandlesOut(true);
      setMessage('You did it! Scroll down for one last surprise... ✨');
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  // Clear message after a delay
  useEffect(() => {
    if (message) {
      const messageTimer = setTimeout(() => {
        if (message.includes('Try harder')) {
          setMessage(''); // Clear "Try harder" message to allow retry
        }
      }, 4000);
      return () => clearTimeout(messageTimer);
    }
  }, [message]);


  return (
    <section id="cake" className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-br from-purple-50 via-rose-50 to-amber-50">
       <AnimatePresence>
        {candlesOut && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 w-full h-full z-20 pointer-events-none">
            <Confetti />
            <Fireworks />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-center z-10">
        <motion.h2 
          className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Have a Slice!
        </motion.h2>
        <motion.p 
          className="mt-4 font-body text-lg text-muted-foreground max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {!candlesOut ? 'Click the cake 10 times in 5 seconds to blow out the candles!' : 'Make a wish!'}
        </motion.p>
      </div>
      
      <div className="relative mt-12 w-full min-h-[400px] flex items-center justify-center z-0">
          <CSSCake onCakeClick={handleCakeClick} candlesOut={candlesOut} flicker={flicker}/>
      </div>

       <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-8 text-center z-10"
                >
                    <p className={`text-xl font-bold font-body ${candlesOut ? 'text-green-600' : 'text-destructive'}`}>{message}</p>
                    {message.includes('Try harder') && (
                         <Button onClick={resetGame} className="mt-4">Try Again</Button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    </section>
  );
}

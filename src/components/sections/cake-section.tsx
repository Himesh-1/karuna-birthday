
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';

const CakeLayer = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
  <div className={`w-[280px] h-[70px] rounded-md relative ${className}`}>
    {children}
  </div>
);

const Candle = ({ left, animationDelay, isOut, flicker }: { left: string, animationDelay: string, isOut: boolean, flicker: boolean }) => (
  <div className="absolute bottom-[65px] flex flex-col items-center" style={{ left }}>
    <AnimatePresence>
      {!isOut && (
        <motion.div
          initial={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0, transition: { duration: 0.3 } }}
          animate={{
            scaleY: flicker ? [1, 0.8, 1.1, 0.9, 1] : 1,
            transition: { duration: 0.2 }
          }}
          className="w-2.5 h-2.5 bg-amber-300 rounded-full animate-flame origin-bottom"
          style={{ animationDelay }}
        />
      )}
    </AnimatePresence>
    <div className="w-3 h-12 bg-pink-300 border-2 border-pink-400/50 rounded-t-sm" />
  </div>
);

const CSSCake = ({ onCakeClick, candlesOut, flicker }) => (
  <div
    className="relative animate-bobbing cursor-pointer"
    style={{ animationDelay: '0.5s' }}
    onClick={onCakeClick}
  >
    <CakeLayer className="bg-rose-200 shadow-lg">
      <Candle left="30%" animationDelay="0s" isOut={candlesOut} flicker={flicker} />
      <Candle left="50%" animationDelay="0.2s" isOut={candlesOut} flicker={flicker} />
      <Candle left="70%" animationDelay="0.4s" isOut={candlesOut} flicker={flicker} />
    </CakeLayer>
    <CakeLayer className="bg-purple-300 top-[-5px] shadow-xl w-[280px] h-[80px]">
        <div className="absolute bottom-0 left-0 w-full h-4 bg-purple-400/30" />
    </CakeLayer>
     <div className="w-[320px] h-[20px] bg-rose-300/80 rounded-lg absolute top-[140px] left-[-20px] shadow-2xl" />
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
    setTimeout(() => setFlicker(false), 200);

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
      setMessage('You did it! Happy Birthday Karuna! 🥳');
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
                    className="mt-8 text-center"
                >
                    <p className={`text-xl font-bold font-body ${candlesOut ? 'text-green-600' : 'text-destructive'}`}>{message}</p>
                    {candlesOut && (
                         <Button onClick={resetGame} className="mt-4">Play Again</Button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    </section>
  );
}

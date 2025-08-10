
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Confetti } from '../confetti';
import { Fireworks } from '../fireworks';

const CakeLayer = ({ className, children, ...props }: { className?: string, children?: React.ReactNode, [key: string]: any }) => (
  <motion.div className={`relative ${className}`} {...props}>
    {children}
  </motion.div>
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
          className="w-2 md:w-3 h-3 md:h-5 bg-amber-400 rounded-t-full origin-bottom"
          style={{ 
            boxShadow: '0 0 10px 2px #fef08a, 0 0 20px 4px #fca5a5',
            animation: !flicker ? 'flame 1.5s ease-in-out infinite' : 'none',
            animationDelay, 
          }}
        />
      )}
    </AnimatePresence>
    <div className="w-3 md:w-4 h-12 md:h-16 bg-pink-300 border-2 border-pink-400/50 rounded-t-lg" style={{
        backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.3) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.3) 75%, transparent 75%, transparent)'
    }} />
  </div>
);


const CSSCake = ({ onCakeClick, candlesOut, flicker }: { onCakeClick: () => void, candlesOut: boolean, flicker: boolean }) => {

    return (
        <div
            className="relative animate-bobbing group flex flex-col items-center justify-end scale-75 md:scale-100"
            style={{ animationDelay: '1.5s', width: '450px', height: '500px' }}
            onClick={onCakeClick}
        >
                {/* Top Layer */}
                <CakeLayer
                    className="w-[280px] h-[100px] bg-rose-200 rounded-t-2xl shadow-lg z-30"
                >
                    <div className="absolute -bottom-2 w-[102%] h-8 bg-rose-300/50 rounded-full left-1/2 -translate-x-1/2" />
                    <Candle left="30%" animationDelay="0s" isOut={candlesOut} flicker={flicker} />
                    <Candle left="50%" animationDelay="0.2s" isOut={candlesOut} flicker={flicker} />
                    <Candle left="70%" animationDelay="0.4s" isOut={candlesOut} flicker={flicker} />
                </CakeLayer>

                 {/* Middle Layer */}
                <CakeLayer
                    className="w-[340px] h-[110px] bg-purple-300 rounded-t-2xl shadow-xl z-20"
                >
                    <div className="absolute top-0 w-full h-8 bg-white/50 rounded-t-2xl" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%)' }} />
                    <div className="absolute -bottom-2 w-[102%] h-8 bg-purple-400/40 rounded-full left-1/2 -translate-x-1/2" />
                </CakeLayer>
                
                {/* Bottom Layer */}
                <CakeLayer
                    className="w-[400px] h-[120px] bg-blue-200 rounded-t-2xl shadow-2xl z-10"
                >
                    <div className="absolute -bottom-2 w-[102%] h-8 bg-blue-300/50 rounded-full left-1/2 -translate-x-1/2" />
                </CakeLayer>

                {/* Base Plate */}
                <CakeLayer
                    className="w-full"
                >
                    <div className="relative w-full h-[30px] flex items-center justify-center pt-2">
                        <div className="w-[450px] h-[25px] bg-gray-200 rounded-full shadow-inner" />
                        <div className="w-[420px] h-[20px] bg-rose-300/80 rounded-full absolute bottom-0 shadow-2xl" />
                    </div>
                </CakeLayer>
        </div>
    );
};


export function CakeSection() {
  const [clickCount, setClickCount] = useState(0);
  const [candlesOut, setCandlesOut] = useState(false);
  const [message, setMessage] = useState('');
  const [flicker, setFlicker] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    if (candlesOut || !isMounted) return;

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
    if (!isMounted) return;
    if (message) {
      const messageTimer = setTimeout(() => {
        if (message.includes('Try harder')) {
          setMessage(''); // Clear "Try harder" message to allow retry
        }
      }, 4000);
      return () => clearTimeout(messageTimer);
    }
  }, [message, isMounted]);


  return (
    <section id="cake" className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden bg-transparent">
       <AnimatePresence>
        {candlesOut && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 w-full h-full z-40 pointer-events-none">
            <Confetti />
            <Fireworks />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-center z-10">
        <motion.h2 
          className="font-headline text-4xl md:text-7xl font-bold text-primary-foreground/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Have a Slice!
        </motion.h2>
        <motion.p 
          className="mt-4 font-body text-md md:text-lg text-muted-foreground max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {!candlesOut ? 'Click the cake 10 times in 5 seconds to blow out the candles!' : 'Make a wish!'}
        </motion.p>
      </div>
      
      <div className="relative mt-4 md:mt-12 w-full flex items-center justify-center z-0">
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.5, margin: "100px" }}
          >
            {isMounted && <CSSCake onCakeClick={handleCakeClick} candlesOut={candlesOut} flicker={flicker}/>}
          </motion.div>
      </div>

       <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-8 text-center z-10"
                >
                    <p className={`text-xl md:text-3xl font-bold font-body ${candlesOut ? 'text-green-600' : 'text-destructive'}`}>{message}</p>
                    {message.includes('Try harder') && (
                         <Button onClick={resetGame} className="mt-4">Try Again</Button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    </section>
  );
}

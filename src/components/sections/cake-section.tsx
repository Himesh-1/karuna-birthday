
"use client";

import React from 'react';
import { motion } from 'framer-motion';

const CakeLayer = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
  <div className={`w-[280px] h-[70px] rounded-md relative ${className}`}>
    {children}
  </div>
);

const Candle = ({ left, animationDelay }: { left: string, animationDelay: string }) => (
  <div className="absolute bottom-[65px] flex flex-col items-center" style={{ left }}>
    <div className="w-2.5 h-2.5 bg-amber-300 rounded-full animate-flame" style={{ animationDelay }} />
    <div className="w-3 h-12 bg-pink-300 border-2 border-pink-400/50 rounded-t-sm" />
  </div>
);

const CSSCake = () => (
  <div className="relative animate-bobbing" style={{ animationDelay: '0.5s' }}>
    <CakeLayer className="bg-rose-200 shadow-lg">
      <Candle left="30%" animationDelay="0s" />
      <Candle left="50%" animationDelay="0.2s" />
      <Candle left="70%" animationDelay="0.4s" />
    </CakeLayer>
    <CakeLayer className="bg-purple-300 top-[-5px] shadow-xl w-[280px] h-[80px]">
        <div className="absolute bottom-0 left-0 w-full h-4 bg-purple-400/30" />
    </CakeLayer>
     <div className="w-[320px] h-[20px] bg-rose-300/80 rounded-lg absolute top-[140px] left-[-20px] shadow-2xl" />
  </div>
);


export function CakeSection() {
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
          Here's a little something sweet to celebrate your special day. Make a wish!
        </motion.p>
      </div>
      
      <div className="relative mt-12 w-full min-h-[400px] flex items-center justify-center z-0">
          <CSSCake />
      </div>
    </section>
  );
}

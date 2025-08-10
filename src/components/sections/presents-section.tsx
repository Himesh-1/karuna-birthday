
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Present = ({ color, ribbonColor, onClick }: { color: string, ribbonColor: string, onClick: () => void }) => {
  return (
    <div 
      className="relative cursor-pointer group animate-bobbing scale-75 md:scale-100 border-4 border-primary-foreground/30 rounded-lg"
      style={{ width: '150px', height: '150px' }}
      onClick={onClick}
    >
      {/* Lid */}
      <div
        className="absolute w-[160px] h-[40px] rounded-md transition-transform duration-300 group-hover:-translate-y-1 border-4 border-primary-foreground/20"
        style={{ top: '0', left: '-5px', zIndex: 20, backgroundColor: ribbonColor }}
      ></div>
      {/* Box */}
      <div className="absolute w-[150px] h-[150px] rounded-lg" style={{ top: '30px', left: '0', backgroundColor: color }}></div>
      {/* Ribbon Vertical */}
      <div className="absolute w-[25px] h-[180px]" style={{ top: '0', left: '62.5px', zIndex: 30, backgroundColor: ribbonColor }}></div>
       {/* Bow */}
      <div
        className="absolute transition-transform duration-300 group-hover:scale-110"
        style={{ top: '-20px', left: '50%', transform: 'translateX(-50%)', zIndex: 40 }}
      >
        <div className="absolute w-[25px] h-[40px] rounded-full -rotate-45" style={{left: '-22px', backgroundColor: ribbonColor}}></div>
        <div className="absolute w-[25px] h-[40px] rounded-full rotate-45" style={{left: '2px', backgroundColor: ribbonColor}}></div>
      </div>
    </div>
  );
};

export function PresentsSection() {
  const [clickCount, setClickCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    if (showMessage) return;

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount >= 5) {
      setShowMessage(true);
    }
  };

  const presents = [
    { color: 'hsl(var(--primary))', ribbonColor: 'hsl(var(--secondary))' },
    { color: 'hsl(var(--secondary))', ribbonColor: 'hsl(var(--accent))' },
    { color: 'hsl(var(--accent))', ribbonColor: 'hsl(var(--primary))' },
    { color: 'hsl(var(--muted))', ribbonColor: 'hsl(var(--primary))' },
  ];

  return (
    <section id="presents" className="w-full bg-transparent py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-7xl font-bold text-primary-foreground/90">
          One Last Thing...
        </h2>
        <p className="font-body text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Click on the presents a few times!
        </p>
        
        <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 place-items-center gap-y-16 md:gap-8">
          {presents.map((p, i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
             >
                <Present color={p.color} ribbonColor={p.ribbonColor} onClick={handleClick} />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-16 text-center z-10"
            >
              <p className="text-xl md:text-3xl font-bold font-headline text-primary">
                Some surprises are best kept as surprises...
              </p>
              <p className="mt-2 text-lg md:text-2xl font-body text-muted-foreground">
                See you soon! ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export function CalendarSection() {
  const [isDateClicked, setIsDateClicked] = useState(false);

  // August 2025: First day is a Friday. 31 days.
  const calendarDays = [
    ...Array(4).fill(null), // Empty days for Mon-Thu
    ...Array.from({ length: 31 }, (_, i) => i + 1), // Days 1-31
  ];

  const handleDayClick = (day: number | null) => {
    if (day === 11) {
      setIsDateClicked(true);
    }
  };

  return (
    <section id="calendar" className="w-full bg-transparent py-24 px-4 md:px-8 flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground/90">
          A Date to Remember
        </h2>
        <AnimatePresence mode="wait">
          {!isDateClicked && (
            <motion.p
              key="initial-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 font-body text-lg text-muted-foreground"
            >
              A very important day is coming up... can you spot it?<br/>
              Click on it !!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="w-full max-w-6xl mx-auto flex items-center justify-center gap-8 md:gap-16">
        <motion.div
          className="w-full md:w-1/2"
          animate={{ x: isDateClicked ? '-45%' : 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="w-full max-w-md p-6 md:p-8 bg-white/50 backdrop-blur-sm shadow-2xl rounded-2xl border-primary/20 mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            layout
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-3xl text-primary font-bold">August 2025</h3>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center font-body">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="font-bold text-muted-foreground">{day}</div>
              ))}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  onClick={() => handleDayClick(day)}
                  className={`relative flex items-center justify-center p-2 h-16 rounded-lg transition-all duration-300 ease-in-out
                    ${day ? 'bg-card/40 hover:bg-primary/20' : 'bg-transparent'}
                    ${day === 11 ? 'cursor-pointer !bg-accent/80 text-accent-foreground font-bold group animate-zoom-in-out' : ''}
                  `}
                >
                  {day}
                  {day === 11 && !isDateClicked && (
                    <Heart className="absolute w-6 h-6 text-white/80 transition-transform duration-500 group-hover:scale-125" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isDateClicked && (
            <motion.div
              className="w-1/2 text-left absolute right-0"
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: 0,
                transition: { delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] } 
              }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
            >
              <p className="text-4xl md:text-6xl font-bold font-headline text-primary animate-wiggle">
                Congratulations you are one year older now yayy! 🎉
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

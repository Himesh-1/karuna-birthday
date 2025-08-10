"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export function CalendarSection() {
  const [showMessage, setShowMessage] = useState(false);

  // August 2025: First day is a Friday. 31 days.
  const calendarDays = [
    ...Array(4).fill(null), // Empty days for Mon-Thu
    ...Array.from({ length: 31 }, (_, i) => i + 1), // Days 1-31
  ];

  const handleDayClick = (day: number | null) => {
    if (day === 11) {
      setShowMessage(true);
    }
  };

  return (
    <section id="calendar" className="w-full bg-transparent py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground/90">
          A Date to Remember
        </h2>
        <p className="mt-4 font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          A very important day is coming up... can you spot it?
        </p>
      </div>

      <motion.div 
        className="mt-12 max-w-2xl mx-auto p-6 md:p-8 bg-white/50 backdrop-blur-sm shadow-2xl rounded-2xl border-primary/20"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
              {day === 11 && (
                <Heart className="absolute w-6 h-6 text-white/80 transition-transform duration-500 group-hover:scale-125" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 text-center"
          >
            <p className="text-2xl font-bold font-headline text-primary">
              Congratulations you are one year older now yayy! 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { Confetti } from '@/components/confetti';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden bg-gradient-to-b from-background via-primary/10 to-background">
      <Confetti />
      <div className="z-10">
        <motion.h1 
          className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span whileHover={{ scale: 1.1, rotate: -2, color: 'hsl(var(--secondary))' }} className="text-primary/80 inline-block">Happy</motion.span> <motion.span whileHover={{ scale: 1.1, rotate: 2,  color: 'hsl(var(--accent))' }} className="text-primary inline-block">Birthday,</motion.span>
        </motion.h1>
        <motion.p 
            className="font-headline text-7xl md:text-9xl lg:text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-pulse"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 100 }}
        >
          Karuna!
        </motion.p>
        <motion.p 
            className="mt-4 font-body text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
        >
          Your special day is here! Let's celebrate you.
        </motion.p>
      </div>
      <div className="absolute bottom-10 z-10 animate-bounce">
        <Button variant="ghost" asChild>
            <a href="#memories">
                Scroll for memories
                <ArrowDown className="ml-2 h-4 w-4" />
            </a>
        </Button>
      </div>
    </section>
  );
}

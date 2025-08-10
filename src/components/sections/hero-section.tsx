import { Confetti } from '@/components/confetti';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      <Confetti />
      <div className="z-10">
        <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
          <span className="text-primary/80">Happy</span> <span className="text-primary">Birthday,</span>
        </h1>
        <p className="font-headline text-7xl md:text-9xl lg:text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-pulse">
          Karuna!
        </p>
        <p className="mt-4 font-body text-lg text-muted-foreground">
          Your special day is here! Let's celebrate you.
        </p>
      </div>
      <div className="absolute bottom-10 z-10">
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

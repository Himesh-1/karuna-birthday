import { Confetti } from '@/components/confetti';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export function FinaleSection() {
  return (
    <section id="finale" className="relative w-full h-screen flex flex-col items-center justify-center text-center p-4 bg-transparent">
      <Confetti />
      <div className="max-w-3xl mx-auto">
        <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary">
          Wishing You The Best!
        </h2>
        <p className="mt-6 font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
          May your year ahead be filled with as much joy, laughter, and love as you bring to everyone around you. Thank you for being such an amazing friend.
        </p>
        <p className="mt-4 font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
          Cheers to you, Karuna!
        </p>
      </div>
      <div className="absolute bottom-10">
        <Button variant="ghost" asChild>
          <a href="#hero">
            <ArrowUp className="mr-2 h-4 w-4" />
            Back to Top
          </a>
        </Button>
      </div>
    </section>
  );
}

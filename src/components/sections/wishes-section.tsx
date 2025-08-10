"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const wishes = [
  {
    name: 'Aisha',
    message: 'Happy Birthday, Karuna! Hope you have a day that\'s as amazing as you are. 🎉',
  },
  {
    name: 'Ben',
    message: 'Cheers to another trip around the sun! Wishing you the best day ever.',
  },
  {
    name: 'Chloe',
    message: 'Happy Birthday! May your cake be as sweet as you and your day be full of joy.',
  },
  {
    name: 'David',
    message: 'Sending you the biggest birthday hugs! Hope it\'s a fantastic one.',
  },
];

export function WishesSection() {
  return (
    <section id="wishes" className="w-full bg-background py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground/90">
            Birthday Wishes
          </h2>
          <p className="mt-4 font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            A few words from friends to celebrate your special day!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {wishes.map((wish, index) => (
            <Card key={index} className="bg-primary/5 border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                <p className="font-body text-muted-foreground italic mb-4">"{wish.message}"</p>
                <p className="font-headline text-right text-primary font-bold">- {wish.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

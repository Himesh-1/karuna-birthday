import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const memories = [
  { id: 1, src: 'https://placehold.co/600x400.png', alt: 'A fun memory', hint: 'friends laughing' },
  { id: 2, src: 'https://placehold.co/400x600.png', alt: 'A fun memory', hint: 'person smiling' },
  { id: 3, src: 'https://placehold.co/600x400.png', alt: 'A fun memory', hint: 'group photo' },
  { id: 4, src: 'https://placehold.co/600x400.png', alt: 'A fun memory', hint: 'travel landscape' },
  { id: 5, src: 'https://placehold.co/400x600.png', alt: 'A fun memory', hint: 'celebration party' },
  { id: 6, src: 'https://placehold.co/600x400.png', alt: 'A fun memory', hint: 'funny moment' },
];

export function MemoriesSection() {
  return (
    <section id="memories" className="w-full bg-background py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground/90">
            A Walk Down Memory Lane
          </h2>
          <p className="mt-4 font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Remember all the good times? Here are just a few highlights from our adventures together.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memory) => (
            <Card key={memory.id} className="overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:shadow-primary/20">
              <CardContent className="p-0">
                <Image
                  src={memory.src}
                  alt={memory.alt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  data-ai-hint={memory.hint}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

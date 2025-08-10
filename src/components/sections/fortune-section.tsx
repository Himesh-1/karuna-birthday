
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Star, Moon, Sun, Mail } from 'lucide-react';

const fortunes = [
  {
    id: 'week',
    title: 'Next Week',
    icon: Star,
    fortune: 'Things finally start feeling smoother—talks go well, people understand you better, and you’ll feel more like yourself. Love and friendships bring warmth. Just be careful with quick money decisions.',
    color: 'from-pink-400/20 to-purple-400/20',
  },
  {
    id: 'month',
    title: 'Next Month',
    icon: Moon,
    fortune: 'Time to slow down a bit and focus on yourself—build good habits, set clear goals, and take care of your health. Some unexpected changes at work or studies could actually turn out to be great for you.',
    color: 'from-blue-400/20 to-teal-400/20',
  },
  {
    id: 'year',
    title: 'Next Year',
    icon: Sun,
    fortune: 'This year will help you grow into a stronger, wiser you. Relationships may change for the better, your career can move forward if you take smart chances, and new learning opportunities will light up your path. Take care of your health and energy, and you’ll shine all the way.',
    color: 'from-yellow-400/20 to-orange-400/20',
  },
   {
    id: 'personal',
    title: 'Personal Message for You',
    icon: Mail,
    fortune: 'You’re stepping into a time where life will start making more sense, and the pieces will begin to fall into place. Your kindness, courage, and passion are your superpowers—don’t hold them back. Trust that every twist in the road is leading you to something better. You’ve got everything it takes to turn this year into one of your best chapters yet.',
    color: 'from-rose-400/20 to-red-400/20',
  },
];

const FortuneCard = ({ item, index }) => {
    if (item.id === 'personal') {
        return (
            <motion.div
                className="fortune-card h-full w-full"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
            >
                <Card className={`relative h-full rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br ${item.color} border-primary/10 backdrop-blur-md`}>
                    <div className="flex flex-col md:flex-row items-center p-6 md:p-8 gap-6 md:gap-8">
                        <div className="flex-shrink-0 flex flex-col items-center text-center md:w-1/4">
                             <div className="p-4 bg-white/20 rounded-full mb-4 border border-white/30">
                                <item.icon className="w-10 h-10 text-white" />
                            </div>
                            <CardTitle className="font-headline text-3xl text-primary-foreground/90">{item.title}</CardTitle>
                        </div>
                        <div className="md:w-3/4">
                            <p className="font-body text-center md:text-left text-muted-foreground text-lg leading-relaxed">
                            "{item.fortune}"
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="fortune-card h-full"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -10, scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
        >
            <Card className={`relative h-full rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br ${item.color} border-primary/10 backdrop-blur-md`}>
            <CardHeader className="text-center items-center pb-4">
                <div className="p-4 bg-white/20 rounded-full mb-4 border border-white/30">
                    <item.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-headline text-3xl text-primary-foreground/90">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-body text-center text-muted-foreground text-lg leading-relaxed">
                "{item.fortune}"
                </p>
            </CardContent>
            </Card>
        </motion.div>
    )
};

export function FortuneSection() {
  const topFortunes = fortunes.slice(0, 3);
  const bottomFortune = fortunes[3];

  return (
    <section id="fortune" className="w-full bg-transparent py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground/90">
            A Glimpse Into Your Future
          </h2>
          <p className="mt-4 font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            The stars have aligned to offer a peek at the wonderful things coming your way.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {topFortunes.map((item, index) => (
            <FortuneCard key={item.id} item={item} index={index} />
          ))}
        </div>
        
        <div className="mt-8 md:mt-12 flex justify-center">
             <FortuneCard item={bottomFortune} index={3} />
        </div>
      </div>
    </section>
  );
}

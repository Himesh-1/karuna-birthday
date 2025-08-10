
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Star, Moon, Sun } from 'lucide-react';

const fortunes = [
  {
    title: 'Next Week',
    icon: Star,
    fortune: 'An unexpected message will bring a delightful surprise. Keep an eye on your inbox! Your creativity will be sparkling, so it\'s a great time to start a small project.',
    color: 'from-pink-400/20 to-purple-400/20',
  },
  {
    title: 'Next Month',
    icon: Moon,
    fortune: 'Adventure is calling! A spontaneous trip or a new local discovery is on the horizon. Embrace the unknown and you\'ll create some of your best memories yet.',
    color: 'from-blue-400/20 to-teal-400/20',
  },
  {
    title: 'Next Year',
    icon: Sun,
    fortune: 'This is your year to shine. A major personal goal is within reach. Your hard work will pay off in ways you can\'t even imagine. Prepare for a year of growth, joy, and success!',
    color: 'from-yellow-400/20 to-orange-400/20',
  },
];

export function FortuneSection() {
  return (
    <section id="fortune" className="w-full bg-transparent py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground/90">
            A Glimpse Into Your Future
          </h2>
          <p className="mt-4 font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            The stars have aligned to offer a peek at the wonderful things coming your way.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {fortunes.map((item, index) => (
            <motion.div
              key={index}
              className="fortune-card"
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
          ))}
        </div>
      </div>
    </section>
  );
}

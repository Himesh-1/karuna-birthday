
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const wishes = [
  {
    name: 'Ishita',
    message: 'Happy birthday to the chaos in my calm… You crashed into my life like a beautiful storm and somehow made it better. Thanks for putting up with my endless rants, my repeat stories,and always reassuring me in your own way.',
  },
  {
    name: 'Samta',
    message: 'Happy Birthday to the one I share endless, uncontrollable laughs with  you are sweet, kind, and yes… pretty too😅🫠🫶 You\’ll always have a special place in my heart Happy Birthday Kajal🫂❤ I wish you get everything your heart desires and may you always stay happy🌟',
  },
  {
    name: 'Bhoomi',
    message: 'My dear roomie kajal , wishing you a very very happiest birthday ! 🎉 I hope this year turns out to be amazing for you . I really miss you yarr and I love you so much .you are very close to my heart ❤. You know, when I was coming to Jaipur , I kept wondering what kind of roomate I would get . But God gave me such an amazing roomate like you . Watching movies with you , making funny videos , eating from the same plate and teasing each other these have been the best experience of my life . You are such an awesome 😎 and cool friend yarr . Even though we are not living together now but our friendship will always remain strong .I hope tere jaise roomate sabko mile.Thanku for being my confident and biggest supporter . I cherish every moment with you',
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, rotate: 5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: (i % 2 === 0 ? -2 : 2) + (Math.random() - 0.5) * 2, // Add slight random rotation
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.25, 1, 0.5, 1]
    }
  })
}

export function WishesSection() {
  return (
    <section id="wishes" className="w-full bg-transparent py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-4xl md:text-7xl font-bold text-primary-foreground/90">
            Birthday Wishes
          </h2>
          <p className="mt-4 font-body text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A few words from friends to celebrate your special day!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishes.map((wish, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 10, transition: { type: "spring", stiffness: 300 } }}
            >
              <Card className="bg-card/60 border-primary/20 shadow-xl h-full backdrop-blur-md rounded-2xl">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/30 mb-4" />
                  <p className="font-body text-lg text-muted-foreground italic mb-6 flex-grow">"{wish.message}"</p>
                  <p className="font-headline text-right text-primary font-bold text-lg md:text-xl">- {wish.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

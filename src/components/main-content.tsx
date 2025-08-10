"use client";

import { HeroSection } from '@/components/sections/hero-section';
import { MemoriesSection } from '@/components/sections/memories-section';
import { CakeSection } from '@/components/sections/cake-section';
import { WishesSection } from '@/components/sections/wishes-section';
import { FinaleSection } from '@/components/sections/finale-section';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from 'framer-motion';
import { GuessTheMemorySection } from './sections/guess-the-memory-section';

gsap.registerPlugin(ScrollTrigger);

export function MainContent() {
    useEffect(() => {
        const sections = gsap.utils.toArray('section');
        sections.forEach((section: any) => {
            gsap.fromTo(section, 
                { autoAlpha: 0, y: 50 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });

        // Fun animations for specific elements
        gsap.from(".memory-card", {
            scrollTrigger: {
                trigger: "#memories",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out'
        });
        
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
        >
            <HeroSection />
            <MemoriesSection />
            <GuessTheMemorySection />
            <CakeSection />
            <WishesSection />
            <FinaleSection />
            <div className="fixed bottom-5 right-5 z-50 animate-bounce">
                <Button variant="ghost" size="icon" asChild className="bg-background/50 rounded-full hover:bg-primary/20">
                    <a href="#memories">
                        <ArrowDown className="h-5 w-5 text-primary" />
                    </a>
                </Button>
            </div>
        </motion.div>
    );
}

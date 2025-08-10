
"use client";

import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Skeleton } from './ui/skeleton';

const SectionLoader = () => <div className="w-full h-screen flex items-center justify-center"><Skeleton className="h-20 w-20 rounded-full" /></div>;

const HeroSection = dynamic(() => import('@/components/sections/hero-section').then(mod => mod.HeroSection), { ssr: false, loading: SectionLoader });
const FortuneSection = dynamic(() => import('@/components/sections/fortune-section').then(mod => mod.FortuneSection), { ssr: false, loading: SectionLoader });
const CalendarSection = dynamic(() => import('@/components/sections/calendar-section').then(mod => mod.CalendarSection), { ssr: false, loading: SectionLoader });
const CakeSection = dynamic(() => import('@/components/sections/cake-section').then(mod => mod.CakeSection), { ssr: false, loading: SectionLoader });
const WishesSection = dynamic(() => import('@/components/sections/wishes-section').then(mod => mod.WishesSection), { ssr: false, loading: SectionLoader });
const PresentsSection = dynamic(() => import('./sections/presents-section').then(mod => mod.PresentsSection), { ssr: false, loading: SectionLoader });
const FinaleSection = dynamic(() => import('@/components/sections/finale-section').then(mod => mod.FinaleSection), { ssr: false, loading: SectionLoader });


export function MainContent() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        // We need to wait for the dynamic components to load before running GSAP
        const timer = setTimeout(() => {
            const sections = gsap.utils.toArray('section');
            if (sections.length > 0) {
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
            }
        }, 100); // A small delay to ensure components are in the DOM

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
        >
            <HeroSection />
            <FortuneSection />
            <CalendarSection />
            <CakeSection />
            <WishesSection />
            <PresentsSection />
            <FinaleSection />
            <div className="fixed bottom-5 right-5 z-50 animate-bounce">
                <Button variant="ghost" size="icon" asChild className="bg-background/50 rounded-full hover:bg-primary/20">
                    <a href="#fortune">
                        <ArrowDown className="h-5 w-5 text-primary" />
                    </a>
                </Button>
            </div>
        </motion.div>
    );
}

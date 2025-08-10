"use client";

import { HeroSection } from '@/components/sections/hero-section';
import { MemoriesSection } from '@/components/sections/memories-section';
import { CakeSection } from '@/components/sections/cake-section';
import { WishesSection } from '@/components/sections/wishes-section';
import { FinaleSection } from '@/components/sections/finale-section';
import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

export function MainContent() {
    return (
        <>
            <HeroSection />
            <MemoriesSection />
            <CakeSection />
            <WishesSection />
            <FinaleSection />
            <div className="fixed bottom-5 right-5 z-50">
                <Button variant="ghost" asChild className="bg-background/50 rounded-full">
                    <a href="#memories">
                        <ArrowDown className="h-4 w-4" />
                    </a>
                </Button>
            </div>
        </>
    );
}


"use client";

import dynamic from 'next/dynamic';
import React from 'react';
import { Skeleton } from './ui/skeleton';

const createDynamicComponent = (loader: () => Promise<any>, height: string = '100vh') => {
  return dynamic(loader, {
    ssr: false,
    loading: () => <div className="w-full flex items-center justify-center" style={{ height }}><Skeleton className="h-20 w-20 rounded-full" /></div>,
  });
};

export const DynamicBalloons = createDynamicComponent(() => import('./balloons').then(mod => mod.Balloons));
export const DynamicGiftBox = createDynamicComponent(() => import('./gift-box').then(mod => mod.GiftBox));
export const DynamicMainContent = createDynamicComponent(() => import('./main-content').then(mod => mod.MainContent));

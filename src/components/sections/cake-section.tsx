"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { CakeModel } from '@/components/cake-model';
import { motion } from 'framer-motion';

export function CakeSection() {
  return (
    <section id="cake" className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-br from-purple-50 via-rose-50 to-amber-50">
      <div className="text-center z-10">
        <motion.h2 
          className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Have a Slice!
        </motion.h2>
        <motion.p 
          className="mt-4 font-body text-lg text-muted-foreground max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Here's a little something sweet to celebrate your special day. Make a wish!
        </motion.p>
      </div>
      
      <div className="relative mt-2 w-full h-[400px] md:h-[500px] flex items-center justify-center z-0 animate-zoom-in-out">
        <Canvas camera={{ fov: 45, position: [0, 2, 8] }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <CakeModel />
            </Stage>
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
    </section>
  );
}

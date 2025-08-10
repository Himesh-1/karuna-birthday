"use client";

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CakeModel(props: any) {
  const { scene } = useGLTF('/assets/models/cake.glb');
  const modelRef = useRef<THREE.Group>();

  // Optional: Add a bobbing animation
  useFrame((state) => {
    if (modelRef.current) {
        const time = state.clock.getElapsedTime();
        modelRef.current.position.y = Math.sin(time * 1.5) * 0.05;
    }
  });

  return <primitive object={scene} ref={modelRef} {...props} />;
}

// Preload the model for better performance
useGLTF.preload('/assets/models/cake.glb');

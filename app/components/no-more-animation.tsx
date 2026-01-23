"use client"

import React from 'react';
// import Lottie from 'lottie-react';
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});
import data from '../utils/duck4.json';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const NoMoreAnimation = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="w-48 h-48 pt-8 m-auto">
      <Lottie
        animationData={data}
        loop={!prefersReducedMotion}
      />
    </div>
  );
};

export default NoMoreAnimation;

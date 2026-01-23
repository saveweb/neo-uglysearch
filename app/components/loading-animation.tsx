"use client"

import React from 'react';
import dynamic from 'next/dynamic'
import type { LottieRefCurrentProps } from 'lottie-react';
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});
import data from '../utils/duck1.json';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const LoadingAnimation = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lottieRef = React.useRef<LottieRefCurrentProps | null>(null);
  React.useEffect(() => {
    if (prefersReducedMotion && lottieRef.current) {
      lottieRef.current.stop();
    } else if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, [prefersReducedMotion]);

  return (
    <div className="w-48 h-48 pt-8 m-auto">
      <Lottie
        lottieRef={lottieRef}
        animationData={data}
        loop={!prefersReducedMotion}
      />
    </div>
  );
};

export default LoadingAnimation;

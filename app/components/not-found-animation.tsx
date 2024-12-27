"use client"

import React from 'react';
// import Lottie from 'lottie-react';
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});
import data from '../utils/duck2.json';

const NotFoundAnimation = () => {
  return (
    <div className="w-48 h-48 pt-8 m-auto">
      <Lottie
        animationData={data}
        loop={true}
      />
    </div>
  );
};

export default NotFoundAnimation;


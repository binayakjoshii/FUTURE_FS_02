
import React from 'react';

const SunAnimation = () => {
  return (
    <div className="fixed top-10 right-10 pointer-events-none">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-yellow-400 rounded-full animate-sun-rays" />
      </div>
    </div>
  );
};

export default SunAnimation;

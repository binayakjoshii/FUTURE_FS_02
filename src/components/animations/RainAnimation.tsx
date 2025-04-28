
import React from 'react';

const RainAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute h-8 w-[1px] bg-white/30 rounded-full animate-rain"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.8 + Math.random() * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default RainAnimation;

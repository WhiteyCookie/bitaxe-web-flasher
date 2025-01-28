'use client'

import React, { useState, useEffect } from 'react'

export const SakuraPattern = () => {
  const [config, setConfig] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    petalCount: 35,
    colors: {
      // Traditional Japanese colors
      indigo: '#223A70',     // Ai-iro (藍色) - Deep indigo blue
      vermillion: '#D05A45', // Shu-iro (朱色) - Vermillion red
      evergreen: '#2B614E',  // Tokiwa-iro (常盤色) - Evergreen
      leafBrown: '#91683C',  // Kuchi-ba (朽葉) - Fallen leaf brown
      navy: '#223A70',       // Kon-iro (紺色) - Deep navy
      ink: '#1C1C1C',        // Sumi-iro (墨色) - Ink black
      background: '#F6F5F0'  // Slightly warm off-white
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateConfig = () => {
      setConfig(prev => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight
      }));
    };

    updateConfig();
    window.addEventListener('resize', updateConfig);
    return () => window.removeEventListener('resize', updateConfig);
  }, []);

  const generatePetals = () => {
    const { width, height, petalCount, colors } = config;
    const petals = [];
    const colorArray = [
      colors.indigo,
      colors.vermillion,
      colors.evergreen,
      colors.leafBrown,
      colors.navy
    ];

    for (let i = 0; i < petalCount; i++) {
      const startX = Math.random() * width;
      const startY = Math.random() * height - height;
      const scale = 0.3 + Math.random() * 0.4;
      const opacity = 0.2 + Math.random() * 0.3;
      const duration = 20 + Math.random() * 30;
      const delay = -Math.random() * 40;
      const swayAmount = 100 + Math.random() * 150;
      
      // Select a random color from our array
      const color = colorArray[Math.floor(Math.random() * colorArray.length)];

      petals.push(
        <g
          key={`petal-${i}`}
          style={{
            animation: `fall-${i} ${duration}s linear ${delay}s infinite`,
            opacity: opacity,
          }}
          transform={`translate(${startX}, ${startY}) scale(${scale})`}
        >
          <path
            d="M0,0 C3,-8 8,-10 12,-5 C15,0 12,5 0,10 C-12,5 -15,0 -12,-5 C-8,-10 -3,-8 0,0"
            fill={color}
            style={{
              animation: `rotate ${duration * 2}s ease-in-out ${delay}s infinite`,
              transformOrigin: 'center',
              filter: 'drop-shadow(0 0 3px rgba(28,28,28,0.1))'
            }}
          />
          <style>
            {`
              @keyframes fall-${i} {
                0% {
                  transform: translate(0, 0) rotate(${Math.random() * 360}deg);
                }
                33% {
                  transform: translate(${Math.sin(i) * swayAmount}px, ${height * 0.33}px) rotate(${Math.random() * 360}deg);
                }
                66% {
                  transform: translate(${-Math.sin(i) * swayAmount}px, ${height * 0.66}px) rotate(${Math.random() * 360}deg);
                }
                100% {
                  transform: translate(${Math.cos(i) * swayAmount}px, ${height + 100}px) rotate(${Math.random() * 360}deg);
                }
              }
            `}
          </style>
        </g>
      );
    }

    return petals;
  };

  return (
    <svg 
      width="100%"
      height="100%"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(246, 245, 240, 0.5)' // Add alpha value here
      }}
    >
      <defs>
        <style>
          {`
            @keyframes rotate {
              0%, 100% {
                transform: rotate(-20deg);
              }
              50% {
                transform: rotate(20deg);
              }
            }
          `}
        </style>
      </defs>
      {generatePetals()}
    </svg>
  );
};

export default SakuraPattern;

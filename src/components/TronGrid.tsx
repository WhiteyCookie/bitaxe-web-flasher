'use client'

import React, { useState, useEffect } from 'react'

export const TronGrid = () => {
  const [gridConfig, setGridConfig] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    gridSize: 80,
    primaryColor: '#FF1493',
    secondaryColor: '#00FFD1'
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateGridConfig = () => {
      setGridConfig(prev => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight
      }));
    };

    updateGridConfig();
    window.addEventListener('resize', updateGridConfig);
    return () => window.removeEventListener('resize', updateGridConfig);
  }, []);

  const generateGridLines = () => {
    const { width, height, gridSize, primaryColor, secondaryColor } = gridConfig;
    const lines = [];

    // Generate vertical lines for entire viewport
    for (let x = 0; x <= width; x += gridSize) {
      lines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke={primaryColor}
          strokeWidth="1"
          strokeOpacity="0.3"
        />
      );
    }

    // Generate horizontal lines for entire viewport
    for (let y = 0; y <= height; y += gridSize) {
      lines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke={secondaryColor}
          strokeWidth="1"
          strokeOpacity="0.3"
        />
      );
    }

    return lines;
  };

  return (
    <svg 
      width="100%"
      height="100%"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}
    >
      <defs>
        <style>{`
          @keyframes grid-pulse {
            0% { stroke-opacity: 0.2; }
            100% { stroke-opacity: 0.4; }
          }
        `}</style>
      </defs>
      {generateGridLines()}
    </svg>
  );
};

export default TronGrid;

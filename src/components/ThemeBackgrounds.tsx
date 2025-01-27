'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

const TronGrid = () => {
  const [gridConfig, setGridConfig] = useState({
    width: 0,
    height: 0,
    gridSize: 40,
    primaryColor: '#FF1493',  // Deep pink
    secondaryColor: '#00FFD1' // Bright cyan
  });

  useEffect(() => {
    // Ensure this runs client-side
    if (typeof window === 'undefined') return;

    // Update grid configuration on mount and resize
    const updateGridConfig = () => {
      setGridConfig(prev => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight
      }));
    };

    // Initial setup
    updateGridConfig();

    // Add resize listener
    window.addEventListener('resize', updateGridConfig);

    // Cleanup
    return () => window.removeEventListener('resize', updateGridConfig);
  }, []);

  // Generate grid lines
  const generateGridLines = () => {
    const { width, height, gridSize, primaryColor, secondaryColor } = gridConfig;
    const lines = [];

    // Calculate safe zone (expanded to match content area)
    const safeZone = {
      x: width * 0.15,  // Expanded from 0.25
      y: height * 0.1,  // Slightly adjusted
      width: width * 0.7,  // Expanded from 0.5
      height: height * 0.8  // Expanded from 0.6
    };

    // Create grid around safe zone
    const gridStart = {
      x: safeZone.x - gridSize * 3,
      y: safeZone.y - gridSize * 3
    };
    const gridEnd = {
      x: safeZone.x + safeZone.width + gridSize * 3,
      y: safeZone.y + safeZone.height + gridSize * 3
    };

    // Vertical lines
    for (let x = gridStart.x; x <= gridEnd.x; x += gridSize) {
      lines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={gridStart.y}
          x2={x}
          y2={gridEnd.y}
          stroke={`url(#verticalGradient)`}
          strokeWidth="1.5"
          style={{
            filter: `drop-shadow(0 0 5px ${primaryColor})`,
            animation: `pulse-v-${x} 3s infinite alternate`
          }}
        />
      );
    }

    // Horizontal lines
    for (let y = gridStart.y; y <= gridEnd.y; y += gridSize) {
      lines.push(
        <line
          key={`h-${y}`}
          x1={gridStart.x}
          y1={y}
          x2={gridEnd.x}
          y2={y}
          stroke={`url(#horizontalGradient)`}
          strokeWidth="1.5"
          style={{
            filter: `drop-shadow(0 0 5px ${secondaryColor})`,
            animation: `pulse-h-${y} 3s infinite alternate`
          }}
        />
      );
    }

    return lines;
  };

  // Define safe zone with enhanced TRON-inspired highlighting
  const renderSafeZone = () => {
    const { width, height } = gridConfig;
    const safeZone = {
      x: width * 0.15,  // Expanded from 0.25
      y: height * 0.1,  // Slightly adjusted
      width: width * 0.7,  // Expanded from 0.5
      height: height * 0.8  // Expanded from 0.6
    };

    return (
      <rect
        x={safeZone.x}
        y={safeZone.y}
        width={safeZone.width}
        height={safeZone.height}
        fill="none"
        stroke="url(#safeZoneGradient)"
        strokeWidth="2"
        style={{
          filter: 'drop-shadow(0 0 15px rgba(255,20,147,0.7))',
          animation: 'pulse-safe-zone 4s infinite alternate'
        }}
      />
    );
  };

  return (
    <svg 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none',
        zIndex: -1,
        backgroundColor: 'rgba(0,0,0,0.9)'
      }}
    >
      {/* Gradient Definitions */}
      <defs>
        <style>{`
          @keyframes pulse-safe-zone {
            0% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}</style>

        {/* Vertical line gradient */}
        <linearGradient id="verticalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF1493" stopOpacity="0"/>
          <stop offset="50%" stopColor="#FF1493" stopOpacity="1"/>
          <stop offset="100%" stopColor="#FF1493" stopOpacity="0"/>
        </linearGradient>

        {/* Horizontal line gradient */}
        <linearGradient id="horizontalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FFD1" stopOpacity="0"/>
          <stop offset="50%" stopColor="#00FFD1" stopOpacity="1"/>
          <stop offset="100%" stopColor="#00FFD1" stopOpacity="0"/>
        </linearGradient>

        {/* Safe zone gradient */}
        <linearGradient id="safeZoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF1493" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#00FFD1" stopOpacity="0.5"/>
        </linearGradient>
      </defs>

      {generateGridLines()}
      {renderSafeZone()}
    </svg>
  );
};

const BitcoinMatrix = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Explicit null check and type assertion
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Disable image smoothing to make text look more pixelated
    ctx.imageSmoothingEnabled = false;

    // Bitcoin addresses
    const addresses = [
      "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      "12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX",
      "1HLoD9E4SDFFPDiYfNYnkBLQ85Y51J3Zb1",
      "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",
      "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
    ];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Ensure crisp rendering
      ctx.imageSmoothingEnabled = false;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Calculate safe zone
    const safeZone = {
      x: canvas.width * 0.15,
      y: canvas.height * 0.1,
      width: canvas.width * 0.7,
      height: canvas.height * 0.8
    };

    const fontSize = 24; // Larger font size
    const columns = Math.floor(canvas.width / (fontSize * 1.5)); // Fewer columns
    const drops = new Array(columns).fill(0);

    // Function to get random characters from Bitcoin addresses
    const getChar = () => {
      const addr = addresses[Math.floor(Math.random() * addresses.length)];
      return addr.charAt(Math.floor(Math.random() * addr.length));
    };

    // Calculate opacity based on position
    const calculateOpacity = (x: number, y: number) => {
      // Check if point is inside or near the safe zone
      if (
        x >= safeZone.x && x <= (safeZone.x + safeZone.width) &&
        y >= safeZone.y && y <= (safeZone.y + safeZone.height)
      ) {
        return 0.1; // Very low opacity inside safe zone
      }

      // Gradually reduce opacity as getting closer to safe zone
      const distanceX = Math.min(
        Math.abs(x - safeZone.x), 
        Math.abs(x - (safeZone.x + safeZone.width))
      );
      const distanceY = Math.min(
        Math.abs(y - safeZone.y), 
        Math.abs(y - (safeZone.y + safeZone.height))
      );

      const fadeDistance = 200; // Pixels to fade out
      const opacityFactor = Math.min(
        1, 
        Math.max(0, 1 - (
          (fadeDistance - distanceX) / fadeDistance + 
          (fadeDistance - distanceY) / fadeDistance
        ) / 2)
      );

      return 0.3 + (0.7 * opacityFactor); // Range from 0.3 to 1
    };

    const draw = () => {
      // Add semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties with a more pixelated font
      ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      // Draw falling characters
      drops.forEach((drop, i) => {
        if (drop === 0 && Math.random() < 0.005) { // Slow drop frequency
          drops[i] = 1;
        }

        if (drop > 0) {
          const x = i * (fontSize * 1.5);
          const y = drop * fontSize;

          // Calculate opacity
          const opacity = calculateOpacity(x, y);

          // Main character (brighter)
          const char = getChar();

          // Bitcoin theme orange with less smooth rendering
          ctx.shadowBlur = 0; // Remove smooth glow
          ctx.shadowColor = 'transparent';
          ctx.fillStyle = `hsla(28, 100%, 70%, ${opacity})`;
          
          // Slightly offset and create a small "blocky" effect
          ctx.fillText(char, x, y);
          ctx.fillText(char, x + 0.5, y + 0.5);

          // Reset or continue drop (slower)
          if (y > canvas.height && Math.random() > 0.98) {
            drops[i] = 0;
          } else {
            drops[i] += 0.3; // Slow speed
          }
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ 
        opacity: 0.7,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        imageRendering: 'pixelated' // Additional CSS for crisp rendering
      }}
    />
  );
};

const ThemeBackgrounds = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {theme === 'dark' && <TronGrid />}
      {theme === 'bitcoin' && <BitcoinMatrix />}
    </div>
  );
};

export default ThemeBackgrounds;

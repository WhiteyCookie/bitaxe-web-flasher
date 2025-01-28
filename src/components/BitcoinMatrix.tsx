'use client'

import React, { useRef, useEffect } from 'react'

export const BitcoinMatrix = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    const fontSize = 24;
    const columns = Math.floor(canvas.width / (fontSize * 1.5));
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
          ctx.shadowBlur = 0;
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
        position: 'fixed', // Changed from absolute to fixed
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Changed to match TronGrid
        pointerEvents: 'none',
        imageRendering: 'pixelated'
      }}
    />
  );
};

export default BitcoinMatrix;

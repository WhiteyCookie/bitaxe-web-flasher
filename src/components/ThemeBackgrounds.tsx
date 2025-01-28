'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { TronGrid } from './TronGrid'
import { BitcoinMatrix } from './BitcoinMatrix'
import { SakuraPattern } from './SakuraPattern'

const ThemeBackgrounds = () => {
  const { theme } = useTheme();
  
  return (
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none">
      {theme === 'dark' && <TronGrid />}
      {theme === 'bitcoin' && <BitcoinMatrix />}
      {theme === 'japanese' && <SakuraPattern />}
    </div>
  );
};

export default ThemeBackgrounds;

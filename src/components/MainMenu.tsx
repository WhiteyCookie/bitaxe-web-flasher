import React, { useState, useEffect, useCallback } from 'react';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';
import { Cpu, Book, Zap } from 'lucide-react';

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setIsOpen(false);
    }, 5000);
    setTimer(newTimer);
  }, [timer]);

  const handleMouseEnter = () => {
    setIsOpen(true);
    setIsVisible(true);
    startTimer();
  };

  const handleMouseMove = () => {
    if (isOpen) {
      startTimer();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const menuItems = [
    { icon: <Zap className="w-4 h-4" />, label: 'Web Flasher', href: '/' },
    { icon: <Book className="w-4 h-4" />, label: 'Bitaxe Documentation', href: 'https://www.osmu.wiki', external: true },
  ];

  return (
    <div className="fixed left-0 top-0 z-50">
      <div
        className="cursor-pointer p-4 flex items-center"
        onMouseEnter={handleMouseEnter}
      >
        <Cpu className="h-6 w-6 mr-2 text-primary glow" />
        <span className="font-bold text-primary glow">Bitaxe Web Flasher</span>
      </div>

      {(isOpen || isVisible) && (
        <div
          className={`absolute left-0 top-0 bg-background/1 backdrop-blur-sm border-r border-primary/20 h-screen w-64 transition-transform duration-300 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onMouseMove={handleMouseMove}
        >
          <div className="p-4 space-y-8">
            <div className="flex items-center space-x-2">
              <Cpu className="h-6 w-6 text-primary float" />
              <span className="font-bold text-primary">Bitaxe Web Flasher</span>
            </div>

            <nav className="space-y-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/20 transition-colors text-foreground hover:text-primary group"
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                >
                  <span className="text-primary group-hover:animate-pulse">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-primary/20">
              <div className="flex items-center justify-between p-2">
                <span className="text-sm text-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;

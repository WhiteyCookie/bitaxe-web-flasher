import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, useCallback } from 'react'

interface InstructionPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstructionPanel({ isOpen, onClose }: InstructionPanelProps) {
  const { t } = useTranslation();
  const steps = [1, 2, 3, 4, 5, 6, 7];
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const startTimer = useCallback(() => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      onClose();
    }, 30000); // 30 seconds
    setTimer(newTimer);
  }, [timer, onClose]);

  const handleMouseMove = () => {
    startTimer();
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      startTimer();
    } else {
      // Add a small delay before removing the component to allow for animation
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Should match the transition duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen, startTimer]);

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  if (!isOpen && !isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-end z-50 transition-opacity duration-300"
      style={{ opacity: isOpen ? 1 : 0 }}
    >
      <div 
        className={`bg-background h-[80vh] w-80 rounded-lg border border-primary/20 shadow-lg p-6 relative transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0 mr-8' : 'translate-x-full'
        }`}
        onMouseMove={handleMouseMove}
      >
        <button
          className="absolute top-4 right-4 text-primary hover:text-primary/80 transition-colors"
          onClick={onClose}
        >
          <X className="h-6 w-6 glow float" />
        </button>

        <h2 className="text-xl font-bold mb-6 text-primary glow">{t('instructions.title')}</h2>
        
        <ol className="list-decimal list-inside space-y-4 text-sm max-h-[calc(80vh-12rem)] overflow-y-auto">
          {steps.map((step) => (
            <li key={step} className="text-foreground/80 hover:text-foreground transition-colors">
              {t(`instructions.steps.${step}`)}
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm text-foreground/60">
          {t('instructions.moreInfo')}{' '}
          <a 
            className='text-primary hover:text-primary/80 transition-colors glow' 
            href="https://www.osmu.wiki"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('instructions.documentation')}
          </a>
        </p>
      </div>
    </div>
  );
}

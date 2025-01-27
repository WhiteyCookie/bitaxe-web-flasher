import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'

interface HeaderProps {
  onOpenPanel: () => void;
}

export default function Header({ onOpenPanel }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      {/* Left section intentionally empty for MainMenu */}
      <div className="w-48" /> {/* Spacer for menu */}

      {/* Middle section */}
      <div className="flex items-center">
        <a 
          href="https://discord.com/invite/osmu"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-90 transition-opacity float"
        >
          <img 
            src="https://dcbadge.limes.pink/api/server/3E8ca2dkcC" 
            alt="Discord Server" 
            className="h-6"
          />
        </a>
      </div>

      {/* Right section */}
      <nav className="flex items-center gap-4 sm:gap-6">
        <button
          className="text-sm font-medium hover:text-primary transition-colors glow"
          onClick={onOpenPanel}
        >
          {t('hero.getStarted')}
        </button>
        <LanguageSelector />
      </nav>
    </header>
  )
}

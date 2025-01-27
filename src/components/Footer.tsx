import Link from 'next/link'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTermsOfService, setShowTermsOfService] = useState(false)

  return (
    <>
      {showPrivacy && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md relative border border-primary/20">
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute right-4 top-4 text-primary hover:text-primary/80 transition-colors"
            >
              <X className="h-6 w-6 glow float" />
            </button>
            <div className="text-center">
              <h2 className="text-lg font-bold text-primary mb-4 glow">Privacy Notice</h2>
              <p className="text-foreground/80">We collect no data but your ISP does.</p>
            </div>
          </div>
        </div>
      )}

      {showTermsOfService && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md relative border border-primary/20">
            <button
              onClick={() => setShowTermsOfService(false)}
              className="absolute right-4 top-4 text-primary hover:text-primary/80 transition-colors"
            >
              <X className="h-6 w-6 glow float" />
            </button>
            <div className="text-center">
              <h2 className="text-lg font-bold text-primary mb-4 glow">Terms</h2>
              <p className="text-foreground/80">The source code is provided under GPL-V3 License.</p>
            </div>
          </div>
        </div>
      )}

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-primary/20 bg-background">
        <p className="text-xs text-primary glow float">© 2025 Bitaxe Web Flasher. All rights reserved.</p>
        <Link 
          className="text-xs text-primary hover:text-primary/80 transition-colors glow float" 
          href="https://wantclue.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          Maintained by WantClue
        </Link>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <button 
            onClick={() => setShowTermsOfService(true)} 
            className="text-xs text-primary hover:text-primary/80 transition-colors glow float"
          >
            Terms of Service
          </button>
          <button 
            onClick={() => setShowPrivacy(true)} 
            className="text-xs text-primary hover:text-primary/80 transition-colors glow float"
          >
            Privacy
          </button>
        </nav>
      </footer>
    </>
  )
}

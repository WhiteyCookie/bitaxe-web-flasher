"use client"

import { useTheme } from 'next-themes'
import { CircuitBoard, Bitcoin, Cherry } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10 relative hover:bg-primary/20">
          <CircuitBoard 
            className={`h-5 w-5 absolute transition-all duration-300 ${
              theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
            }`} 
          />
          <Bitcoin 
            className={`h-5 w-5 absolute transition-all duration-300 ${
              theme === 'bitcoin' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
            }`} 
          />
          <Cherry 
            className={`h-5 w-5 absolute transition-all duration-300 ${
              theme === 'japanese' ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
            }`} 
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2"
        >
          <CircuitBoard className="h-4 w-4" />
          <span>Cyberpunk</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("bitcoin")}
          className="flex items-center gap-2"
        >
          <Bitcoin className="h-4 w-4" />
          <span>Bitcoin OG</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("japanese")}
          className="flex items-center gap-2"
        >
          <Cherry className="h-4 w-4" />
          <span>Japanese</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

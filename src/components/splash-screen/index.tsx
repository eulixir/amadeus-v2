import { useState, useEffect } from 'react'

interface SplashScreenProps {
  setSplashHasLoaded: () => void
}

interface SplashScreenState {
  progress: number
  isRunning: boolean
}

const INITIAL_STATE: SplashScreenState = {
  progress: 0,
  isRunning: true,
}

const PROGRESS_INTERVAL = 30
const COMPLETION_DELAY = 500

export function SplashScreen({ setSplashHasLoaded }: SplashScreenProps) {
  const [state, setState] = useState<SplashScreenState>(INITIAL_STATE)

  useEffect(() => {
    if (!state.isRunning) return

    const interval = setInterval(() => {
      setState(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setSplashHasLoaded()
          }, COMPLETION_DELAY)
          return { ...prev, isRunning: false }
        }
        return { ...prev, progress: prev.progress + 1 }
      })
    }, PROGRESS_INTERVAL)

    return () => clearInterval(interval)
  }, [state.isRunning, setSplashHasLoaded])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-950 z-50">
      <div className="flex items-center justify-center flex-col pt-[15vh]">
        <img
          src="/amadeus-logo.png"
          alt="Amadeus Logo"
          className="w-64 h-64 object-contain mb-[9vh]"
          style={{
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />

        <div className="max-w-10/12 w-full h-2 rounded-[0.5vw] overflow-hidden bg-neutral-800 mb-[9vh]">
          <div
            className="h-full bg-neutral-600 transition-all duration-300"
            style={{ width: `${state.progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

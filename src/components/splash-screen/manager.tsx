import { useState, useEffect } from 'react'
import { SplashScreen } from './index'

const SPLASH_SCREEN_KEY = 'amadeusSplashScreen'

interface SplashScreenState {
  hasExecuted: boolean
  isVisible: boolean
}

export function SplashScreenManager() {
  const [state, setState] = useState<SplashScreenState>({
    hasExecuted: false,
    isVisible: false,
  })

  useEffect(() => {
    const hasSplashExecuted = localStorage.getItem(SPLASH_SCREEN_KEY) === 'true'
    setState({
      hasExecuted: hasSplashExecuted,
      isVisible: !hasSplashExecuted,
    })
  }, [])

  const handleSplashComplete = () => {
    localStorage.setItem(SPLASH_SCREEN_KEY, 'true')
    setState(prev => ({
      ...prev,
      isVisible: false,
    }))
  }

  if (!state.isVisible) return null

  return (
    <SplashScreen
      setSplashHasLoaded={handleSplashComplete}
      key={SPLASH_SCREEN_KEY}
    />
  )
}

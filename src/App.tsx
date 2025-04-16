// import MatrixBackground from './components/background'
import { Kurisu } from './components/kurisu'
import { MessageBox } from './components/message-box'
import { MessageProvider } from './contexts/MessageContext'
import { SplashScreenManager } from './components/splash-screen/manager'
import { useEffect } from 'react'
import { initChatMessages } from './services/messages/initChatMessage'

function App() {
  useEffect(() => {
    initChatMessages()
  }, [])

  return (
    <MessageProvider>
      <SplashScreenManager />
      <div className="flex h-screen w-screen items-center justify-center">
        {/* <MatrixBackground /> */}

        <Kurisu />
        <MessageBox />
      </div>
    </MessageProvider>
  )
}

export default App

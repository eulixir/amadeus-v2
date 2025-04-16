// import MatrixBackground from './components/background'
import { Kurisu } from './components/kurisu'
import { MessageBox } from './components/message-box'
import { ChatProvider } from './contexts/ChatContext'
import { SplashScreenManager } from './components/splash-screen/manager'

function App() {
  return (
    <ChatProvider>
      <SplashScreenManager />
      <div className="flex h-screen w-screen items-center justify-center">
        {/* <MatrixBackground /> */}

        <Kurisu />
        <MessageBox />
      </div>
    </ChatProvider>
  )
}

export default App

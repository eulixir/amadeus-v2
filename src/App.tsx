// import MatrixBackground from './components/background'
import { Kurisu } from './components/kurisu'
import MessageBox from './components/message-box'
import { MessageProvider } from './contexts/MessageContext'
import { SplashScreenManager } from './components/splash-screen/manager'

function App() {
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

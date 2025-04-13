import MatrixBackground from './components/background'
import { Kurisu } from './components/kurisu'
import MessageBox from './components/message-box'
import { MessageProvider } from './contexts/MessageContext'

function App() {
  return (
    <MessageProvider>
      <div className="flex h-screen w-screen items-center justify-center">
        <MatrixBackground />
        <div className="w-full h-full flex items-center justify-center">
          <Kurisu />
          <MessageBox />
        </div>
      </div>
    </MessageProvider>
  )
}

export default App

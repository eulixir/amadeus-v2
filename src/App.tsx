import MatrixBackground from './components/background'
import { Kurisu } from './components/kurisu'
import { MessageArea } from './components/message-area'

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <MatrixBackground />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Kurisu />
        <MessageArea />
      </div>
    </div>
  )
}

export default App

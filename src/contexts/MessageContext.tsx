import { createContext, useContext, useState, type ReactNode } from 'react'

interface MessageContextType {
  message: string
  setMessage: (message: string) => void
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export function MessageProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState(
    'Hello Hintarou kun, how are you? My name is Makise Kurisu, nice to meet you!'
  )

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  )
}

export function useMessage() {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider')
  }
  return context
}

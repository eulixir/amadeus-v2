import type { FrontalEmotion, LateralEmotion, Side } from '@/@types/sprites_map'
import { createContext, useContext, useState, type ReactNode } from 'react'

interface ChatContextType {
  message: string
  setMessage: (message: string) => void
  emotion: FrontalEmotion | LateralEmotion
  setEmotion: (emotion: FrontalEmotion | LateralEmotion) => void
  side: Side
  setSide: (side: Side) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')
  const [emotion, setEmotion] = useState<FrontalEmotion | LateralEmotion>(
    'neutral'
  )
  const [side, setSide] = useState<Side>('lateral')

  return (
    <ChatContext.Provider
      value={{ message, setMessage, emotion, setEmotion, side, setSide }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

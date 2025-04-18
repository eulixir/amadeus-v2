import type { FrontalEmotion, LateralEmotion, Side } from '@/@types/spritesMap'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { saveMessage } from '@/database'

interface ChatContextType {
  message: string
  setMessage: (message: string) => void
  handleSaveMessage: (message: string) => void
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
  const [side, setSide] = useState<Side>('frontal')

  function handleSaveMessage(message: string) {
    const { emotion, message: cleanedMessage } = filterMessage(message)

    saveMessage({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: cleanedMessage,
      sender: 'Kurisu',
      timestamp: new Date(),
      emotion,
      side,
    })

    setMessage(cleanedMessage)
    setEmotion(emotion)
  }

  return (
    <ChatContext.Provider
      value={{
        message,
        setMessage,
        handleSaveMessage,
        emotion,
        setEmotion,
        side,
        setSide,
      }}
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

function filterMessage(message: string) {
  console.log(message, 'message')
  const emotionMatch = message.match(/^'''([^']+)'''/)
  console.log(emotionMatch, 'emotionMatch')

  if (!emotionMatch) {
    return {
      emotion: 'neutral' as FrontalEmotion,
      message: message.replace(/^[^\S]+\s*/, '').trim(),
    }
  }

  console.log(emotionMatch, 'emotionMatch')

  const emotion = emotionMatch[1] as FrontalEmotion | LateralEmotion
  const cleanedMessage = message.replace(/^'''[^']+'''/, '').trim()

  return {
    emotion,
    message: cleanedMessage,
  }
}

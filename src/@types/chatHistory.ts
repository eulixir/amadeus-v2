import type { FrontalEmotion, LateralEmotion, Side } from './spritesMap'

export type ChatHistory = {
  messages: ChatMessage[]
}

export type ChatMessage = {
  id: string
  content: string
  timestamp: Date
  role: 'system' | 'user' | 'assistant'
  sender: 'Kurisu' | 'user'
  emotion?: FrontalEmotion | LateralEmotion
  side?: Side
}

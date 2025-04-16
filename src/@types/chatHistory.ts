import type { FrontalEmotion, LateralEmotion, Side } from './sprites_map'

export type ChatHistory = {
  messages: ChatMessage[]
}

export type ChatMessage = {
  id: string
  content: string
  timestamp: Date
  role: 'system' | 'user' | 'assistant'
  sender: 'Kurisu' | 'User'
  emotion?: FrontalEmotion | LateralEmotion
  side?: Side
}

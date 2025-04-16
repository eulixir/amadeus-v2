export type ChatHistory = {
  messages: ChatMessage[]
}

export type ChatMessage = {
  id: string
  content: string
  timestamp: Date
  sender: 'Kurisu' | 'User'
}

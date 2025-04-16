import type { ChatMessage } from '@/@types/chatHistory'

export async function getMessages(): Promise<ChatMessage[]> {
  const chatHistory = localStorage.getItem('chatHistory')
  const chatHistoryArray = chatHistory
    ? (JSON.parse(chatHistory) as ChatMessage[])
    : ([] satisfies ChatMessage[])

  return chatHistoryArray
}

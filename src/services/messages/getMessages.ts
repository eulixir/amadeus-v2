import type { ChatMessage } from '@/@types/chatHistory'
import { getMessages as getMessagesFromDatabase } from '@/database'

export async function getMessages(): Promise<ChatMessage[]> {
  const chatHistory = await getMessagesFromDatabase()

  return chatHistory
}

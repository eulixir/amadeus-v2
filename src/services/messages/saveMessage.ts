import type { ChatMessage } from '@/@types/chatHistory'
import { getMessages } from './getMessages'

export async function saveMessage(message: ChatMessage) {
  const chatHistoryArray = await getMessages()

  chatHistoryArray.push(message)
  localStorage.setItem('chatHistory', JSON.stringify(chatHistoryArray))

  return chatHistoryArray
}

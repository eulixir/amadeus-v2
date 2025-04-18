import { saveMessage, getMessages } from '@/database'
import type { ChatMessage } from '@/@types/chatHistory'

export async function initChatMessages() {
  const messages = await getMessages()

  if (!messages.length) {
    const initialMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'Kurisu',
      content: 'Hello! How can I help you today?',
      role: 'system',
      emotion: 'neutral',
      side: 'frontal',
      timestamp: new Date(),
    }

    await saveMessage(initialMessage)
    return initialMessage
  }

  // get last message of Kurisu
  return messages.filter(msg => msg.sender === 'Kurisu')[-1]
}

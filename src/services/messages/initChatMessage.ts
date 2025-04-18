import { saveMessage, getMessages, getLastMessageBySender } from '@/database'
import type { ChatMessage } from '@/@types/chatHistory'

export async function initChatMessages() {
  const messages = await getMessages()

  const lastMessage = await getLastMessageBySender('Kurisu')

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

  return lastMessage
}

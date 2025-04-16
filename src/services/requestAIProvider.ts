import { getChatCompletion } from '@/clients/openai'
import { saveMessage } from './messages/saveMessage'

export async function requestAIProvider(message: string) {
  const chatHistory = await saveMessage({
    id: crypto.randomUUID(),
    role: 'user',
    content: message,
    sender: 'User',
    timestamp: new Date(),
  })

  const response = await getChatCompletion(chatHistory)

  return response
}

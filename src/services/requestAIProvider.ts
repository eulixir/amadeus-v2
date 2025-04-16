import { getChatCompletion } from '@/clients/openai'
import { saveMessage } from './messages/saveMessage'

export async function requestAIProvider(message: string) {
  const chatHistory = await saveMessage({
    role: 'user',
    content: message,
  })

  const response = await getChatCompletion(chatHistory)

  console.log(response)

  return response
}

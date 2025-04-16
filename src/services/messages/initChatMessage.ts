import { getMessages } from './getMessages'
import { saveMessage } from './saveMessage'

export async function initChatMessages() {
  const chatHistory = await getMessages()

  if (chatHistory.length === 0) {
    const initialMessage = `Hello! I am Makise Kurisu, nice to meet you!
   First of all, how can I call you?`

    await saveMessage({
      id: crypto.randomUUID(),
      sender: 'Kurisu',
      content: initialMessage,
      role: 'system',
      timestamp: new Date(),
      emotion: {
        emotion: 'neutral',
        side: 'frontal',
      },
    })

    return initialMessage
  }

  const lastKurisuMessage = chatHistory.filter(
    message => message.sender !== 'Kurisu'
  )

  return lastKurisuMessage[lastKurisuMessage.length - 1].content
}

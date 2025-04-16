import { getMessages } from './getMessages'
import { saveMessage } from './saveMessage'

export async function initChatMessages() {
  const chatHistory = await getMessages()

  if (chatHistory.length === 0) {
    await saveMessage({
      id: '1',
      sender: 'Kurisu',
      content: 'Hello!',
      timestamp: new Date(),
    })
  }
}

import { getMessages } from './getMessages'

export async function getLastKurisuMessage() {
  const chatHistory = await getMessages()
  const lastKurisuMessage = chatHistory.find(
    message => message.sender === 'Kurisu'
  )

  if (!lastKurisuMessage) {
    throw new Error('No Kurisu message found')
  }

  return lastKurisuMessage
}

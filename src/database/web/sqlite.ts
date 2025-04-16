import type { ChatMessage } from '@/@types/chatHistory'

const STORAGE_KEY = 'chat_messages'

export const saveMessage = async (message: ChatMessage) => {
  const messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  messages.push(message)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
}

export const getMessages = async () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as ChatMessage[]
}

export const getLastMessage = async () => {
  const messages = await getMessages()
  return messages[messages.length - 1] || null
}

export const getLastMessageBySender = async (sender: 'Kurisu' | 'User') => {
  const messages = await getMessages()
  return messages.filter(msg => msg.sender === sender).pop() || null
}

export const clearMessages = async () => {
  localStorage.removeItem(STORAGE_KEY)
}

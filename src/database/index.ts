import type { ChatMessage } from '@/@types/chatHistory'
import * as tauriDb from './tauri/sqlite'
import * as webDb from './web/sqlite'

const isTauri = () => {
  return window.__TAURI__ !== undefined
}

const db = isTauri() ? tauriDb : webDb

export const saveMessage = (message: ChatMessage) => db.saveMessage(message)
export const getMessages = () => db.getMessages()
export const getLastMessage = () => db.getLastMessage()
export const getLastMessageBySender = (sender: 'Kurisu' | 'user') =>
  db.getLastMessageBySender(sender)
export const clearMessages = () => db.clearMessages()

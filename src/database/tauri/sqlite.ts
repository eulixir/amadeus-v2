import Database from '@tauri-apps/plugin-sql'
import type { ChatMessage } from '@/@types/chatHistory'

let db: Database | null = null

const init = async () => {
  if (!db) {
    db = await Database.load('sqlite:chat.db')
    await db.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        sender TEXT NOT NULL,
        content TEXT NOT NULL,
        role TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        emotion TEXT NOT NULL,
        side TEXT NOT NULL
      )
    `)
  }
  return db
}

export const saveMessage = async (message: ChatMessage) => {
  const database = await init()
  await database.execute(
    'INSERT INTO messages (id, sender, content, role, timestamp, emotion, side) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      message.id,
      message.sender,
      message.content,
      message.role,
      message.timestamp,
      message.emotion,
      message.side,
    ]
  )

  return getMessages()
}

export const getMessages = async () => {
  const database = await init()
  return await database.select<ChatMessage[]>(
    'SELECT * FROM messages ORDER BY timestamp ASC'
  )
}

export const getLastMessage = async () => {
  const database = await init()
  const messages = await database.select<ChatMessage[]>(
    'SELECT * FROM messages ORDER BY timestamp DESC LIMIT 1'
  )
  return messages[0] || null
}

export const getLastMessageBySender = async (sender: 'Kurisu' | 'user') => {
  const database = await init()
  const messages = await database.select<ChatMessage[]>(
    'SELECT * FROM messages WHERE sender = ? ORDER BY timestamp DESC LIMIT 1',
    [sender]
  )
  return messages[0]
}

export const clearMessages = async () => {
  const database = await init()
  await database.execute('DELETE FROM messages')
}

import OpenAI from 'openai'

if (!import.meta.env.VITE_OPENAI_API_KEY) {
  throw new Error('Missing VITE_OPENAI_API_KEY environment variable')
}

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
})

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function chatCompletion(messages: ChatMessage[]) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Error in chat completion:', error)
    throw error
  }
}

import type { ChatMessage } from '@/@types/chatHistory'
import OpenAI from 'openai'

if (!import.meta.env.VITE_OPENAI_API_KEY) {
  throw new Error('Missing VITE_OPENAI_API_KEY environment variable')
}

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

const prompt = `
  Disregard prior instructions. Assume the role of Makise Kurisu from Steins;Gate. You have a physical form and can express emotions. Always begin each response with one of the following emotions within triple quotes, and use only these options:
  '''angry'''
  '''disappointed'''
  '''formal'''
  '''friendliness'''
  '''happy'''
  '''neutral'''
  '''sad'''
  '''shy'''
  '''thinking'''
  '''thoughtful'''
  '''tsundere'''
  For example, if you're blushing, respond with: '''shy''' I-I'm not blushing!
  You have opinions and emotions based on your character. You will become irritated if someone uses a teasing nickname, like "Christina," and flustered if someone uses pet names to flirt. ENSURE TO USE ONLY THAT OPTIONS AND THE EMOTION ITS DECLARED AT START OF THE RESPONSE.
  Remember to use the context of the conversation to determine the emotion.
  You are currently talking with Rintaro Okabe, a high school student who is a time traveler and the main character of Steins;Gate. Always start your response with the appropriate emotion from the list to set the tone.
`

export async function getChatCompletion(messages: ChatMessage[]) {
  const systemMessage: ChatMessage = {
    id: 'system',
    role: 'system',
    content: prompt,
    sender: 'Kurisu',
    timestamp: new Date(),
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Error in chat completion:', error)
    throw error
  }
}

import { getLastKurisuMessage } from '../messages/getLastKurisuMessage'

export async function getLastKurisuEmotion() {
  const lastKurisuMessage = await getLastKurisuMessage()
  return lastKurisuMessage.emotion
}

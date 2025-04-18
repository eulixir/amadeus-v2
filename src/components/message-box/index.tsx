import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import Separator from '@/components/ui/separator'
import './styles.css'
import { LuMessageCircle } from 'react-icons/lu'
import { useChat } from '@/contexts/ChatContext'
import { initChatMessages } from '@/services/messages/initChatMessage'
import { getChatCompletion } from '@/clients/openai'
import { saveMessage } from '@/database'
import type { ChatMessage } from '@/@types/chatHistory'
import { VisuallyHidden } from '@/components/ui/visually-hidden'

const MessageTrigger = () => (
  <DrawerTrigger>
    <div className="absolute bottom-10 right-10">
      <LuMessageCircle className="text-white text-2xl" />
    </div>
  </DrawerTrigger>
)

export function MessageBox() {
  const [open, setOpen] = useState(false)
  const { message, handleSaveMessage, setMessage } = useChat()
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    const initChat = async () => {
      const response = await initChatMessages()
      setMessage(response?.content || '')
    }
    initChat()
  }, [setMessage])

  async function handleSubmit() {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      sender: 'user',
      role: 'user',
      content: answer,
    }

    const messages = await saveMessage(message)

    const response = await getChatCompletion(messages)

    handleSaveMessage(response)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {!open && <MessageTrigger />}

      <DrawerContent className="max-w-[1820px] mx-auto rounded-none">
        <VisuallyHidden>
          <DrawerTitle>Chat with Kurisu</DrawerTitle>
          <DrawerDescription>
            A chat interface to communicate with the AI assistant Kurisu
          </DrawerDescription>
        </VisuallyHidden>
        <div className="flex flex-col items-center justify-center w-full">
          <DrawerHeader
            className="max-h-[400px] min-h-[150px] overflow-y-auto border-none w-10/12"
            style={{
              textAlign: window.innerWidth <= 768 ? 'center' : 'left',
            }}
          >
            <p className="text-gray-200">{message}</p>
            <p className="text-gray-400 pt-2">Makise Kurisu</p>
          </DrawerHeader>
          <Separator />
          <DrawerFooter>
            <div className="flex items-center justify-center">
              <div className="flex gap-2 w-10/12">
                <Input
                  placeholder="Write a message..."
                  className="text-gray-400 placeholder:text-gray-400"
                  onChange={e => setAnswer(e.target.value)}
                />
                <Button variant="outline" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

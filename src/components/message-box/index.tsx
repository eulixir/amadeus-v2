import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import Separator from '@/components/ui/separator'
import './styles.css'
import { LuMessageCircle } from 'react-icons/lu'
import { useMessage } from '@/contexts/MessageContext'

const MessageTrigger = () => (
  <DrawerTrigger>
    <div className="absolute bottom-10 right-10">
      <LuMessageCircle className="text-white text-2xl" />
    </div>
  </DrawerTrigger>
)

const MessageBox = () => {
  const [open, setOpen] = useState(false)
  const { message, setMessage } = useMessage()

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {!open && <MessageTrigger />}

      <DrawerContent className="max-w-[1820px] mx-auto rounded-none">
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
                />
                <Button variant="outline">Submit</Button>
              </div>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default MessageBox

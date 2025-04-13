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
import './styles.css'
import { LuMessageCircle } from 'react-icons/lu'

const MessageTrigger = () => (
  <DrawerTrigger>
    <div className="absolute bottom-10 right-10">
      <LuMessageCircle className="text-white text-2xl" />
    </div>
  </DrawerTrigger>
)

const MessageBox = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {!open && <MessageTrigger />}

      <DrawerContent className="max-w-[1820px] mx-auto rounded-none">
        <div className="flex flex-col items-center justify-center w-full">
          <DrawerHeader className="max-h-[400px] h-[200px] overflow-y-auto border-none w-full">
            <p className="text-gray-200">{message}</p>
            <p className="text-gray-400 text-center pt-8">Makise Kurisu</p>
          </DrawerHeader>
          <DrawerFooter>
            <div className="flex items-center justify-center">
              <div className="flex gap-2 w-full">
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

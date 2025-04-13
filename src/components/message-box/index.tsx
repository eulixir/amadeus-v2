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

const MessageBox = () => {
  const [open, setOpen] = useState(true)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <div className="flex bg-white w-full h-full items-center justify-center flex-col ml-8 mr-8 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">Open Drawer</p>
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="bg-transparent max-w-[1600px] mx-auto rounded-none">
        <div className="flex flex-col items-center justify-center w-full">
          <DrawerHeader className="max-h-[400px] overflow-y-auto border-none w-full">
            <p className="text-gray-300">This action cannot be undone.</p>
          </DrawerHeader>
          <DrawerFooter>
            <div className="flex  items-center justify-center">
              <div className="flex gap-2 w-full">
                <Input
                  placeholder="Write a message..."
                  className="text-white placeholder:text-gray-300"
                />
                <Button variant="outline">Submit</Button>
                <Button onClick={() => setOpen(false)} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default MessageBox

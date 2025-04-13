import type { FrontalEmotion, Side, SpriteSize } from '@/@types/sprites_map'
import { getSpriteSize } from '@/@types/sprites_map'

import { useEffect, useState } from 'react'

export function Kurisu() {
  const [emotion, setEmotion] = useState<FrontalEmotion>('shy')
  const [size, setSize] = useState<SpriteSize>(() =>
    getSpriteSize(window.innerWidth)
  )
  const [side, setSide] = useState<Side>('lateral')

  const sequence = Math.floor(Math.random() * 3) + 1

  const imagePath = buildImagePath(emotion, size, side, sequence)

  useEffect(() => {
    const handleResize = () => {
      const newSize = getSpriteSize(window.innerWidth)
      setSize(newSize)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="flex items-center justify-center absolute bottom-0 left-0 right-0">
      <img
        draggable="false"
        onContextMenu={e => e.preventDefault()}
        src={imagePath}
        alt="Kurisu"
        className="object-contain max-h-[90vh]"
        style={{
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export function buildImagePath(
  emotion: FrontalEmotion,
  size: SpriteSize,
  side: Side,
  sequence: number
) {
  return `assets/sprites/${size}/${side}/${emotion}_0${sequence}.png`
}

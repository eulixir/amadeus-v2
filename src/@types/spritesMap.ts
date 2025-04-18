export const FRONTAL_EMOTIONS = [
  'angry',
  'bored',
  'disappointed',
  'formal',
  'friendliness',
  'happy',
  'neutral',
  'sad',
  'shy',
  'thinking',
  'thoughtful',
  'tsundere',
] as const

export const LATERAL_EMOTIONS = [
  'angry',
  'distant',
  'friendly',
  'happy',
  'neutral',
  'shy',
  'thinking',
] as const

export const SPRITE_SIZES = ['mobile', 'tablet', 'desktop'] as const
export const SIDE = ['frontal', 'lateral'] as const
export const SEQUENCE_LIMIT = 3
export const SEQUENCES = [1, 2, 3] as const

export const BREAKPOINTS = {
  mobile: 0,
  tablet: 380,
  desktop: 1024,
} as const

export type FrontalEmotion = (typeof FRONTAL_EMOTIONS)[number]
export type LateralEmotion = (typeof LATERAL_EMOTIONS)[number]
export type SpriteSize = (typeof SPRITE_SIZES)[number]
export type Side = (typeof SIDE)[number]
export type Sequence = (typeof SEQUENCES)[number]

export type SpritesMap = {
  frontal: FrontalEmotion
  lateral: LateralEmotion
  sizes: SpriteSize
  side: Side
}

export const formatSequence = (sequence: Sequence): string => {
  return sequence.toString().padStart(2, '0')
}

export const getSpriteFilename = (
  emotion: FrontalEmotion | LateralEmotion,
  sequence: Sequence
): string => {
  return `${emotion}_${formatSequence(sequence)}.png`
}

export const getSpriteSize = (width: number): SpriteSize => {
  if (width >= BREAKPOINTS.desktop) return 'desktop'
  if (width >= BREAKPOINTS.tablet) return 'tablet'
  return 'mobile'
}

export const defineSide = (emotion: string): Side => {
  if (LATERAL_EMOTIONS.includes(emotion as LateralEmotion)) {
    if (FRONTAL_EMOTIONS.includes(emotion as FrontalEmotion)) {
      return Math.random() < 0.7 ? 'lateral' : 'frontal'
    }
    return 'lateral'
  }
  return 'frontal'
}

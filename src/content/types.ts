export type ChapterId = 'gift' | 'songs' | 'flowers' | 'hunt' | 'quiz' | 'letters' | 'between'

export interface ChapterMeta {
  id: ChapterId
  title: string
  thai: string
  /** Shown under the nav when the chapter cannot be reached yet. */
  lockedHint: string
}

export interface Song {
  id: string
  title: string
  artist: string
  spotifyId: string
  /** Short, editable personal note shown on the cassette label. */
  note: string
  /** Handwritten sticker text. */
  sticker: string
}

export interface FlowerNote {
  id: string
  kind: 'marigold' | 'cosmos' | 'dandelion' | 'poppy' | 'zinnia'
  label: string
  botanical: string
  message: string
}

export interface HiddenNote {
  label: string
  message: string
}

export interface Clue {
  id: string
  name: string
  hint: string
  found: string
  /** Position inside the night scene, in percent. */
  x: number
  y: number
}

export type OutcomeId = 'sunbeam' | 'lantern' | 'wildflower' | 'mixtape'

export interface QuizOption {
  id: string
  text: string
  /** Points added to each outcome when this option is chosen. */
  score: Partial<Record<OutcomeId, number>>
}

export interface QuizQuestion {
  id: string
  prompt: string
  options: QuizOption[]
}

export interface QuizOutcome {
  id: OutcomeId
  title: string
  thai: string
  explanation: string
  message: string
}

export interface LetterContent {
  id: string
  theme: string
  heading: string
  paragraphs: string[]
  signoff: string
}

export type ConfessionChoiceId = 'same' | 'slow' | 'think'

export interface ConfessionChoice {
  id: ConfessionChoiceId
  label: string
  closingTitle: string
  closing: string[]
}

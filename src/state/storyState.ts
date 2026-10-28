import { chapters, clues, flowers, quizQuestions } from '../content/content'
import type { ChapterId, ConfessionChoiceId } from '../content/types'
import type { Answers } from './quizScoring'

/**
 * All visitor state lives here, in memory only.
 * Nothing is written to localStorage, sessionStorage, cookies or the network,
 * so a fresh page load always starts from `initialState`.
 */
export interface StoryState {
  current: number
  envelopeOpened: boolean
  selectedSong: string | null
  flowersRead: string[]
  hiddenFlowerFound: boolean
  huntFound: string[]
  quizAnswers: Answers
  quizStep: number
  quizDone: boolean
  lettersOpened: string[]
  confession: ConfessionChoiceId | null
  /** Chapters the visitor chose to skip past. Skipping counts as completing. */
  skipped: ChapterId[]
}

export const FLOWERS_REQUIRED = 3

export const initialState: StoryState = {
  current: 0,
  envelopeOpened: false,
  selectedSong: null,
  flowersRead: [],
  hiddenFlowerFound: false,
  huntFound: [],
  quizAnswers: {},
  quizStep: 0,
  quizDone: false,
  lettersOpened: [],
  confession: null,
  skipped: [],
}

export type Action =
  | { type: 'goto'; index: number }
  | { type: 'openEnvelope' }
  | { type: 'selectSong'; id: string | null }
  | { type: 'readFlower'; id: string }
  | { type: 'findHiddenFlower' }
  | { type: 'findClue'; id: string }
  | { type: 'restartHunt' }
  | { type: 'answer'; questionId: string; optionId: string }
  | { type: 'quizStep'; step: number }
  | { type: 'finishQuiz' }
  | { type: 'restartQuiz' }
  | { type: 'openLetter'; id: string }
  | { type: 'confess'; choice: ConfessionChoiceId | null }
  | { type: 'skip'; chapter: ChapterId }
  | { type: 'reset' }

/** Has the visitor done what a chapter needs before moving past it? */
export function isComplete(state: StoryState, index: number): boolean {
  const id = chapters[index]?.id
  if (!id) return false
  if (state.skipped.includes(id)) return true
  switch (id) {
    case 'gift':
      return state.envelopeOpened
    case 'songs':
      return true // listening is always optional
    case 'flowers':
      return state.flowersRead.length >= FLOWERS_REQUIRED
    case 'hunt':
      return state.huntFound.length >= clues.length
    case 'quiz':
      return state.quizDone
    case 'letters':
      return state.lettersOpened.length >= 1
    case 'between':
      return state.confession !== null
  }
}

/** A chapter is reachable once every chapter before it is complete. */
export function canAccess(state: StoryState, target: number): boolean {
  if (target < 0 || target >= chapters.length) return false
  for (let i = 0; i < target; i++) if (!isComplete(state, i)) return false
  return true
}

const add = (list: string[], id: string) => (list.includes(id) ? list : [...list, id])

export function reducer(state: StoryState, action: Action): StoryState {
  switch (action.type) {
    case 'goto':
      return canAccess(state, action.index) ? { ...state, current: action.index } : state
    case 'openEnvelope':
      return { ...state, envelopeOpened: true }
    case 'selectSong':
      return { ...state, selectedSong: action.id }
    case 'readFlower':
      return flowers.some((f) => f.id === action.id)
        ? { ...state, flowersRead: add(state.flowersRead, action.id) }
        : state
    case 'findHiddenFlower':
      return { ...state, hiddenFlowerFound: true }
    case 'findClue':
      return clues.some((c) => c.id === action.id) ? { ...state, huntFound: add(state.huntFound, action.id) } : state
    case 'restartHunt':
      return { ...state, huntFound: [], skipped: state.skipped.filter((s) => s !== 'hunt') }
    case 'answer':
      return { ...state, quizAnswers: { ...state.quizAnswers, [action.questionId]: action.optionId } }
    case 'quizStep':
      return { ...state, quizStep: Math.max(0, Math.min(quizQuestions.length - 1, action.step)) }
    case 'finishQuiz':
      // Only finish when every question has an answer.
      return quizQuestions.every((q) => state.quizAnswers[q.id]) ? { ...state, quizDone: true } : state
    case 'restartQuiz':
      return {
        ...state,
        quizAnswers: {},
        quizStep: 0,
        quizDone: false,
        skipped: state.skipped.filter((s) => s !== 'quiz'),
      }
    case 'openLetter':
      return { ...state, lettersOpened: add(state.lettersOpened, action.id) }
    case 'confess':
      return { ...state, confession: action.choice }
    case 'skip':
      return { ...state, skipped: state.skipped.includes(action.chapter) ? state.skipped : [...state.skipped, action.chapter] }
    case 'reset':
      return initialState
  }
}

import { createContext, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from 'react'
import { initialState, reducer, type Action, type StoryState } from './storyState'

interface Ctx {
  state: StoryState
  dispatch: Dispatch<Action>
  /** Bumps on every full reset so chapters remount with fresh local state. */
  runKey: number
  replay: () => void
}

const StoryContext = createContext<Ctx | null>(null)

export function StoryProvider({ children }: { children: ReactNode }) {
  // Reducer + a counter, both held in memory only.
  const [wrapped, dispatch] = useReducer(
    (s: { story: StoryState; runKey: number }, a: Action) =>
      a.type === 'reset'
        ? { story: reducer(s.story, a), runKey: s.runKey + 1 }
        : { story: reducer(s.story, a), runKey: s.runKey },
    { story: initialState, runKey: 0 },
  )

  const value = useMemo<Ctx>(
    () => ({ state: wrapped.story, dispatch, runKey: wrapped.runKey, replay: () => dispatch({ type: 'reset' }) }),
    [wrapped],
  )
  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
}

export function useStory(): Ctx {
  const ctx = useContext(StoryContext)
  if (!ctx) throw new Error('useStory must be used inside <StoryProvider>')
  return ctx
}

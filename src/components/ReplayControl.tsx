import { useState } from 'react'
import { useStory } from '../state/StoryContext'
import { SharedButton } from './SharedButton'
import { SharedModal } from './SharedModal'

/** Starts the whole story over. Asks first so an accidental tap cannot wipe progress. */
export function ReplayControl({ label = 'Start over' }: { label?: string }) {
  const { replay } = useStory()
  const [confirming, setConfirming] = useState(false)
  return (
    <>
      <button type="button" className="link-button" onClick={() => setConfirming(true)}>
        {label}
      </button>
      <SharedModal open={confirming} title="Start from the beginning?" onClose={() => setConfirming(false)} closeLabel="Keep going">
        <p>Everything resets: the envelope closes and your answers are cleared. Nothing was saved anywhere.</p>
        <SharedButton
          onClick={() => {
            setConfirming(false)
            replay()
          }}
        >
          Yes, start over
        </SharedButton>
      </SharedModal>
    </>
  )
}

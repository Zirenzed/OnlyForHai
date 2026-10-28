import { useEffect, useRef, useState } from 'react'
import { gift, site } from '../content/content'
import { Bouquet, Marigold, Washi, Stamp } from '../art/Art'
import { SharedButton } from '../components/SharedButton'
import { useStory } from '../state/StoryContext'
import { useReducedMotion } from '../hooks/useMotionPreference'

type Phase = 'closed' | 'opening' | 'open'
const OPEN_MS = 850

/** Chapter 1 — a tangerine envelope that opens into a short letter. */
export function EnvelopeIntro() {
  const { state, dispatch } = useStory()
  const reduced = useReducedMotion()
  // Coming back to this chapter after opening it? Show the open state at once.
  const [phase, setPhase] = useState<Phase>(state.envelopeOpened ? 'open' : 'closed')
  const timer = useRef<number>(0)
  const justOpened = useRef(false)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const open = () => {
    if (phase !== 'closed') return
    justOpened.current = true
    dispatch({ type: 'openEnvelope' }) // unlocks chapter 2 immediately, animation never blocks it
    if (reduced) {
      setPhase('open') // reduced motion: no waiting, show the letter straight away
      return
    }
    setPhase('opening')
    timer.current = window.setTimeout(() => setPhase('open'), OPEN_MS)
  }

  /** Finish the animation right now (button, or tapping the envelope again). */
  const finishNow = () => {
    window.clearTimeout(timer.current)
    setPhase('open')
  }

  useEffect(() => {
    // Move keyboard focus to the call-to-action only right after the visitor opened it.
    if (phase === 'open' && justOpened.current) ctaRef.current?.focus({ preventScroll: true })
  }, [phase])

  const isOpen = phase !== 'closed'

  return (
    <section className="chapter chapter--gift" aria-labelledby="gift-title">
      <div className="gift__tape" aria-hidden="true">
        <Washi />
      </div>

      <header className="gift__head">
        <p className="hand gift__hand">{gift.handwritten}</p>
        <h1 id="gift-title" className="display gift__title">
          {site.title}
        </h1>
        <p className="gift__tagline">{site.tagline}</p>
      </header>

      <div className="gift__stage">
        <Bouquet className="gift__bouquet" />
        <Stamp className="gift__stamp" />

        <button
          type="button"
          className={`env env--${phase}`}
          onClick={phase === 'opening' ? finishNow : open}
          aria-label={isOpen ? 'The envelope is open' : 'Open the envelope'}
          aria-disabled={phase === 'open'}
          tabIndex={phase === 'open' ? -1 : 0}
        >
          <span className="env__back" />
          <span className="env__letter" aria-hidden="true">
            <span className="env__letter-lines" />
          </span>
          <span className="env__pocket" />
          <span className="env__flap" />
          <span className="env__seal" aria-hidden="true">
            <Marigold className="env__seal-flower" />
          </span>
          <span className="env__to hand" aria-hidden="true">
            for {site.to}
          </span>
        </button>

        {phase === 'closed' && <p className="hand gift__tap">{gift.tapHint} ↑</p>}
        {phase === 'opening' && (
          <button type="button" className="link-button gift__skip" onClick={finishNow}>
            Skip animation
          </button>
        )}
      </div>

      {/* Space is reserved so the layout does not jump when the letter appears. */}
      <div className="gift__card-slot" aria-live="polite">
        {phase === 'open' && (
          <article className="paper gift__card">
            <p className="hand gift__greet">{gift.letterGreeting}</p>
            <p>{gift.intro}</p>
            <p>{gift.letterBody}</p>
            <SharedButton ref={ctaRef} onClick={() => dispatch({ type: 'goto', index: 1 })} className="gift__cta">
              {gift.cta}
            </SharedButton>
          </article>
        )}
      </div>
    </section>
  )
}

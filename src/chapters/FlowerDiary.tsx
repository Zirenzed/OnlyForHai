import { useState } from 'react'
import { flowerIntro, flowers, hiddenFlower } from '../content/content'
import { FLOWERS_REQUIRED } from '../state/storyState'
import { FlowerByKind, GinghamDefs, Sprig } from '../art/Art'
import { useStory } from '../state/StoryContext'
import { FlowerMessage } from './FlowerMessage'

type Open = { kind: 'flower'; id: string } | { kind: 'hidden' } | null

/** Chapter 3 — a botanical diary page. Each flower is a real button. */
export function FlowerDiary() {
  const { state, dispatch } = useStory()
  const [open, setOpen] = useState<Open>(null)
  const read = state.flowersRead.length
  const active = open?.kind === 'flower' ? flowers.find((f) => f.id === open.id) : undefined

  const openFlower = (id: string) => {
    dispatch({ type: 'readFlower', id })
    setOpen({ kind: 'flower', id })
  }

  return (
    <section className="chapter chapter--flowers" aria-labelledby="flowers-title">
      <header className="chapter__head">
        <p className="hand chapter__kicker">pressed &amp; kept</p>
        <h2 id="flowers-title" className="display chapter__title">
          Flowers I never gave you
        </h2>
        <p className="chapter__lede">{flowerIntro.body}</p>
      </header>

      <div className="diary paper">
        <svg className="diary__ribbon" viewBox="0 0 400 26" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <GinghamDefs id="diary-gingham" />
          </defs>
          <rect width="400" height="26" fill="url(#diary-gingham)" className="stroke-brown" strokeWidth="1" />
        </svg>

        <ul className="blooms">
          {flowers.map((f, i) => {
            const isRead = state.flowersRead.includes(f.id)
            return (
              <li key={f.id} className={`bloom bloom--${i + 1}`}>
                <button
                  type="button"
                  className={`bloom__btn ${isRead ? 'is-read' : ''}`}
                  onClick={() => openFlower(f.id)}
                  aria-label={`${f.label}. ${isRead ? 'Already read, read again' : 'Tap to read the note'}`}
                >
                  <FlowerByKind kind={f.kind} className="bloom__art" />
                  {/* Little petals that drift down after a flower is read. */}
                  {isRead && (
                    <span className="bloom__petals" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
                </button>
                <p className="bloom__label hand">{f.label}</p>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className={`sprig ${state.hiddenFlowerFound ? 'is-found' : ''}`}
          aria-label={state.hiddenFlowerFound ? 'The hidden pressed sprig, read again' : 'A tiny pressed sprig tucked in the margin'}
          onClick={() => {
            dispatch({ type: 'findHiddenFlower' })
            setOpen({ kind: 'hidden' })
          }}
        >
          <Sprig className="sprig__art" />
        </button>
      </div>

      <p className="chapter__status" role="status">
        {read >= FLOWERS_REQUIRED ? `${read} of ${flowers.length} notes read. You can carry on whenever you like.` : `${read} of ${flowers.length} notes read. ${flowerIntro.gateHint}`}
        {state.hiddenFlowerFound && ' · You found the hidden one.'}
      </p>

      <FlowerMessage
        open={open?.kind === 'flower'}
        onClose={() => setOpen(null)}
        kind={active?.kind}
        label={active?.label ?? ''}
        botanical={active?.botanical}
        message={active?.message ?? ''}
      />
      <FlowerMessage
        open={open?.kind === 'hidden'}
        onClose={() => setOpen(null)}
        hidden
        label={hiddenFlower.label}
        message={hiddenFlower.message}
      />
    </section>
  )
}

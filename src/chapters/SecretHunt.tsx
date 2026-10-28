import { useState } from 'react'
import { clues, huntIntro } from '../content/content'
import { Moon, Star, TinyCassette } from '../art/Art'
import { SharedButton } from '../components/SharedButton'
import { useStory } from '../state/StoryContext'

/** Decorative stars that are *not* clues — tapping one gives a gentle nudge. */
const DECOYS = [
  { x: 10, y: 12 },
  { x: 40, y: 10 },
  { x: 62, y: 28 },
  { x: 90, y: 40 },
  { x: 12, y: 52 },
  { x: 70, y: 56 },
  { x: 36, y: 46 },
]

function ClueArt({ id }: { id: string }) {
  if (id === 'moon') return <Moon className="clue__art" />
  if (id === 'cassette') return <TinyCassette className="clue__art" />
  return <Star warm className="clue__art" />
}

/** Chapter 4 — a night-sky mini-game with three real, tappable clues. */
export function SecretHunt() {
  const { state, dispatch } = useStory()
  const [hints, setHints] = useState<string[]>([])
  const [message, setMessage] = useState('')

  const found = state.huntFound
  const skipped = state.skipped.includes('hunt')
  const solved = found.length >= clues.length
  const unlocked = solved || skipped

  const toggleHint = (id: string) => setHints((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id]))

  const tapClue = (id: string) => {
    const clue = clues.find((c) => c.id === id)
    if (!clue) return
    if (!found.includes(id)) dispatch({ type: 'findClue', id })
    setMessage(clue.found)
  }

  const restart = () => {
    dispatch({ type: 'restartHunt' })
    setHints([])
    setMessage('')
  }

  return (
    <section className="chapter chapter--hunt" aria-labelledby="hunt-title">
      <header className="chapter__head">
        <p className="hand chapter__kicker">after dark</p>
        <h2 id="hunt-title" className="display chapter__title">
          {huntIntro.heading}
        </h2>
        <p className="chapter__lede">{huntIntro.body}</p>
      </header>

      <div className="night" role="group" aria-label="Night sky. Tap the objects you think are hiding a secret.">
        <svg className="night__scene" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <g className="stroke-peach" strokeWidth=".35" fill="none" strokeDasharray="1.2 1.2" opacity=".55">
            <path d="M10 12 L24 30 L40 10" />
            <path d="M62 28 L78 17 L90 40" />
          </g>
          <path d="M0 86 C 20 74 38 80 54 76 S 86 72 100 80 L100 100 L0 100 Z" className="fill-hill" />
          <path d="M0 94 C 24 86 48 92 70 88 S 92 88 100 90 L100 100 L0 100 Z" className="fill-hill-2" />
        </svg>

        {DECOYS.map((d, i) => (
          <button
            key={i}
            type="button"
            className="night__decoy"
            style={{ left: `${d.x}%`, top: `${d.y}%` }}
            aria-label="A star"
            onClick={() => setMessage(huntIntro.decoy)}
          >
            <Star className="night__decoy-art" />
          </button>
        ))}

        {clues.map((c) => {
          const isFound = found.includes(c.id)
          return (
            <button
              key={c.id}
              type="button"
              className={`clue clue--${c.id} ${isFound ? 'is-found' : ''}`}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              aria-label={isFound ? `${c.name}, found` : `A hidden thing in the sky`}
              onClick={() => tapClue(c.id)}
            >
              <ClueArt id={c.id} />
            </button>
          )
        })}
      </div>

      <p className="hunt__progress" role="status">
        {skipped && !solved ? 'Hunt skipped.' : `${found.length} of ${clues.length} secrets found`}
        {message && <span className="hunt__message hand"> — {message}</span>}
      </p>

      <ul className="hunt__list">
        {clues.map((c, i) => {
          const isFound = found.includes(c.id)
          const showHint = hints.includes(c.id)
          return (
            <li key={c.id} className={`hunt__item ${isFound ? 'is-found' : ''}`}>
              <span className="hunt__mark" aria-hidden="true">
                {isFound ? '✓' : i + 1}
              </span>
              <div className="hunt__text">
                <strong>{isFound ? c.name : `Secret ${i + 1}`}</strong>
                {isFound ? (
                  <span>{c.found}</span>
                ) : (
                  <>
                    <button
                      type="button"
                      className="link-button link-button--light"
                      aria-expanded={showHint}
                      onClick={() => toggleHint(c.id)}
                    >
                      {showHint ? 'Hide hint' : 'Show hint'}
                    </button>
                    {showHint && <em className="hunt__hint">{c.hint}</em>}
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {unlocked && (
        <article className="paper paper--night hunt__letter" aria-labelledby="hunt-letter-title">
          <h3 id="hunt-letter-title" className="hand hunt__letter-title">
            {huntIntro.unlockedTitle}
          </h3>
          {skipped && !solved && <p className="hunt__skipnote">{huntIntro.skippedNote}</p>}
          {huntIntro.unlockedLetter.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </article>
      )}

      <div className="hunt__actions">
        {!unlocked && (
          <SharedButton variant="secondary" onClick={() => dispatch({ type: 'skip', chapter: 'hunt' })}>
            {huntIntro.skipLabel}
          </SharedButton>
        )}
        {(found.length > 0 || skipped) && (
          <SharedButton variant="secondary" onClick={restart}>
            Restart the hunt
          </SharedButton>
        )}
      </div>
    </section>
  )
}

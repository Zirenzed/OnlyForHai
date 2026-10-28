import { useState } from 'react'
import { confessionChoices, finale, site } from '../content/content'
import { Marigold, Zinnia, Sprig } from '../art/Art'
import { SharedButton } from '../components/SharedButton'
import { useStory } from '../state/StoryContext'

/** Chapter 7 — a flower, a letter, and three equally kind ways to answer. */
export function FinalConfession() {
  const { state, dispatch, replay } = useStory()
  const [unfolded, setUnfolded] = useState(state.confession !== null)
  const choice = confessionChoices.find((c) => c.id === state.confession)

  return (
    <section className="chapter chapter--between" aria-labelledby="between-title">
      <div className="between__glow" aria-hidden="true" />
      <header className="chapter__head">
        <p className="hand chapter__kicker">golden hour, nearly over</p>
        <h2 id="between-title" className="display chapter__title">
          {finale.heading}
        </h2>
      </header>

      <div className="between__stage">
        <div className="between__flower" aria-hidden="true">
          <Zinnia className="between__bloom between__bloom--back" />
          <Marigold className="between__bloom between__bloom--front" />
          <Sprig className="between__sprig" />
        </div>

        {!unfolded ? (
          <div className="between__fold">
            <button type="button" className="between__folded paper" onClick={() => setUnfolded(true)}>
              <span className="hand">{finale.openLabel}</span>
            </button>
          </div>
        ) : (
          <article className="paper letter" aria-label="The final letter">
            {finale.letter.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="hand letter__signoff">
              {finale.signoff}
              <br />
              {site.from}
            </p>
          </article>
        )}
      </div>

      {unfolded && (
        <div className="reply" role="group" aria-labelledby="reply-label">
          <p id="reply-label" className="reply__label">
            {finale.promptLabel}
          </p>
          <div className="reply__choices">
            {confessionChoices.map((c) => (
              <SharedButton
                key={c.id}
                variant={state.confession === c.id ? 'primary' : 'secondary'}
                aria-pressed={state.confession === c.id}
                onClick={() => dispatch({ type: 'confess', choice: c.id })}
              >
                {c.label}
              </SharedButton>
            ))}
          </div>

          <div className="reply__closing" aria-live="polite">
            {choice && (
              <article className="paper closing" key={choice.id}>
                <h3 className="display closing__title">{choice.closingTitle}</h3>
                {choice.closing.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </article>
            )}
          </div>

          {choice && (
            <SharedButton variant="secondary" onClick={replay} className="reply__replay">
              {finale.replayLabel}
            </SharedButton>
          )}
          <p className="reply__privacy">Your choice stays on this screen only. Nothing is saved or sent.</p>
        </div>
      )}
    </section>
  )
}

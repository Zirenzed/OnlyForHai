import { letters, lettersIntro } from '../content/content'
import { useStory } from '../state/StoryContext'
import { InteractiveEnvelope } from './InteractiveEnvelope'

/** Chapter 6 — three envelopes, each opens on its own. */
export function LetterCollection() {
  const { state, dispatch } = useStory()
  return (
    <section className="chapter chapter--letters" aria-labelledby="letters-title">
      <header className="chapter__head">
        <p className="hand chapter__kicker">sealed with tangerine</p>
        <h2 id="letters-title" className="display chapter__title">
          {lettersIntro.heading}
        </h2>
        <p className="chapter__lede">{lettersIntro.body}</p>
      </header>

      <ul className="mails">
        {letters.map((l, i) => (
          <InteractiveEnvelope key={l.id} letter={l} index={i} onOpened={() => dispatch({ type: 'openLetter', id: l.id })} />
        ))}
      </ul>

      <p className="chapter__status" role="status">
        {state.lettersOpened.length} of {letters.length} opened
        {state.lettersOpened.length === 0 && ` · ${lettersIntro.gateHint}`}
      </p>
    </section>
  )
}

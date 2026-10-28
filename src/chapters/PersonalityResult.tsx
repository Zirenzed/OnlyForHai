import { quizOutcomes } from '../content/content'
import type { OutcomeId } from '../content/types'
import { Cosmos, Dandelion, Marigold, Cassette } from '../art/Art'
import { SharedButton } from '../components/SharedButton'

function OutcomeArt({ id }: { id: OutcomeId }) {
  switch (id) {
    case 'sunbeam':
      return <Marigold className="result__art" />
    case 'lantern':
      return <Dandelion className="result__art" />
    case 'wildflower':
      return <Cosmos className="result__art" />
    case 'mixtape':
      return <Cassette className="result__art result__art--wide" />
  }
}

/** The finished result card: title, explanation and a small affectionate line. */
export function PersonalityResult({ outcome, onRestart }: { outcome: OutcomeId; onRestart: () => void }) {
  const o = quizOutcomes.find((x) => x.id === outcome)
  if (!o) return null
  return (
    <article className="paper result" aria-labelledby="result-title">
      <OutcomeArt id={o.id} />
      <p className="hand result__kicker">you are…</p>
      <h3 id="result-title" className="display result__title">
        {o.title}
      </h3>
      <p className="result__thai">{o.thai}</p>
      <p>{o.explanation}</p>
      <p className="result__message hand">{o.message}</p>
      <SharedButton variant="secondary" onClick={onRestart}>
        Take the quiz again
      </SharedButton>
    </article>
  )
}

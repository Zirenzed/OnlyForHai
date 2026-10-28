import { chapters } from '../content/content'
import { canAccess } from '../state/storyState'
import { useStory } from '../state/StoryContext'

/** Seven stitched dots: current is tangerine, reachable ones are tappable. */
export function ProgressIndicator() {
  const { state, dispatch } = useStory()
  const total = chapters.length
  return (
    <div className="progress" role="group" aria-label="Chapter progress">
      <p className="progress__label" aria-live="polite">
        Chapter {state.current + 1} of {total}
      </p>
      <ol className="progress__dots">
        {chapters.map((c, i) => {
          const reachable = canAccess(state, i)
          const status = i === state.current ? 'current' : i < state.current ? 'past' : reachable ? 'open' : 'locked'
          return (
            <li key={c.id}>
              <button
                type="button"
                className={`dot dot--${status}`}
                disabled={!reachable}
                aria-current={i === state.current ? 'step' : undefined}
                aria-label={`Chapter ${i + 1}: ${c.title}${reachable ? '' : ' (locked)'}`}
                onClick={() => dispatch({ type: 'goto', index: i })}
              >
                <span aria-hidden="true">{i + 1}</span>
              </button>
            </li>
          )
        })}
      </ol>
      <div
        className="progress__bar"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={state.current + 1}
        aria-label="Story progress"
      >
        <span style={{ width: `${((state.current + 1) / total) * 100}%` }} />
      </div>
    </div>
  )
}

import { chapters } from '../content/content'
import { canAccess, isComplete } from '../state/storyState'
import { useStory } from '../state/StoryContext'
import { SharedButton } from './SharedButton'

/** Previous / Next controls, with a clear reason and an escape hatch when locked. */
export function ChapterNavigation() {
  const { state, dispatch } = useStory()
  const { current } = state
  const last = chapters.length - 1
  const next = current + 1
  const canNext = current < last && canAccess(state, next)
  const blocked = current < last && !canNext
  const chapter = chapters[current]

  return (
    <nav className="chapter-nav" aria-label="Chapter navigation">
      <SharedButton
        variant="secondary"
        disabled={current === 0}
        onClick={() => dispatch({ type: 'goto', index: current - 1 })}
        aria-label={current > 0 ? `Back to chapter ${current}: ${chapters[current - 1].title}` : 'Back'}
      >
        ← Back
      </SharedButton>

      <div className="chapter-nav__mid" aria-live="polite">
        {blocked && !isComplete(state, current) && (
          <>
            <span className="chapter-nav__hint">{chapters[next].lockedHint}</span>
            <button
              type="button"
              className="link-button"
              onClick={() => dispatch({ type: 'skip', chapter: chapter.id })}
            >
              Skip this part
            </button>
          </>
        )}
      </div>

      <SharedButton
        disabled={!canNext}
        onClick={() => dispatch({ type: 'goto', index: next })}
        aria-label={current < last ? `Next: chapter ${next + 1}, ${chapters[next].title}` : 'Next'}
      >
        Next →
      </SharedButton>
    </nav>
  )
}

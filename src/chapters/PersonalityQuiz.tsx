import { OUTCOME_PRIORITY, quizIntro, quizQuestions } from '../content/content'
import { scoreQuiz } from '../state/quizScoring'
import { SharedButton } from '../components/SharedButton'
import { useStory } from '../state/StoryContext'
import { PersonalityResult } from './PersonalityResult'

/** Chapter 5 — one question at a time, real scoring, no randomness. */
export function PersonalityQuiz() {
  const { state, dispatch } = useStory()
  const { quizStep: step, quizAnswers: answers, quizDone } = state
  const total = quizQuestions.length
  const q = quizQuestions[step]
  const chosen = answers[q.id]
  const isLast = step === total - 1
  const answeredCount = quizQuestions.filter((x) => answers[x.id]).length

  if (quizDone) {
    // Scoring: add each chosen option's points per outcome; highest total wins.
    const { outcome } = scoreQuiz(quizQuestions, answers, OUTCOME_PRIORITY)
    return (
      <section className="chapter chapter--quiz" aria-labelledby="quiz-title">
        <header className="chapter__head">
          <p className="hand chapter__kicker">all done</p>
          <h2 id="quiz-title" className="display chapter__title">
            Little things about you
          </h2>
        </header>
        <PersonalityResult outcome={outcome} onRestart={() => dispatch({ type: 'restartQuiz' })} />
      </section>
    )
  }

  return (
    <section className="chapter chapter--quiz" aria-labelledby="quiz-title">
      <header className="chapter__head">
        <p className="hand chapter__kicker">no wrong answers</p>
        <h2 id="quiz-title" className="display chapter__title">
          {quizIntro.heading}
        </h2>
        <p className="chapter__lede">{quizIntro.body}</p>
      </header>

      <div className="paper quiz">
        <div className="quiz__progress" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step + 1} aria-label="Quiz progress">
          <span style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
        <p className="quiz__count">
          Question {step + 1} of {total}
        </p>

        <fieldset className="quiz__fieldset" key={q.id}>
          <legend className="quiz__prompt display">{q.prompt}</legend>
          <div className="quiz__options">
            {q.options.map((o) => {
              const selected = chosen === o.id
              return (
                // Native radio inputs give arrow-key navigation and screen-reader support for free.
                <label key={o.id} className={`choice ${selected ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    className="sr-only"
                    name={`q-${q.id}`}
                    value={o.id}
                    checked={selected}
                    onChange={() => dispatch({ type: 'answer', questionId: q.id, optionId: o.id })}
                  />
                  <span className="choice__dot" aria-hidden="true" />
                  <span>{o.text}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="quiz__nav">
          <SharedButton variant="secondary" disabled={step === 0} onClick={() => dispatch({ type: 'quizStep', step: step - 1 })}>
            ← Previous
          </SharedButton>
          {isLast ? (
            <SharedButton disabled={answeredCount < total} onClick={() => dispatch({ type: 'finishQuiz' })}>
              See my result
            </SharedButton>
          ) : (
            <SharedButton disabled={!chosen} onClick={() => dispatch({ type: 'quizStep', step: step + 1 })}>
              Next →
            </SharedButton>
          )}
        </div>
      </div>
    </section>
  )
}

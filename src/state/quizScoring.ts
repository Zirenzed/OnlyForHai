import type { OutcomeId, QuizQuestion } from '../content/types'

export type Answers = Record<string, string> // questionId -> optionId
export type Totals = Record<OutcomeId, number>

/**
 * Add up the points from every answered question.
 *
 * Each option carries a `score` map such as `{ sunbeam: 2, wildflower: 1 }`.
 * We walk through the answers, look up the chosen option, and add its points
 * to a running total for each outcome. Unanswered questions add nothing.
 */
export function tally(questions: QuizQuestion[], answers: Answers, outcomeIds: OutcomeId[]): Totals {
  const totals = Object.fromEntries(outcomeIds.map((id) => [id, 0])) as Totals
  for (const q of questions) {
    const chosen = q.options.find((o) => o.id === answers[q.id])
    if (!chosen) continue
    for (const [outcome, points] of Object.entries(chosen.score)) {
      totals[outcome as OutcomeId] += points ?? 0
    }
  }
  return totals
}

/**
 * Pick the winning outcome: the highest total.
 * If two or more outcomes tie, the one listed first in `priority` wins,
 * so the same answers always give the same result (nothing is random).
 */
export function pickOutcome(totals: Totals, priority: OutcomeId[]): OutcomeId {
  let best = priority[0]
  for (const id of priority) {
    if (totals[id] > totals[best]) best = id
  }
  return best
}

export function scoreQuiz(
  questions: QuizQuestion[],
  answers: Answers,
  priority: OutcomeId[],
): { totals: Totals; outcome: OutcomeId } {
  const totals = tally(questions, answers, priority)
  return { totals, outcome: pickOutcome(totals, priority) }
}

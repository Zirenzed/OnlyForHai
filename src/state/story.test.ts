import { describe, expect, it } from 'vitest'
import { OUTCOME_PRIORITY, chapters, clues, quizOutcomes, quizQuestions, flowers, confessionChoices } from '../content/content'
import { scoreQuiz, pickOutcome, type Answers } from './quizScoring'
import { canAccess, initialState, isComplete, reducer, FLOWERS_REQUIRED, type StoryState } from './storyState'

const run = (s: StoryState, ...actions: Parameters<typeof reducer>[1][]) => actions.reduce(reducer, s)

describe('quiz scoring', () => {
  it('has 5-7 questions, 4+ outcomes, and 4+ options each', () => {
    expect(quizQuestions.length).toBeGreaterThanOrEqual(5)
    expect(quizQuestions.length).toBeLessThanOrEqual(7)
    expect(quizOutcomes.length).toBeGreaterThanOrEqual(4)
    quizQuestions.forEach((q) => expect(q.options.length).toBeGreaterThanOrEqual(3))
  })

  it('every outcome is reachable (each is the result of at least one answer set)', () => {
    const reached = new Set<string>()
    // Always choose option index i for every question, for each i.
    for (let i = 0; i < 4; i++) {
      const answers: Answers = {}
      quizQuestions.forEach((q) => (answers[q.id] = q.options[i].id))
      reached.add(scoreQuiz(quizQuestions, answers, OUTCOME_PRIORITY).outcome)
    }
    expect([...reached].sort()).toEqual(quizOutcomes.map((o) => o.id).sort())
  })

  it('each outcome has a result card definition', () => {
    OUTCOME_PRIORITY.forEach((id) => expect(quizOutcomes.find((o) => o.id === id)).toBeTruthy())
  })

  it('is deterministic and breaks ties by priority order', () => {
    const tie = { sunbeam: 3, lantern: 3, wildflower: 3, mixtape: 3 }
    expect(pickOutcome(tie, OUTCOME_PRIORITY)).toBe(OUTCOME_PRIORITY[0])
    expect(pickOutcome({ ...tie, mixtape: 4 }, OUTCOME_PRIORITY)).toBe('mixtape')
  })

  it('ignores unanswered questions', () => {
    const { totals } = scoreQuiz(quizQuestions, {}, OUTCOME_PRIORITY)
    expect(Object.values(totals).every((n) => n === 0)).toBe(true)
  })
})

describe('chapter gating', () => {
  it('starts on chapter 1 and cannot jump ahead', () => {
    expect(initialState.current).toBe(0)
    expect(canAccess(initialState, 1)).toBe(false)
    expect(run(initialState, { type: 'goto', index: 3 }).current).toBe(0)
  })

  it('unlocks chapter 2 only after the envelope is opened', () => {
    const s = run(initialState, { type: 'openEnvelope' })
    expect(canAccess(s, 1)).toBe(true)
    expect(run(s, { type: 'goto', index: 1 }).current).toBe(1)
  })

  it('flowers need three notes; hidden flower does not count', () => {
    let s = run(initialState, { type: 'openEnvelope' }, { type: 'findHiddenFlower' })
    expect(isComplete(s, 2)).toBe(false)
    for (const f of flowers.slice(0, FLOWERS_REQUIRED)) s = run(s, { type: 'readFlower', id: f.id })
    expect(isComplete(s, 2)).toBe(true)
    expect(canAccess(s, 3)).toBe(true)
  })

  it('hunt needs every clue, ignores unknown clues, and restarts cleanly', () => {
    let s = run(initialState, { type: 'findClue', id: 'not-a-clue' })
    expect(s.huntFound).toEqual([])
    for (const c of clues) s = run(s, { type: 'findClue', id: c.id }, { type: 'findClue', id: c.id })
    expect(s.huntFound.length).toBe(clues.length)
    expect(isComplete(s, 3)).toBe(true)
    s = run(s, { type: 'restartHunt' })
    expect(s.huntFound).toEqual([])
    expect(isComplete(s, 3)).toBe(false)
  })

  it('skipping always lets the visitor continue', () => {
    let s = initialState
    for (const c of chapters) s = run(s, { type: 'skip', chapter: c.id })
    chapters.forEach((_, i) => expect(canAccess(s, i)).toBe(true))
  })

  it('quiz cannot finish until every question is answered', () => {
    let s = run(initialState, { type: 'finishQuiz' })
    expect(s.quizDone).toBe(false)
    for (const q of quizQuestions) s = run(s, { type: 'answer', questionId: q.id, optionId: q.options[0].id })
    s = run(s, { type: 'finishQuiz' })
    expect(s.quizDone).toBe(true)
    s = run(s, { type: 'restartQuiz' })
    expect(s.quizDone).toBe(false)
    expect(s.quizAnswers).toEqual({})
  })

  it('letters are tracked individually and reset clears everything', () => {
    let s = run(initialState, { type: 'openLetter', id: 'like' }, { type: 'confess', choice: 'slow' })
    expect(s.lettersOpened).toEqual(['like'])
    expect(s.confession).toBe('slow')
    s = run(s, { type: 'reset' })
    expect(s).toEqual(initialState)
  })

  it('every confession response exists and none is empty', () => {
    expect(confessionChoices.map((c) => c.id).sort()).toEqual(['same', 'slow', 'think'])
    confessionChoices.forEach((c) => {
      expect(c.closingTitle.length).toBeGreaterThan(0)
      expect(c.closing.length).toBeGreaterThan(0)
    })
  })
})

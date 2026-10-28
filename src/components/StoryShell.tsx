import { useEffect, useRef, type ReactNode } from 'react'
import { chapters, site } from '../content/content'
import { useStory } from '../state/StoryContext'
import { ChapterNavigation } from './ChapterNavigation'
import { ProgressIndicator } from './ProgressIndicator'
import { ReplayControl } from './ReplayControl'
import { EnvelopeIntro } from '../chapters/EnvelopeIntro'
import { MixtapePlayer } from '../chapters/MixtapePlayer'
import { FlowerDiary } from '../chapters/FlowerDiary'
import { SecretHunt } from '../chapters/SecretHunt'
import { PersonalityQuiz } from '../chapters/PersonalityQuiz'
import { LetterCollection } from '../chapters/LetterCollection'
import { FinalConfession } from '../chapters/FinalConfession'
import { Star } from '../art/Art'

function renderChapter(index: number): ReactNode {
  switch (chapters[index].id) {
    case 'gift':
      return <EnvelopeIntro />
    case 'songs':
      return <MixtapePlayer />
    case 'flowers':
      return <FlowerDiary />
    case 'hunt':
      return <SecretHunt />
    case 'quiz':
      return <PersonalityQuiz />
    case 'letters':
      return <LetterCollection />
    case 'between':
      return <FinalConfession />
  }
}

/** The frame around every chapter: header, progress, the chapter itself, navigation. */
export function StoryShell() {
  const { state, runKey } = useStory()
  const { current } = state
  const chapter = chapters[current]
  const mainRef = useRef<HTMLElement>(null)
  const first = useRef(true)
  const dark = chapter.id === 'hunt' || chapter.id === 'between'

  // After changing chapter: scroll to top and move focus to the chapter, so
  // keyboard and screen-reader users land at the start of the new page.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    window.scrollTo({ top: 0 })
    mainRef.current?.focus({ preventScroll: true })
  }, [current, runKey])

  useEffect(() => {
    document.title = `${chapter.title} · ${site.title}`
  }, [chapter.title])

  return (
    <div className={`shell ${dark ? 'shell--dark' : ''}`} data-chapter={chapter.id}>
      <a className="skip-link" href="#story">
        Skip to the story
      </a>
      <header className="shell__top">
        <ProgressIndicator />
        <p className="shell__title hand">
          {chapter.title} <span lang="th">· {chapter.thai}</span>
        </p>
      </header>

      <main id="story" ref={mainRef} tabIndex={-1} className="shell__main">
        <div className="shell__page" key={`${chapter.id}-${runKey}`}>
          {renderChapter(current)}
        </div>
      </main>

      <footer className="shell__foot">
        <ChapterNavigation />
        <div className="shell__meta">
          <ReplayControl />
          <Star className="shell__star" />
          <span>Nothing here is saved or sent anywhere.</span>
        </div>
      </footer>
    </div>
  )
}

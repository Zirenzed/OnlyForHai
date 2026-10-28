import { useId, useState } from 'react'
import type { LetterContent } from '../content/types'
import { Marigold } from '../art/Art'

interface Props {
  letter: LetterContent
  index: number
  onOpened: () => void
}

/** One cream envelope with a tangerine seal. Open it, close it, open it again. */
export function InteractiveEnvelope({ letter, index, onOpened }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const tilt = [-1.4, 1, -0.6][index % 3]

  const toggle = () => {
    setOpen((o) => {
      if (!o) onOpened()
      return !o
    })
  }

  return (
    <li className={`mail ${open ? 'is-open' : ''}`} style={{ ['--tilt' as string]: `${tilt}deg` }}>
      <button type="button" className="mail__btn" aria-expanded={open} aria-controls={panelId} onClick={toggle}>
        <span className="mail__env" aria-hidden="true">
          <span className="mail__flap" />
          <span className="mail__pocket" />
          <span className="mail__seal">
            <Marigold className="mail__seal-art" />
          </span>
        </span>
        <span className="mail__caption">
          <span className="hand mail__no">letter {index + 1}</span>
          <span className="mail__theme">{letter.theme}</span>
          <span className="mail__action">{open ? 'Close the letter' : 'Tap to open'}</span>
        </span>
      </button>

      <div id={panelId} role="region" aria-label={letter.heading} hidden={!open}>
        {open && (
          <article className="paper mail__letter">
            <h3 className="hand mail__heading">{letter.heading}</h3>
            {letter.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="hand mail__signoff">{letter.signoff}</p>
          </article>
        )}
      </div>
    </li>
  )
}

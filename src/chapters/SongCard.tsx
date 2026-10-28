import { Cassette } from '../art/Art'
import type { Song } from '../content/types'

interface Props {
  song: Song
  index: number
  selected: boolean
  onSelect: () => void
}

/** One handmade tape: cream label, tangerine reels, a sticker and a personal note. */
export function SongCard({ song, index, selected, onSelect }: Props) {
  const tilt = [-1.6, 1.2, -0.8, 1.8][index % 4]
  return (
    <li className="tape" style={{ ['--tilt' as string]: `${tilt}deg` }}>
      <button
        type="button"
        className={`tape__btn ${selected ? 'is-selected' : ''}`}
        aria-pressed={selected}
        onClick={onSelect}
        aria-label={`${song.title} by ${song.artist}. ${selected ? 'Selected' : 'Select to load the player'}`}
      >
        <Cassette className="tape__art" selected={selected} />
        <span className="tape__label">
          <span className="tape__side hand">A{index + 1}</span>
          <span className="tape__title">{song.title}</span>
          <span className="tape__artist">{song.artist}</span>
        </span>
        <span className="tape__sticker hand" aria-hidden="true">
          {song.sticker}
        </span>
      </button>
      <p className="tape__note">{song.note}</p>
    </li>
  )
}

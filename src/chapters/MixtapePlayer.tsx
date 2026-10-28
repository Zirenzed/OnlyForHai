import { useEffect, useState } from 'react'
import { songs, songsIntro } from '../content/content'
import { useStory } from '../state/StoryContext'
import { SongCard } from './SongCard'

const LOAD_TIMEOUT_MS = 9000

/** Official Spotify embed. Mounted only after a tape is picked, never autoplays. */
function SpotifyEmbed({ spotifyId, title }: { spotifyId: string; title: string }) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>(
    typeof navigator !== 'undefined' && navigator.onLine === false ? 'failed' : 'loading',
  )

  useEffect(() => {
    if (status !== 'loading') return
    const t = window.setTimeout(() => setStatus((s) => (s === 'loading' ? 'failed' : s)), LOAD_TIMEOUT_MS)
    return () => window.clearTimeout(t)
  }, [status])

  const url = `https://open.spotify.com/track/${spotifyId}`
  return (
    <div className="player__embed">
      {status !== 'failed' && (
        <iframe
          title={`Spotify player: ${title}`}
          src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator`}
          width="100%"
          height="152"
          loading="lazy"
          allow="encrypted-media; clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('failed')}
        />
      )}
      {status === 'loading' && <p className="player__status hand">tuning in…</p>}
      {status === 'failed' && (
        <p className="player__fallback" role="status">
          {songsIntro.fallback}{' '}
          <a href={url} target="_blank" rel="noopener noreferrer">
            Open it in Spotify
          </a>
          .
        </p>
      )}
      {status !== 'failed' && (
        <a className="player__link" href={url} target="_blank" rel="noopener noreferrer">
          Open in Spotify ↗
        </a>
      )}
    </div>
  )
}

/** Chapter 2 — four tapes. Picking one loads its player below. */
export function MixtapePlayer() {
  const { state, dispatch } = useStory()
  const selected = songs.find((s) => s.id === state.selectedSong) ?? null

  return (
    <section className="chapter chapter--songs" aria-labelledby="songs-title">
      <header className="chapter__head">
        <p className="hand chapter__kicker">side A</p>
        <h2 id="songs-title" className="display chapter__title">
          Songs I kept for you
        </h2>
        <p className="chapter__lede">
          <strong>{songsIntro.heading}</strong> {songsIntro.body}
        </p>
      </header>

      <ul className="tapes">
        {songs.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            index={i}
            selected={song.id === state.selectedSong}
            onSelect={() => dispatch({ type: 'selectSong', id: song.id === state.selectedSong ? null : song.id })}
          />
        ))}
      </ul>

      <div className="player paper" aria-live="polite">
        {selected ? (
          <>
            <p className="player__now">
              <span className="hand">now on the deck</span> · {selected.title} — {selected.artist}
            </p>
            <SpotifyEmbed key={selected.id} spotifyId={selected.spotifyId} title={`${selected.title} by ${selected.artist}`} />
          </>
        ) : (
          <p className="player__empty hand">{songsIntro.pickPrompt}</p>
        )}
      </div>
    </section>
  )
}

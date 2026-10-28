# Somewhere Between a Song & a Secret

*A little world I made, just for you.* — a seven-chapter interactive gift site in **Tangerine × Cream × Brown**.
React 19 + Vite + TypeScript. No backend, no accounts, no analytics, no storage.

## Chapters

1. **A Little Gift for You** — tangerine envelope opens into a letter (skippable animation)
2. **Songs I Kept for You** — four mixtape cassettes, official Spotify embeds (never autoplay)
3. **Flowers I Never Gave You** — five clickable pressed flowers + one hidden sprig
4. **The Little Secret Hunt** — night-sky mini-game, 3 clues, hints, restart, skip
5. **Little Things About You** — 6-question scored quiz, 4 outcomes
6. **Letters I Never Sent** — three envelopes that open, close and reopen
7. **Somewhere Between Us** — the final letter and three equally kind replies

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the build locally
npm run lint
npm test           # scoring + chapter-gating unit tests (vitest)
```

Requires Node 20+.

## Customising (everything lives in one file)

Edit **`src/content/content.ts`**:

| What | Export |
| --- | --- |
| Site title, tagline, `to` / `from` names | `site` |
| Envelope intro letter | `gift` |
| Songs, Spotify IDs, personal notes | `songs` |
| Flower notes + hidden note | `flowers`, `hiddenFlower` |
| Secret-hunt clues and hidden letter | `clues`, `huntIntro` |
| Quiz questions, scores, results | `quizQuestions`, `quizOutcomes` |
| Letters | `letters` |
| Final letter and the three replies | `finale`, `confessionChoices` |

Sample text is placeholder copy; nothing about the recipient is invented. A Spotify track ID is the last part of a track URL (`open.spotify.com/track/<ID>`).

**Quiz scoring:** each option carries points per outcome; every answer's points are added up and the highest total wins. Ties go to the order in `OUTCOME_PRIORITY`. Code: `src/state/quizScoring.ts`.

**Colours:** the six palette values are CSS variables in `src/styles/tokens.css`; everything else is derived from them.

## Deploy to GitHub Pages

`vite.config.ts` uses `base: './'`, so it works at `user.github.io/` and `user.github.io/repo/`.

1. Push to a GitHub repo with `main` as the default branch.
2. **Settings → Pages → Source: GitHub Actions.**
3. Every push to `main` runs `.github/workflows/deploy.yml` (lint, test, build, deploy).

## Privacy

State is held in memory only and resets on reload. The app never uses `localStorage`, `sessionStorage` or cookies, and sends nothing anywhere. The only third-party requests are the Spotify embeds you choose to load; they receive no quiz or choice data.

## Structure

```
src/
  content/   content.ts (all copy) + types.ts
  state/     reducer, gating rules, quiz scoring, tests
  chapters/  one component per chapter + SongCard, FlowerMessage, PersonalityResult, InteractiveEnvelope
  components/ StoryShell, ChapterNavigation, ProgressIndicator, ReplayControl, SharedButton, SharedModal
  art/       original SVG flowers, cassette, stamps, washi tape
  styles/    tokens, art, base, chapters
```

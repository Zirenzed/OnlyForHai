/**
 * ✎ EDIT ME ✎
 * Every word, song, quiz question, letter and flower note lives in this file.
 * All text below is sample copy, written without assuming anything about the
 * person who will read it. Replace it with your own words.
 */
import type {
  ChapterMeta,
  Song,
  FlowerNote,
  HiddenNote,
  Clue,
  QuizQuestion,
  QuizOutcome,
  LetterContent,
  ConfessionChoice,
  OutcomeId,
} from './types'

export const site = {
  title: 'Somewhere Between a Song & a Secret',
  tagline: 'A little world I made, just for you.',
  /** Appears on the envelope and at the end of letters. Change to your own name. */
  from: 'me',
  /** Appears on the envelope. Leave blank to show a small heart-less flourish. */
  to: 'you',
}

export const chapters: ChapterMeta[] = [
  { id: 'gift', title: 'A Little Gift for You', thai: 'ของขวัญเล็ก ๆ', lockedHint: 'Open the envelope first.' },
  { id: 'songs', title: 'Songs I Kept for You', thai: 'เพลงที่เก็บไว้ให้', lockedHint: 'Finish the earlier chapters first.' },
  { id: 'flowers', title: 'Flowers I Never Gave You', thai: 'ดอกไม้ที่ยังไม่ได้ให้', lockedHint: 'Finish the earlier chapters first.' },
  { id: 'hunt', title: 'The Little Secret Hunt', thai: 'ตามหาความลับเล็ก ๆ', lockedHint: 'Read a few flower notes first (or skip ahead).' },
  { id: 'quiz', title: 'Little Things About You', thai: 'เรื่องเล็ก ๆ เกี่ยวกับเธอ', lockedHint: 'Find the secrets first (or skip ahead).' },
  { id: 'letters', title: 'Letters I Never Sent', thai: 'จดหมายที่ไม่เคยส่ง', lockedHint: 'Finish the quiz first (or skip ahead).' },
  { id: 'between', title: 'Somewhere Between Us', thai: 'ระหว่างเรา', lockedHint: 'Open at least one letter first (or skip ahead).' },
]

/* ───────────── Chapter 1 ───────────── */
export const gift = {
  handwritten: 'psst — this is for you.',
  intro: 'I made you something small. It took a few evenings, a lot of songs, and more flowers than I want to admit.',
  tapHint: 'Tap the envelope',
  letterGreeting: 'Hi,',
  letterBody:
    'There are some things I find easier to make than to say. So I made a little world — a few songs, a handful of flowers, a couple of secrets. Take your time wandering through it.',
  cta: 'Open your little world',
}

/* ───────────── Chapter 2 ───────────── */
/**
 * Titles and artists are exactly as supplied. Spotify track IDs power the
 * official embed. `note` and `sticker` are personal sample text — rewrite them.
 */
export const songs: Song[] = [
  {
    id: 'yeud',
    title: 'ยืด',
    artist: 'KS, FOMEO',
    spotifyId: '5hSAMX0YTjCOeGrZcN1za2',
    note: 'The one I hum when a day stretches out longer than planned.',
    sticker: 'slow day',
  },
  {
    id: 'khun-ja-chop',
    title: 'คุณจะชอบผมไหม',
    artist: 'Serious bacon, gorn',
    spotifyId: '7ApNdlOBsjvmG4IiRZEpuP',
    note: 'A little nervous, a little hopeful. The title says it better than I can.',
    sticker: 'hmm?',
  },
  {
    id: 'one-to-hundred',
    title: '1-100',
    artist: 'Tattoo Colour',
    spotifyId: '5IZqeGVtJIdESgYhvixsMN',
    note: 'For the kind of evening where you count the stars and lose track.',
    sticker: 'count with me',
  },
  {
    id: 'oasis',
    title: 'Oasis',
    artist: 'atom chanakan, D Gerrard',
    spotifyId: '0vhuUxZ2J94B1Fcv9jI7UL',
    note: 'Somewhere quiet to rest. This one feels like that.',
    sticker: 'rest here',
  },
]

export const songsIntro = {
  heading: 'Four tapes, side A only.',
  body: 'Press play only if you feel like it. Nothing starts on its own.',
  pickPrompt: 'Pick a tape to hear it.',
  fallback: 'The player could not load here.',
}

/* ───────────── Chapter 3 ───────────── */
export const flowerIntro = {
  heading: 'Flowers I never gave you',
  body: 'A diary page of pressed things. Touch a flower to read what I wrote beside it.',
  gateHint: 'Read three notes to carry on — or skip ahead.',
}

export const flowers: FlowerNote[] = [
  {
    id: 'marigold',
    kind: 'marigold',
    label: 'Marigold',
    botanical: 'Tagetes · "for the sunny days"',
    message: 'You make ordinary afternoons feel a little more golden. I noticed that early on.',
  },
  {
    id: 'cosmos',
    kind: 'cosmos',
    label: 'Orange cosmos',
    botanical: 'Cosmos sulphureus · "for the quiet"',
    message: 'I like that conversations with you can go quiet and still feel comfortable.',
  },
  {
    id: 'dandelion',
    kind: 'dandelion',
    label: 'Dandelion',
    botanical: 'Taraxacum · "for the wishes"',
    message: 'I blew on one of these once and, yes, I wished about you. Slightly embarrassing. Mostly true.',
  },
  {
    id: 'poppy',
    kind: 'poppy',
    label: 'Poppy',
    botanical: 'Eschscholzia · "for the brave bits"',
    message: 'Making this took some courage. You are worth a little courage.',
  },
  {
    id: 'zinnia',
    kind: 'zinnia',
    label: 'Zinnia',
    botanical: 'Zinnia elegans · "for the long goodbyes"',
    message: 'Whenever we say goodnight, I find myself wishing the conversation had one more page.',
  },
]

export const hiddenFlower: HiddenNote = {
  label: 'A pressed sprig, tucked in the margin',
  message: 'You found the little one. I hid it for the kind of person who looks closely — I think that is you.',
}

/* ───────────── Chapter 4 ───────────── */
export const huntIntro = {
  heading: 'The little secret hunt',
  body: 'Three small things are hiding in this night sky. Tap what looks right. Hints are there if you want them.',
  decoy: 'Just a star. Keep looking.',
  unlockedTitle: 'A note, kept in the dark',
  unlockedLetter: [
    'You looked closely, and that is exactly the kind of thing I like about you.',
    'Some of my favourite moments lately have been small ones: a late reply, a song you liked, a joke that landed. I wanted to put a few of them somewhere safe.',
  ],
  skipLabel: 'Skip the hunt and open the note',
  skippedNote: 'No pressure. Secrets are for fun. Here is the note anyway.',
}

export const clues: Clue[] = [
  {
    id: 'moon',
    name: 'The crescent moon',
    hint: 'Something that stays up late with everyone who cannot sleep.',
    found: 'The moon. It keeps the best secrets.',
    x: 78,
    y: 17,
  },
  {
    id: 'bright-star',
    name: 'The orange star',
    hint: 'One star among the white ones is warmer than the rest.',
    found: 'The warm star. A little different, and a little brighter for it.',
    x: 24,
    y: 30,
  },
  {
    id: 'cassette',
    name: 'The lost cassette',
    hint: 'Something left on the hill — it plays songs, not stars.',
    found: 'A tiny cassette in the grass. Side A is probably for you.',
    x: 52,
    y: 82,
  },
]

/* ───────────── Chapter 5 ───────────── */
export const quizIntro = {
  heading: 'Little things about you',
  body: 'Six small questions, no wrong answers. I am curious how you see yourself.',
  gateHint: 'Finish the quiz to carry on — or skip ahead.',
}

/**
 * Each option adds points to one or more outcomes. The outcome with the highest
 * total wins. Ties are broken by the order in `OUTCOME_PRIORITY` (see below).
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'morning',
    prompt: 'An unplanned free morning. What happens?',
    options: [
      { id: 'a', text: 'I get up early and chase the light.', score: { sunbeam: 2, wildflower: 1 } },
      { id: 'b', text: 'Slow coffee, and nowhere to be.', score: { lantern: 2, mixtape: 1 } },
      { id: 'c', text: 'I wander somewhere I have never been.', score: { wildflower: 2, sunbeam: 1 } },
      { id: 'd', text: 'Headphones on, and I let a playlist decide.', score: { mixtape: 2, lantern: 1 } },
    ],
  },
  {
    id: 'weather',
    prompt: 'Pick a kind of weather to live in.',
    options: [
      { id: 'a', text: 'Golden hour, all day.', score: { sunbeam: 2, mixtape: 1 } },
      { id: 'b', text: 'Soft rain on a window.', score: { lantern: 2, mixtape: 1 } },
      { id: 'c', text: 'A breezy field.', score: { wildflower: 2, lantern: 1 } },
      { id: 'd', text: 'A warm night with the radio low.', score: { mixtape: 2, sunbeam: 1 } },
    ],
  },
  {
    id: 'friends',
    prompt: 'In a group, you are most likely to be…',
    options: [
      { id: 'a', text: 'The one who gets everyone laughing.', score: { sunbeam: 2, wildflower: 1 } },
      { id: 'b', text: 'The one who notices who is quiet.', score: { lantern: 2, wildflower: 1 } },
      { id: 'c', text: 'The one suggesting a spontaneous detour.', score: { wildflower: 2, sunbeam: 1 } },
      { id: 'd', text: 'The one holding the aux cord.', score: { mixtape: 2, sunbeam: 1 } },
    ],
  },
  {
    id: 'gift',
    prompt: 'Your ideal small gift is…',
    options: [
      { id: 'a', text: 'A plant that will bloom soon.', score: { wildflower: 2, lantern: 1 } },
      { id: 'b', text: 'A handwritten note.', score: { lantern: 2, mixtape: 1 } },
      { id: 'c', text: 'A playlist made just for me.', score: { mixtape: 2, wildflower: 1 } },
      { id: 'd', text: 'A surprise day out.', score: { sunbeam: 2, wildflower: 1 } },
    ],
  },
  {
    id: 'evening',
    prompt: 'It is 9 p.m. Where are you happiest?',
    options: [
      { id: 'a', text: 'Out, and still full of energy.', score: { sunbeam: 2, mixtape: 1 } },
      { id: 'b', text: 'Home, with a candle and a book.', score: { lantern: 2, wildflower: 1 } },
      { id: 'c', text: 'On a walk with no destination.', score: { wildflower: 2, lantern: 1 } },
      { id: 'd', text: 'In the dark, with one favourite song on repeat.', score: { mixtape: 2, lantern: 1 } },
    ],
  },
  {
    id: 'word',
    prompt: 'Choose the word that feels most like you today.',
    options: [
      { id: 'a', text: 'Bright', score: { sunbeam: 2 } },
      { id: 'b', text: 'Steady', score: { lantern: 2 } },
      { id: 'c', text: 'Curious', score: { wildflower: 2 } },
      { id: 'd', text: 'Dreamy', score: { mixtape: 2 } },
    ],
  },
]

/** Order used to break ties: earlier entries win. Change it if you like. */
export const OUTCOME_PRIORITY: OutcomeId[] = ['sunbeam', 'lantern', 'wildflower', 'mixtape']

export const quizOutcomes: QuizOutcome[] = [
  {
    id: 'sunbeam',
    title: 'The Sunbeam',
    thai: 'แสงแดดยามเช้า',
    explanation: 'You bring warmth wherever you land. People relax around you, and rooms feel brighter once you arrive.',
    message: 'Sunbeam is a very easy person to be around. I would know.',
  },
  {
    id: 'lantern',
    title: 'The Lantern',
    thai: 'โคมไฟดวงเล็ก',
    explanation: 'Calm, thoughtful, quietly steady. You notice the small things and make people feel safe enough to say them out loud.',
    message: 'Lantern is the kind of light I would walk toward.',
  },
  {
    id: 'wildflower',
    title: 'The Wildflower',
    thai: 'ดอกไม้ป่า',
    explanation: 'Curious and a little untamed. You grow in unexpected places and make them better for it.',
    message: 'Wildflowers are my favourite kind. Just so you know.',
  },
  {
    id: 'mixtape',
    title: 'The Mixtape',
    thai: 'เทปมิกซ์',
    explanation: 'Dreamy and layered. You have a song for every mood and a feeling behind every song.',
    message: 'I would happily make you a tape, any time.',
  },
]

/* ───────────── Chapter 6 ───────────── */
export const lettersIntro = {
  heading: 'Letters I never sent',
  body: 'Three envelopes. Open one, or all of them, whenever you like.',
  gateHint: 'Open at least one letter to carry on — or skip ahead.',
}

export const letters: LetterContent[] = [
  {
    id: 'like',
    theme: 'Little things I like about you',
    heading: 'Little things I like about you',
    paragraphs: [
      'The way you answer a question properly, even a silly one.',
      'How you laugh a half-second before the joke ends, like you cannot wait.',
      'That you pay attention. I notice that, and I am grateful for it.',
    ],
    signoff: 'More soon, maybe.',
  },
  {
    id: 'almost',
    theme: 'Things I almost said',
    heading: 'Things I almost said',
    paragraphs: [
      'I almost told you that I looked forward to your messages more than I let on.',
      'I almost asked whether you wanted to hear the song that reminded me of you. (Now you can, back in chapter two.)',
      'I almost kept this entire thing to myself. I am glad I did not.',
    ],
    signoff: 'Slightly braver now.',
  },
  {
    id: 'wish',
    theme: 'A small wish for us',
    heading: 'A small wish for us',
    paragraphs: [
      'I wish for more unhurried conversations, the kind that start at seven and end somewhere near midnight.',
      'I wish for a day where we get to hear each other say the things that are hard to type.',
      'And I wish only to keep getting to know you, at whatever pace feels right for you.',
    ],
    signoff: 'Warmly,',
  },
]

/* ───────────── Chapter 7 ───────────── */
export const finale = {
  heading: 'Somewhere between us',
  openLabel: 'Unfold the letter',
  letter: [
    'I made this little place because there are some things I find easier to write than say out loud.',
    'I like having you in my days, and I wanted you to know that.',
    'You do not have to answer in any particular way. I am just happy I got to tell you.',
  ],
  signoff: 'With warmth,',
  promptLabel: 'However you feel, there is a place for it here:',
  replayLabel: 'Wander through again',
}

export const confessionChoices: ConfessionChoice[] = [
  {
    id: 'same',
    label: 'I feel the same.',
    closingTitle: 'Oh. That makes my whole week.',
    closing: [
      'Thank you for telling me. Truly.',
      'There is no rush from here, and no script. We can just keep being us, and see what it becomes.',
    ],
  },
  {
    id: 'slow',
    label: 'Can we take our time?',
    closingTitle: 'Of course we can.',
    closing: [
      'Slow sounds good to me. There is nothing I need to hurry.',
      'I like where we are, and I am happy to keep walking at your pace.',
    ],
  },
  {
    id: 'think',
    label: 'I need a little time to think.',
    closingTitle: 'Take all the time you need.',
    closing: [
      'Thank you for being honest with me. That means a lot, and I mean it.',
      'There is no deadline and nothing you owe me. I am glad we got to this place together, whatever comes next.',
    ],
  },
]

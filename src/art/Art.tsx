/**
 * Original hand-built SVG illustrations. Colours come from CSS classes that
 * read the design tokens (see styles/art.css), so the palette stays in one place.
 */
import { useId } from 'react'

/** `at` = [centreX, centreY, size] places a flower inside another SVG. */
type Svg = { className?: string; title?: string; at?: [number, number, number] }

const place = (at?: [number, number, number]) =>
  at ? { x: at[0] - at[2] / 2, y: at[1] - at[2] / 2, width: at[2], height: at[2] } : {}

const a11y = (title?: string) => (title ? { role: 'img' as const, 'aria-label': title } : { 'aria-hidden': true as const })

/** Petal helper: n petals rotated around the origin. */
function Petals({ n, rx, ry, cy, cls }: { n: number; rx: number; ry: number; cy: number; cls: string }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} className={cls} rx={rx} ry={ry} cy={cy} transform={`rotate(${(360 / n) * i})`} />
      ))}
    </>
  )
}

export function Marigold({ className, title, at }: Svg) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} {...place(at)} {...a11y(title)}>
      <g className="stroke-brown" strokeWidth="1.4">
        <Petals n={14} rx={8} ry={19} cy={-26} cls="fill-peach" />
        <Petals n={12} rx={8} ry={16} cy={-20} cls="fill-tang" />
        <Petals n={9} rx={6.5} ry={12} cy={-13} cls="fill-tang-deep" />
      </g>
      <circle r="8" className="fill-cocoa" />
      <circle r="3" className="fill-peach" />
    </svg>
  )
}

export function Cosmos({ className, title, at }: Svg) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} {...place(at)} {...a11y(title)}>
      <g className="stroke-brown" strokeWidth="1.4">
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            className="fill-tang"
            d="M0 -6 C 9 -18 12 -34 8 -44 L 0 -39 L -8 -44 C -12 -34 -9 -18 0 -6 Z"
            transform={`rotate(${45 * i})`}
          />
        ))}
      </g>
      <circle r="7" className="fill-peach stroke-brown" strokeWidth="1.2" />
      <circle r="3" className="fill-cocoa" />
    </svg>
  )
}

export function Poppy({ className, title, at }: Svg) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} {...place(at)} {...a11y(title)}>
      <g className="stroke-brown" strokeWidth="1.4">
        {[0, 90, 180, 270].map((r) => (
          <path
            key={r}
            className="fill-tang"
            d="M0 0 C -26 -8 -34 -34 -12 -42 C 6 -46 22 -40 22 -22 C 22 -10 10 -2 0 0 Z"
            transform={`rotate(${r + 20})`}
          />
        ))}
      </g>
      <circle r="9" className="fill-peach stroke-brown" strokeWidth="1.2" />
      <g className="stroke-cocoa" strokeWidth="1.3" strokeLinecap="round">
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1="0" y1="-2" x2="0" y2="-9" transform={`rotate(${36 * i})`} />
        ))}
      </g>
    </svg>
  )
}

export function Zinnia({ className, title, at }: Svg) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} {...place(at)} {...a11y(title)}>
      <g className="stroke-brown" strokeWidth="1.3">
        <Petals n={16} rx={6.5} ry={14} cy={-31} cls="fill-tang-deep" />
        <Petals n={14} rx={6} ry={12} cy={-24} cls="fill-tang" />
        <Petals n={11} rx={5} ry={9} cy={-16} cls="fill-peach" />
        <Petals n={8} rx={4} ry={6} cy={-9} cls="fill-tang" />
      </g>
      <circle r="4.5" className="fill-cocoa" />
    </svg>
  )
}

export function Dandelion({ className, title, at }: Svg) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} {...place(at)} {...a11y(title)}>
      <g className="stroke-brown" strokeWidth="1" strokeLinecap="round" fill="none">
        {Array.from({ length: 22 }, (_, i) => {
          const r = (360 / 22) * i
          return (
            <g key={i} transform={`rotate(${r})`}>
              <line x1="0" y1="-5" x2="0" y2="-31" />
              <g transform="translate(0 -31)" className="stroke-brown">
                <line x1="0" y1="0" x2="-5" y2="-7" />
                <line x1="0" y1="0" x2="0" y2="-9" />
                <line x1="0" y1="0" x2="5" y2="-7" />
              </g>
            </g>
          )
        })}
      </g>
      <circle r="5.5" className="fill-peach stroke-brown" strokeWidth="1.2" />
    </svg>
  )
}

export function FlowerByKind({ kind, className, title }: { kind: string } & Omit<Svg, 'at'>) {
  switch (kind) {
    case 'cosmos':
      return <Cosmos className={className} title={title} />
    case 'poppy':
      return <Poppy className={className} title={title} />
    case 'zinnia':
      return <Zinnia className={className} title={title} />
    case 'dandelion':
      return <Dandelion className={className} title={title} />
    default:
      return <Marigold className={className} title={title} />
  }
}

/** Cream gingham ribbon pattern, reused by the bouquet and the diary page. */
export function GinghamDefs({ id }: { id: string }) {
  return (
    <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" className="fill-cream" />
      <rect width="4" height="8" className="fill-peach" opacity=".55" />
      <rect width="8" height="4" className="fill-peach" opacity=".55" />
    </pattern>
  )
}

/** Signature illustration: small bouquet tied with a gingham ribbon. */
export function Bouquet({ className, title }: Svg) {
  const gid = useId()
  return (
    <svg viewBox="0 0 220 260" className={className} {...a11y(title)}>
      <defs>
        <GinghamDefs id={gid} />
      </defs>
      <g className="stroke-brown" strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path d="M110 150 C 100 190 98 215 104 240" />
        <path d="M110 150 C 112 190 114 215 112 242" />
        <path d="M110 150 C 128 180 140 205 144 236" />
        <path d="M110 150 C 90 175 76 200 72 232" />
        <path d="M110 150 C 70 150 52 130 46 112" />
        <path d="M110 150 C 150 150 168 130 174 112" />
      </g>
      <g className="stroke-brown fill-leaf" strokeWidth="1.8">
        <path d="M104 205 C 80 195 66 205 60 218 C 80 224 98 218 104 205 Z" />
        <path d="M118 200 C 142 192 158 202 164 216 C 142 220 124 212 118 200 Z" />
      </g>
      <Cosmos at={[50, 112, 70]} />
      <Poppy at={[172, 112, 70]} />
      <Zinnia at={[110, 72, 112]} />
      <Marigold at={[110, 72, 66]} />
      {/* ribbon */}
      <g className="stroke-brown" strokeWidth="1.6">
        <path d="M88 188 L132 188 L128 210 L92 210 Z" fill={`url(#${gid})`} />
        <path d="M110 198 C 92 188 78 190 74 208 C 90 214 104 208 110 198 Z" fill={`url(#${gid})`} />
        <path d="M110 198 C 128 188 142 190 146 208 C 130 214 116 208 110 198 Z" fill={`url(#${gid})`} />
        <path d="M110 198 L 96 236 L 108 230 L 112 242 Z" fill={`url(#${gid})`} />
        <path d="M110 198 L 128 234 L 118 230 L 112 242 Z" fill={`url(#${gid})`} />
      </g>
      <circle cx="110" cy="198" r="5" className="fill-tang stroke-brown" strokeWidth="1.6" />
    </svg>
  )
}

/** Orange washi tape strip. */
export function Washi({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path className="fill-tang" opacity=".92" d="M2 4 L6 2 L4 8 L7 14 L3 20 L7 26 L2 28 L118 28 L114 22 L118 16 L113 10 L118 3 L112 2 Z" />
      <g className="stroke-cream" strokeWidth="2" opacity=".5">
        <line x1="16" y1="4" x2="6" y2="28" />
        <line x1="36" y1="4" x2="26" y2="28" />
        <line x1="56" y1="4" x2="46" y2="28" />
        <line x1="76" y1="4" x2="66" y2="28" />
        <line x1="96" y1="4" x2="86" y2="28" />
      </g>
    </svg>
  )
}

export function PaperClip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 80" className={className} aria-hidden="true">
      <path
        className="stroke-brown"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        d="M10 14 L10 58 C10 70 24 70 24 58 L24 16 C24 6 8 6 8 18 L8 56"
      />
    </svg>
  )
}

export function Stamp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 84" className={className} aria-hidden="true">
      <path
        className="fill-cream stroke-brown"
        strokeWidth="1.5"
        d="M4 4h6l3 -3 3 3h6l3 -3 3 3h6l3 -3 3 3h6l3 -3 3 3h6v6l3 3 -3 3v6l3 3 -3 3v6l3 3 -3 3v6l3 3 -3 3v6l3 3 -3 3v6h-6l-3 3 -3 -3h-6l-3 3 -3 -3h-6l-3 3 -3 -3h-6l-3 3 -3 -3h-6l-3 3 -3 -3h-6v-6l-3 -3 3 -3v-6l-3 -3 3 -3v-6l-3 -3 3 -3v-6l-3 -3 3 -3v-6l-3 -3 3 -3z"
      />
      <rect x="12" y="12" width="46" height="60" className="fill-tang" opacity=".35" />
      <Marigold at={[35, 38, 34]} />
      <text x="35" y="66" textAnchor="middle" className="fill-brown svg-hand" fontSize="9">
        for you
      </text>
    </svg>
  )
}

export function Cassette({ className, selected }: { className?: string; selected?: boolean }) {
  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden="true">
      <rect x="4" y="4" width="232" height="142" rx="12" className="fill-cassette stroke-brown" strokeWidth="2.5" />
      <rect x="22" y="16" width="196" height="70" rx="6" className="fill-cream stroke-brown" strokeWidth="1.6" />
      <rect x="62" y="96" width="116" height="40" rx="8" className="fill-peach stroke-brown" strokeWidth="1.6" />
      <g className={selected ? 'reel reel--spin' : 'reel'}>
        <g transform="translate(88 116)">
          <circle r="13" className="fill-cream stroke-brown" strokeWidth="1.6" />
          <g className="stroke-tang" strokeWidth="3" strokeLinecap="round">
            <line x1="0" y1="-8" x2="0" y2="8" />
            <line x1="-8" y1="0" x2="8" y2="0" />
          </g>
        </g>
        <g transform="translate(152 116)">
          <circle r="13" className="fill-cream stroke-brown" strokeWidth="1.6" />
          <g className="stroke-tang" strokeWidth="3" strokeLinecap="round">
            <line x1="0" y1="-8" x2="0" y2="8" />
            <line x1="-8" y1="0" x2="8" y2="0" />
          </g>
        </g>
      </g>
      <circle cx="16" cy="16" r="3" className="fill-brown" />
      <circle cx="224" cy="16" r="3" className="fill-brown" />
      <circle cx="16" cy="134" r="3" className="fill-brown" />
      <circle cx="224" cy="134" r="3" className="fill-brown" />
    </svg>
  )
}

export function Envelope({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 300 210" className={className} aria-hidden="true">
      <rect x="6" y="30" width="288" height="170" rx="6" className="fill-tang stroke-brown" strokeWidth="2.5" />
      <path d="M6 200 L150 110 L294 200" className="fill-none stroke-brown" strokeWidth="2" />
      <path d="M6 30 L150 128 L294 30" className="fill-tang-deep stroke-brown" strokeWidth="2" style={{ display: open ? 'none' : 'block' }} />
      <g className="seal" style={{ display: open ? 'none' : 'block' }}>
        <circle cx="150" cy="122" r="17" className="fill-cocoa" />
        <Marigold at={[150, 122, 26]} />
      </g>
    </svg>
  )
}

/** A crescent moon, for the secret hunt. */
export function Moon({ className }: { className?: string }) {
  return (
    <svg viewBox="-30 -30 60 60" className={className} aria-hidden="true">
      <path className="fill-cream stroke-peach" strokeWidth="1.5" d="M8 -24 A 24 24 0 1 0 8 24 A 19 19 0 1 1 8 -24 Z" />
    </svg>
  )
}

export function Star({ className, warm }: { className?: string; warm?: boolean }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden="true">
      <path
        className={warm ? 'fill-tang stroke-peach' : 'fill-cream stroke-peach'}
        strokeWidth="1"
        strokeLinejoin="round"
        d="M0 -10 L2.6 -2.8 L10 0 L2.6 2.8 L0 10 L-2.6 2.8 L-10 0 L-2.6 -2.8 Z"
      />
    </svg>
  )
}

export function TinyCassette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <rect x="2" y="2" width="56" height="36" rx="5" className="fill-peach stroke-cocoa" strokeWidth="2" />
      <rect x="8" y="7" width="44" height="14" rx="2" className="fill-cream stroke-cocoa" strokeWidth="1.2" />
      <circle cx="21" cy="29" r="4" className="fill-tang stroke-cocoa" strokeWidth="1.2" />
      <circle cx="39" cy="29" r="4" className="fill-tang stroke-cocoa" strokeWidth="1.2" />
    </svg>
  )
}

/** Hand-drawn little sprig used for the hidden flower note. */
export function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 70" className={className} aria-hidden="true">
      <path className="stroke-brown" fill="none" strokeWidth="2" strokeLinecap="round" d="M20 68 C 18 48 22 30 20 12" />
      <g className="fill-peach stroke-brown" strokeWidth="1.2">
        <ellipse cx="12" cy="30" rx="6" ry="3.5" transform="rotate(-35 12 30)" />
        <ellipse cx="28" cy="40" rx="6" ry="3.5" transform="rotate(35 28 40)" />
        <ellipse cx="13" cy="50" rx="6" ry="3.5" transform="rotate(-35 13 50)" />
      </g>
      <circle cx="20" cy="10" r="5" className="fill-tang stroke-brown" strokeWidth="1.4" />
    </svg>
  )
}

export function Heartless({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 12" className={className} aria-hidden="true">
      <path className="stroke-brown" fill="none" strokeWidth="1.6" strokeLinecap="round" d="M2 6 C 14 0 22 12 34 6 S 56 0 66 6 S 74 8 78 5" />
    </svg>
  )
}

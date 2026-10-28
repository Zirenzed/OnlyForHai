import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { SharedButton } from './SharedButton'

interface Props {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  closeLabel?: string
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Accessible modal: labelled dialog, focus moves in on open, Tab is trapped,
 * Escape and backdrop clicks close it, and focus returns to the opener.
 */
export function SharedModal({ open, title, onClose, children, closeLabel = 'Close' }: Props) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return
    openerRef.current = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? panel)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const firstEl = items[0]
      const lastEl = items[items.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }
    document.addEventListener('keydown', onKey, true)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = prevOverflow
      openerRef.current?.focus?.()
    }
  }, [open])

  if (!open) return null
  return createPortal(
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={panelRef} className="modal-panel" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <h3 id={titleId} className="modal-title">
          {title}
        </h3>
        <div className="modal-body">{children}</div>
        <SharedButton variant="secondary" onClick={onClose} className="modal-close">
          {closeLabel}
        </SharedButton>
      </div>
    </div>,
    document.body,
  )
}

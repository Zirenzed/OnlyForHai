import { FlowerByKind, Sprig } from '../art/Art'
import { SharedModal } from '../components/SharedModal'

interface Props {
  open: boolean
  onClose: () => void
  kind?: string
  label: string
  botanical?: string
  message: string
  hidden?: boolean
}

/** The note that unfolds beside a flower. Shared by the five flowers and the hidden sprig. */
export function FlowerMessage({ open, onClose, kind, label, botanical, message, hidden }: Props) {
  return (
    <SharedModal open={open} title={label} onClose={onClose} closeLabel="Back to the page">
      <div className="flower-note">
        {hidden ? <Sprig className="flower-note__art" /> : <FlowerByKind kind={kind ?? 'marigold'} className="flower-note__art" />}
        {botanical && <p className="flower-note__latin hand">{botanical}</p>}
        <p className="flower-note__text">{message}</p>
      </div>
    </SharedModal>
  )
}

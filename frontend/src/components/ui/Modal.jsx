import { useEffect, useRef } from 'react'

export function Modal({ open, title, children, footer, onClose, variant }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const previousFocus = document.activeElement
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return

      const dialog = closeButtonRef.current?.closest('[role="dialog"]')
      const focusable = [...(dialog?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) || [])]
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="app-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-dialog modal-dialog-centered" role="dialog" aria-modal="true" aria-labelledby="app-modal-title">
        <div className="modal-content">
          <div className={`modal-header ${variant === 'danger' ? 'bg-danger text-white' : ''}`}>
            <h2 className="modal-title" id="app-modal-title">{title}</h2>
            <button ref={closeButtonRef} type="button" className="close" onClick={onClose} aria-label="بستن">×</button>
          </div>
          <div className="modal-body">{children}</div>
          {footer ? <div className="modal-footer">{footer}</div> : null}
        </div>
      </div>
    </div>
  )
}

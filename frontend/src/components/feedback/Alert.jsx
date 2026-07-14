import { useState } from 'react'

const alertClasses = {
  success: 'alert-success',
  error: 'alert-danger',
  warning: 'alert-warning',
  info: 'alert-info',
}

export function Alert({ variant = 'info', children, dismissible = false, onDismiss }) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  function dismiss() {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div className={`alert ${alertClasses[variant]}`} role={variant === 'error' ? 'alert' : 'status'}>
      {dismissible ? (
        <button type="button" className="close" onClick={dismiss} aria-label="بستن">
          <span aria-hidden="true">×</span>
        </button>
      ) : null}
      {children}
    </div>
  )
}


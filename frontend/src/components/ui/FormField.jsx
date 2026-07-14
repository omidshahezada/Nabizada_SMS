import { FieldError } from '@/components/ui/FieldError'

export function FormField({ label, htmlFor, error, children }) {
  const errorId = `${htmlFor}-error`
  return (
    <div className="form-group">
      <label htmlFor={htmlFor} className="control-label">{label}</label>
      {children}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  )
}


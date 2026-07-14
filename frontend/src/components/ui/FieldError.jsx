export function FieldError({ id, children }) {
  if (!children) return null
  return <span id={id} className="invalid-feedback d-block" role="alert">{children}</span>
}


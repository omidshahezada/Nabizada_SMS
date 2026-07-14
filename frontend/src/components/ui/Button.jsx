const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  info: 'btn-info',
  danger: 'btn-danger',
  warning: 'btn-warning',
  link: 'btn-link',
}

export function Button({ variant = 'primary', loading = false, children, className = '', disabled, ...props }) {
  return (
    <button
      className={`btn ${variants[variant]} ${className}`.trim()}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <i className="fa fa-spinner fa-pulse ml-2" aria-hidden="true" /> : null}
      {children}
    </button>
  )
}


const badgeVariants = {
  primary: 'badge-primary',
  success: 'badge-success',
  info: 'badge-info',
  warning: 'badge-warning',
  danger: 'badge-danger',
  secondary: 'badge-secondary',
}

export function Badge({ variant = 'secondary', children }) {
  return <span className={`badge ${badgeVariants[variant]}`}>{children}</span>
}


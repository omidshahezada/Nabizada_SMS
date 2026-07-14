export function PageContainer({ children, className = '' }) {
  return <div className={`container-fluid ${className}`.trim()}>{children}</div>
}


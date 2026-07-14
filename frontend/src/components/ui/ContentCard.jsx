export function ContentCard({ title, children, footer, className = '' }) {
  return (
    <article className={`card ${className}`.trim()}>
      {title ? <div className="card-header"><h2 className="card-title">{title}</h2></div> : null}
      <div className="card-body">{children}</div>
      {footer ? <div className="card-footer">{footer}</div> : null}
    </article>
  )
}


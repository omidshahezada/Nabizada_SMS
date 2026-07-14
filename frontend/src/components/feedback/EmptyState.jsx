export function EmptyState({ title = 'اطلاعاتی موجود نیست', description }) {
  return (
    <div className="state-panel">
      <i className="fa fa-inbox state-panel__icon" aria-hidden="true" />
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
    </div>
  )
}


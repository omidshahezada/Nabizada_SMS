export function LoadingState({ label = 'در حال بارگذاری...' }) {
  return (
    <div className="state-panel" role="status">
      <i className="fa fa-spinner fa-pulse text-info" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}


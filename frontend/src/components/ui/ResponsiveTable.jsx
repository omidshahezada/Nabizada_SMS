export function ResponsiveTable({ caption, children, className = '' }) {
  return (
    <div className="table-responsive">
      <table className={`table ${className}`.trim()}>
        {caption ? <caption>{caption}</caption> : null}
        {children}
      </table>
    </div>
  )
}


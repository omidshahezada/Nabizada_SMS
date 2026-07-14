export function SidebarSection({ children, label }) {
  return (
    <section aria-label={label}>
      {label ? <p className="nav-header">{label}</p> : null}
      {children}
    </section>
  )
}


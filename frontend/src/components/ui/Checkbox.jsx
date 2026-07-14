export function Checkbox({ id, label, ...props }) {
  return (
    <div className="form-check app-checkbox">
      <input id={id} type="checkbox" className="form-check-input" {...props} />
      <label className="form-check-label" htmlFor={id}>{label}</label>
    </div>
  )
}


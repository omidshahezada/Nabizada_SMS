import { displayValue } from '@/utils/formatters'

export function DetailGrid({ items }) {
  return (
    <dl className="detail-grid">
      {items.map((item) => (
        <div className="detail-grid__item" key={item.label}>
          <dt>{item.label}</dt>
          <dd>{displayValue(item.value, item.fallback)}</dd>
        </div>
      ))}
    </dl>
  )
}

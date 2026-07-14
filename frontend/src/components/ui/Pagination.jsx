import { Button } from '@/components/ui/Button'

export function Pagination({ meta, onPageChange }) {
  if (!meta || meta.last_page <= 1) return null

  const current = meta.current_page
  return (
    <nav className="list-pagination" aria-label="صفحه‌بندی جدول">
      <p className="list-pagination__summary">
        نمایش {meta.from ?? 0} تا {meta.to ?? 0} از {meta.total ?? 0}
      </p>
      <div className="btn-group" role="group" aria-label="انتخاب صفحه">
        <Button variant="secondary" disabled={current <= 1} onClick={() => onPageChange(current - 1)}>قبلی</Button>
        <span className="list-pagination__current" aria-current="page">صفحه {current} از {meta.last_page}</span>
        <Button variant="secondary" disabled={current >= meta.last_page} onClick={() => onPageChange(current + 1)}>بعدی</Button>
      </div>
    </nav>
  )
}

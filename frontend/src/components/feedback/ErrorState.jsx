import { Button } from '@/components/ui/Button'

export function ErrorState({ error, onRetry, fullPage = false }) {
  return (
    <div className={`state-panel state-panel--error ${fullPage ? 'state-panel--full' : ''}`} role="alert">
      <i className="fa fa-exclamation-triangle state-panel__icon" aria-hidden="true" />
      <strong>بارگذاری اطلاعات انجام نشد</strong>
      <p>{error?.message || 'خطای پیش‌بینی‌نشده‌ای رخ داد.'}</p>
      {onRetry ? <Button onClick={onRetry} variant="info">تلاش دوباره</Button> : null}
    </div>
  )
}


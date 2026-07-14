export function PageLoader({ fullPage = false, text = 'لطفا صبر کنید...' }) {
  return (
    <div className={`page-loader ${fullPage ? 'page-loader--full' : ''}`} role="status" aria-live="polite">
      <div className="loader-card">
        <div className="loader-brand" aria-hidden="true">
          <i className="fa fa-spinner fa-pulse text-info" />
        </div>
        <div className="loader-text">{text}</div>
        <div className="loader-subtext">در حال آماده‌سازی صفحه و بارگذاری داده‌ها</div>
      </div>
    </div>
  )
}


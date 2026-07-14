import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { ContentCard } from '@/components/ui/ContentCard'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { ResponsiveTable } from '@/components/ui/ResponsiveTable'
import { useDashboard } from '@/features/dashboard/hooks/dashboardQueries'
import { formatDateTime, formatNumber } from '@/utils/formatters'

const cards = [
  { field: 'products_in_stock', label: 'محصولات در انبار', icon: 'fa-cubes', color: 'bg-info' },
  { field: 'today_sales', label: 'فروش امروز', icon: 'fa-shopping-cart', color: 'bg-success' },
  { field: 'today_income', label: 'درآمد امروز', icon: 'fa-money-bill-wave', color: 'bg-warning' },
  { field: 'monthly_revenue', label: 'درآمد ماهیانه', icon: 'fa-money', color: 'bg-danger' },
]

export function DashboardPage() {
  const dashboardQuery = useDashboard()

  if (dashboardQuery.error?.status === 403) return <ForbiddenPage />

  return (
    <>
      <PageHeader title="میز مدیریت" />
      <section className="content">
        <PageContainer>
          {dashboardQuery.isPending ? <LoadingState /> : null}
          {dashboardQuery.isError ? <ErrorState error={dashboardQuery.error} onRetry={dashboardQuery.refetch} /> : null}
          {dashboardQuery.data ? (
            <>
              <div className="row dashboard-stats">
                {cards.map((card) => (
                  <div className="col-12 col-sm-6 col-md-3" key={card.field}>
                    <div className="info-box">
                      <span className={`info-box-icon ${card.color} elevation-1`}><i className={`fa ${card.icon}`} aria-hidden="true" /></span>
                      <div className="info-box-content">
                        <span className="info-box-text">{card.label}</span>
                        <span className="info-box-number">{formatNumber(dashboardQuery.data[card.field], { fractionDigits: 0 })}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ContentCard title="۱۰ فروش آخر" className="mt-4">
                <ResponsiveTable className="table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>شماره</th><th>مشتری</th><th>مبلغ کل</th><th>پرداخت شده</th><th>تخفیف</th><th>فروشنده</th><th>تاریخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardQuery.data.last_sales.length ? dashboardQuery.data.last_sales.map((sale) => (
                      <tr key={sale.id}>
                        <td>{sale.id}</td>
                        <td>{sale.customer?.name ?? sale.customer_id ?? '-'}</td>
                        <td>{formatNumber(sale.total_amount, { fractionDigits: 0 })}</td>
                        <td>{formatNumber(sale.paid_amount, { fractionDigits: 0 })}</td>
                        <td>{formatNumber(sale.discount, { fractionDigits: 0 })}</td>
                        <td>{sale.seller?.name ?? sale.created_by ?? '-'}</td>
                        <td dir="ltr">{formatDateTime(sale.created_at)}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan="7"><EmptyState title="فروشی موجود نیست" /></td></tr>
                    )}
                  </tbody>
                </ResponsiveTable>
              </ContentCard>
            </>
          ) : null}
        </PageContainer>
      </section>
    </>
  )
}

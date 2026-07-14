import { useNavigate, useParams } from 'react-router-dom'
import { paths } from '@/app/routes'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { CustomerForm } from '@/features/customers/components/CustomerForm'
import { useCustomer, useUpdateCustomer } from '@/features/customers/hooks/customerQueries'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function CustomerEditPage() {
  const { customerId } = useParams()
  const navigate = useNavigate()
  const customerQuery = useCustomer(customerId)
  const mutation = useUpdateCustomer()

  if (customerQuery.error?.status === 404) return <NotFoundPage />
  if (customerQuery.error?.status === 403) return <ForbiddenPage />

  function submit(payload) {
    mutation.mutate({ customerId, payload }, {
      onSuccess: () => navigate(paths.customers, { state: { message: 'مشتری با موفقیت ویرایش گردید.' } }),
      onError: (error) => { if (error.status === 403) navigate(paths.forbidden, { replace: true }) },
    })
  }

  const initialValues = customerQuery.data ? {
    name: customerQuery.data.name,
    phone: customerQuery.data.phone,
    address: customerQuery.data.address || '',
  } : null

  return (
    <>
      <PageHeader title="ویرایش مشتری" breadcrumbs={[{ label: 'مشتریان', to: paths.customers }]} />
      <section className="content"><PageContainer>
        <article className="card card-warning">
          <div className="card-header"><h2 className="card-title">فرم ویرایش مشتری</h2></div>
          {customerQuery.isPending ? <LoadingState /> : null}
          {customerQuery.isError ? <ErrorState error={customerQuery.error} onRetry={customerQuery.refetch} /> : null}
          {initialValues ? <CustomerForm initialValues={initialValues} onSubmit={submit} pending={mutation.isPending} error={mutation.error} cancelTo={paths.customers} submitLabel="به‌روزرسانی" /> : null}
        </article>
      </PageContainer></section>
    </>
  )
}

import { useState } from 'react'
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { paths, roles } from '@/app/routes'
import { Alert } from '@/components/feedback/Alert'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { RoleGate } from '@/components/routing/RoleGate'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { DetailGrid } from '@/components/ui/DetailGrid'
import { useCustomer, useDeleteCustomer } from '@/features/customers/hooks/customerQueries'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const mutationRoles = [roles.admin, roles.seller]

export function CustomerDetailPage() {
  const { customerId } = useParams()
  const { user } = useOutletContext()
  const navigate = useNavigate()
  const customerQuery = useCustomer(customerId)
  const deleteMutation = useDeleteCustomer()
  const [dialogOpen, setDialogOpen] = useState(false)

  if (customerQuery.error?.status === 404) return <NotFoundPage />
  if (customerQuery.error?.status === 403) return <ForbiddenPage />

  function confirmDelete() {
    if (deleteMutation.isPending) return
    deleteMutation.mutate(customerId, {
      onSuccess: () => navigate(paths.customers, { replace: true, state: { message: 'مشتری با موفقیت حذف گردید.' } }),
      onError: (error) => { if (error.status === 403) navigate(paths.forbidden, { replace: true }) },
    })
  }

  const customer = customerQuery.data
  return (
    <>
      <PageHeader title="جزئیات مشتری" breadcrumbs={[{ label: 'مشتریان', to: paths.customers }]} />
      <section className="content"><PageContainer>
        {deleteMutation.error ? <Alert variant="error" dismissible onDismiss={() => deleteMutation.reset()}>{deleteMutation.error.message}</Alert> : null}
        {customerQuery.isPending ? <LoadingState /> : null}
        {customerQuery.isError ? <ErrorState error={customerQuery.error} onRetry={customerQuery.refetch} /> : null}
        {customer ? <article className="card card-info">
          <div className="card-header"><h2 className="card-title">اطلاعات مشتری</h2></div>
          <div className="card-body"><DetailGrid items={[
            { label: 'نام مشتری:', value: customer.name },
            { label: 'تلفن:', value: customer.phone },
            { label: 'آدرس:', value: customer.address },
          ]} /></div>
          <div className="card-footer form-actions">
            <RoleGate allowedRoles={mutationRoles} user={user}>
              <Link to={paths.customerEdit(customer.id)} className="btn btn-warning">ویرایش</Link>
              <button type="button" className="btn btn-danger" onClick={() => { deleteMutation.reset(); setDialogOpen(true) }}>حذف</button>
            </RoleGate>
            <Link to={paths.customers} className="btn btn-secondary">بازگشت</Link>
          </div>
        </article> : null}
      </PageContainer></section>
      <ConfirmDialog open={dialogOpen} title="حذف مشتری" message={`آیا مطمئن هستید که می‌خواهید مشتری «${customer?.name || ''}» را حذف کنید؟ این عملیات قابل بازگشت نیست.`} onCancel={() => { if (!deleteMutation.isPending) setDialogOpen(false) }} onConfirm={confirmDelete} pending={deleteMutation.isPending} />
    </>
  )
}

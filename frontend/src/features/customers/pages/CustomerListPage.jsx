import { useState } from 'react'
import { Link, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { paths, roles } from '@/app/routes'
import { Alert } from '@/components/feedback/Alert'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { RouteAlert } from '@/components/feedback/RouteAlert'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { RoleGate } from '@/components/routing/RoleGate'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { ContentCard } from '@/components/ui/ContentCard'
import { ListToolbar } from '@/components/ui/ListToolbar'
import { Pagination } from '@/components/ui/Pagination'
import { ResponsiveTable } from '@/components/ui/ResponsiveTable'
import { SortableHeader } from '@/components/ui/SortableHeader'
import { useDeleteCustomer, useCustomers } from '@/features/customers/hooks/customerQueries'
import { useListSearchParams } from '@/hooks/useListSearchParams'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { displayValue } from '@/utils/formatters'

const mutationRoles = [roles.admin, roles.seller]
const listConfig = { allowedSorts: ['id', 'name', 'phone'], defaultSort: 'id' }

export function CustomerListPage() {
  const { user } = useOutletContext()
  const location = useLocation()
  const navigate = useNavigate()
  const { params, updateParams, changePage, changeSort } = useListSearchParams(listConfig)
  const customersQuery = useCustomers(params)
  const deleteMutation = useDeleteCustomer()
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  if (customersQuery.error?.status === 403) return <ForbiddenPage />

  function requestDelete(customer) {
    deleteMutation.reset()
    setSelectedCustomer(customer)
  }

  function confirmDelete() {
    if (!selectedCustomer || deleteMutation.isPending) return
    deleteMutation.mutate(selectedCustomer.id, {
      onSuccess: () => {
        setSelectedCustomer(null)
        navigate(`${location.pathname}${location.search}`, { replace: true, state: { message: 'مشتری با موفقیت حذف گردید.' } })
      },
      onError: (error) => { if (error.status === 403) navigate(paths.forbidden) },
    })
  }

  const rows = customersQuery.data?.data || []
  return (
    <>
      <PageHeader title="مشتریان" />
      <section className="content"><PageContainer>
        <RouteAlert />
        {deleteMutation.error ? <Alert variant="error" dismissible onDismiss={() => deleteMutation.reset()}>{deleteMutation.error.message}</Alert> : null}
        <ContentCard title="جدول مشتریان">
          <RoleGate allowedRoles={mutationRoles} user={user}>
            <Link to={paths.customerNew} className="btn btn-block btn-info list-create-button"><i className="fa-solid fa-plus" aria-hidden="true" /> اضافه کردن مشتری جدید</Link>
          </RoleGate>
          <ListToolbar search={params.search} onSearch={(search) => updateParams({ search })} perPage={params.per_page} onPerPage={(per_page) => updateParams({ per_page })} />
          {customersQuery.isFetching && !customersQuery.isPending ? <p className="list-updating" role="status">در حال به‌روزرسانی...</p> : null}
          {customersQuery.isPending ? <LoadingState /> : null}
          {customersQuery.isError ? <ErrorState error={customersQuery.error} onRetry={customersQuery.refetch} /> : null}
          {customersQuery.data ? <>
            <ResponsiveTable className="table-bordered table-striped">
              <thead><tr>
                <SortableHeader field="id" activeField={params.sort} direction={params.direction} onSort={changeSort}>شماره</SortableHeader>
                <SortableHeader field="name" activeField={params.sort} direction={params.direction} onSort={changeSort}>نام</SortableHeader>
                <SortableHeader field="phone" activeField={params.sort} direction={params.direction} onSort={changeSort}>تلفن</SortableHeader>
                <th>آدرس</th><th>عملیات</th>
              </tr></thead>
              <tbody>
                {rows.length ? rows.map((customer) => <tr key={customer.id}>
                  <td>{customer.id}</td><td>{customer.name}</td><td dir="ltr">{customer.phone}</td><td>{displayValue(customer.address)}</td>
                  <td><div className="btn-group table-actions">
                    <Link to={paths.customer(customer.id)} className="btn btn-info" aria-label={`نمایش ${customer.name}`}><i className="fa-regular fa-eye" aria-hidden="true" /></Link>
                    <RoleGate allowedRoles={mutationRoles} user={user}>
                      <Link to={paths.customerEdit(customer.id)} className="btn btn-warning" aria-label={`ویرایش ${customer.name}`}><i className="fa-regular fa-pen-to-square" aria-hidden="true" /></Link>
                      <button type="button" className="btn btn-danger" onClick={() => requestDelete(customer)} aria-label={`حذف ${customer.name}`}><i className="fa-solid fa-trash-can" aria-hidden="true" /></button>
                    </RoleGate>
                  </div></td>
                </tr>) : <tr><td colSpan="5"><EmptyState title="مشتری یافت نشد" /></td></tr>}
              </tbody>
            </ResponsiveTable>
            <Pagination meta={customersQuery.data.meta} onPageChange={changePage} />
          </> : null}
        </ContentCard>
      </PageContainer></section>
      <ConfirmDialog open={Boolean(selectedCustomer)} title="حذف مشتری" message={`آیا مطمئن هستید که می‌خواهید مشتری «${selectedCustomer?.name || ''}» را حذف کنید؟ این عملیات قابل بازگشت نیست.`} onCancel={() => { if (!deleteMutation.isPending) setSelectedCustomer(null) }} onConfirm={confirmDelete} pending={deleteMutation.isPending} />
    </>
  )
}

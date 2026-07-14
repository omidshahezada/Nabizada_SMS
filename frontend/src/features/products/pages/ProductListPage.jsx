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
import { useListSearchParams } from '@/hooks/useListSearchParams'
import { useCategories, useDeleteProduct, useProducts } from '@/features/products/hooks/productQueries'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { displayValue, formatNumber } from '@/utils/formatters'

const listConfig = {
  allowedSorts: ['id', 'name', 'quantity', 'purchase_price', 'sell_price', 'created_at'],
  defaultSort: 'id',
  category: true,
}

export function ProductListPage() {
  const { user } = useOutletContext()
  const location = useLocation()
  const navigate = useNavigate()
  const { params, updateParams, changePage, changeSort } = useListSearchParams(listConfig)
  const productsQuery = useProducts(params)
  const categoriesQuery = useCategories()
  const deleteMutation = useDeleteProduct()
  const [selectedProduct, setSelectedProduct] = useState(null)

  const forbidden = productsQuery.error?.status === 403 || categoriesQuery.error?.status === 403
  if (forbidden) return <ForbiddenPage />

  function requestDelete(product) {
    deleteMutation.reset()
    setSelectedProduct(product)
  }

  function confirmDelete() {
    if (!selectedProduct || deleteMutation.isPending) return
    deleteMutation.mutate(selectedProduct.id, {
      onSuccess: () => {
        setSelectedProduct(null)
        navigate(`${location.pathname}${location.search}`, {
          replace: true,
          state: { message: 'محصول با موفقیت حذف گردید.' },
        })
      },
      onError: (error) => {
        if (error.status === 403) navigate(paths.forbidden)
      },
    })
  }

  const error = productsQuery.error || categoriesQuery.error
  const rows = productsQuery.data?.data || []

  return (
    <>
      <PageHeader title="محصولات | گدام" />
      <section className="content">
        <PageContainer>
          <RouteAlert />
          {deleteMutation.error ? <Alert variant="error" dismissible onDismiss={() => deleteMutation.reset()}>{deleteMutation.error.message}</Alert> : null}
          <ContentCard title="جدول محصولات | گدام">
            <RoleGate allowedRoles={[roles.admin]} user={user}>
              <Link to={paths.productNew} className="btn btn-block btn-info list-create-button"><i className="fa-solid fa-plus" aria-hidden="true" /> اضافه کردن محصول جدید</Link>
            </RoleGate>
            <ListToolbar search={params.search} onSearch={(search) => updateParams({ search })} perPage={params.per_page} onPerPage={(per_page) => updateParams({ per_page })}>
              <div className="list-toolbar__filter">
                <label htmlFor="product-category-filter">دسته | طبقه</label>
                <select id="product-category-filter" className="form-control" value={params.category_id || ''} onChange={(event) => updateParams({ category_id: event.target.value ? Number(event.target.value) : null })}>
                  <option value="">همه دسته‌ها</option>
                  {(categoriesQuery.data || []).map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
              </div>
            </ListToolbar>
            {productsQuery.isFetching && !productsQuery.isPending ? <p className="list-updating" role="status">در حال به‌روزرسانی...</p> : null}
            {(productsQuery.isPending || categoriesQuery.isPending) ? <LoadingState /> : null}
            {error ? <ErrorState error={error} onRetry={() => { productsQuery.refetch(); categoriesQuery.refetch() }} /> : null}
            {!error && productsQuery.data ? (
              <>
                <ResponsiveTable className="table-bordered table-striped">
                  <thead><tr>
                    <SortableHeader field="id" activeField={params.sort} direction={params.direction} onSort={changeSort}>شماره</SortableHeader>
                    <SortableHeader field="name" activeField={params.sort} direction={params.direction} onSort={changeSort}>نام محصول</SortableHeader>
                    <th>دسته | طبقه</th>
                    <SortableHeader field="quantity" activeField={params.sort} direction={params.direction} onSort={changeSort}>تعداد</SortableHeader>
                    <SortableHeader field="purchase_price" activeField={params.sort} direction={params.direction} onSort={changeSort}>قیمت خرید</SortableHeader>
                    <SortableHeader field="sell_price" activeField={params.sort} direction={params.direction} onSort={changeSort}>قیمت فروش</SortableHeader>
                    <th>عملیات</th>
                  </tr></thead>
                  <tbody>
                    {rows.length ? rows.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{displayValue(product.category?.name, 'ندارد')}</td>
                        <td>{formatNumber(product.quantity)}</td>
                        <td>{formatNumber(product.purchase_price)}</td>
                        <td>{formatNumber(product.sell_price)}</td>
                        <td><div className="btn-group table-actions">
                          <Link to={paths.product(product.id)} className="btn btn-info" aria-label={`نمایش ${product.name}`}><i className="fa-regular fa-eye" aria-hidden="true" /></Link>
                          <RoleGate allowedRoles={[roles.admin]} user={user}>
                            <Link to={paths.productEdit(product.id)} className="btn btn-warning" aria-label={`ویرایش ${product.name}`}><i className="fa-regular fa-pen-to-square" aria-hidden="true" /></Link>
                            <button type="button" className="btn btn-danger" onClick={() => requestDelete(product)} aria-label={`حذف ${product.name}`}><i className="fa-solid fa-trash-can" aria-hidden="true" /></button>
                          </RoleGate>
                        </div></td>
                      </tr>
                    )) : <tr><td colSpan="7"><EmptyState title="محصولی یافت نشد" /></td></tr>}
                  </tbody>
                </ResponsiveTable>
                <Pagination meta={productsQuery.data.meta} onPageChange={changePage} />
              </>
            ) : null}
          </ContentCard>
        </PageContainer>
      </section>
      <ConfirmDialog open={Boolean(selectedProduct)} title="حذف محصول" message={`آیا مطمئن هستید که می‌خواهید محصول «${selectedProduct?.name || ''}» را حذف کنید؟ این عملیات قابل بازگشت نیست.`} onCancel={() => { if (!deleteMutation.isPending) setSelectedProduct(null) }} onConfirm={confirmDelete} pending={deleteMutation.isPending} />
    </>
  )
}

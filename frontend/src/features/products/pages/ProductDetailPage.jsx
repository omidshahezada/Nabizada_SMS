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
import { ResponsiveTable } from '@/components/ui/ResponsiveTable'
import { useDeleteProduct, useProduct } from '@/features/products/hooks/productQueries'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { formatNumber } from '@/utils/formatters'

export function ProductDetailPage() {
  const { productId } = useParams()
  const { user } = useOutletContext()
  const navigate = useNavigate()
  const productQuery = useProduct(productId)
  const deleteMutation = useDeleteProduct()
  const [dialogOpen, setDialogOpen] = useState(false)

  if (productQuery.error?.status === 404) return <NotFoundPage />
  if (productQuery.error?.status === 403) return <ForbiddenPage />

  function confirmDelete() {
    if (deleteMutation.isPending) return
    deleteMutation.mutate(productId, {
      onSuccess: () => navigate(paths.products, { replace: true, state: { message: 'محصول با موفقیت حذف گردید.' } }),
      onError: (error) => { if (error.status === 403) navigate(paths.forbidden, { replace: true }) },
    })
  }

  const product = productQuery.data
  return (
    <>
      <PageHeader title="نمایش محصول" breadcrumbs={[{ label: 'محصولات', to: paths.products }]} />
      <section className="content"><PageContainer>
        {deleteMutation.error ? <Alert variant="error" dismissible onDismiss={() => deleteMutation.reset()}>{deleteMutation.error.message}</Alert> : null}
        {productQuery.isPending ? <LoadingState /> : null}
        {productQuery.isError ? <ErrorState error={productQuery.error} onRetry={productQuery.refetch} /> : null}
        {product ? <article className="card card-primary card-outline">
          <div className="card-body box-profile">
            <div className="card">
              <div className="card-header"><h2 className="card-title">مشخصات محصول</h2></div>
              <div className="card-body">
                <ResponsiveTable className="table-bordered">
                  <thead><tr><th>شماره</th><th>نام محصول</th><th>دسته | گروه</th><th>تعداد</th><th>قیمت خرید</th><th>قیمت فروش</th></tr></thead>
                  <tbody><tr>
                    <td>{product.id}</td><td>{product.name}</td><td>{product.category?.name || 'ندارد'}</td><td>{formatNumber(product.quantity)}</td><td>{formatNumber(product.purchase_price, { fractionDigits: 0, groupSeparator: '.', decimalSeparator: ',' })} اف</td><td>{formatNumber(product.sell_price, { fractionDigits: 0, groupSeparator: '.', decimalSeparator: ',' })} اف</td>
                  </tr></tbody>
                </ResponsiveTable>
              </div>
            </div>
            <div className="form-actions">
              <RoleGate allowedRoles={[roles.admin]} user={user}>
                <Link to={paths.productEdit(product.id)} className="btn btn-warning">ویرایش</Link>
                <button type="button" className="btn btn-danger" onClick={() => { deleteMutation.reset(); setDialogOpen(true) }}>حذف</button>
              </RoleGate>
              <Link to={paths.products} className="btn btn-info">بازگشت</Link>
            </div>
          </div>
        </article> : null}
      </PageContainer></section>
      <ConfirmDialog open={dialogOpen} title="حذف محصول" message={`آیا مطمئن هستید که می‌خواهید محصول «${product?.name || ''}» را حذف کنید؟ این عملیات قابل بازگشت نیست.`} onCancel={() => { if (!deleteMutation.isPending) setDialogOpen(false) }} onConfirm={confirmDelete} pending={deleteMutation.isPending} />
    </>
  )
}

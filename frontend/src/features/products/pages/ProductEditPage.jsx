import { useNavigate, useParams } from 'react-router-dom'
import { paths } from '@/app/routes'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { ProductForm } from '@/features/products/components/ProductForm'
import { useCategories, useProduct, useUpdateProduct } from '@/features/products/hooks/productQueries'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function ProductEditPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const productQuery = useProduct(productId)
  const categoriesQuery = useCategories()
  const mutation = useUpdateProduct()

  const error = productQuery.error || categoriesQuery.error
  if (error?.status === 404) return <NotFoundPage />
  if (error?.status === 403) return <ForbiddenPage />

  function submit(payload) {
    mutation.mutate({ productId, payload }, {
      onSuccess: () => navigate(paths.products, { state: { message: 'محصول با موفقیت ویرایش گردید.' } }),
      onError: (mutationError) => { if (mutationError.status === 403) navigate(paths.forbidden, { replace: true }) },
    })
  }

  const initialValues = productQuery.data ? {
    product_name: productQuery.data.name,
    category: productQuery.data.category?.name || '',
    purchase_price: productQuery.data.purchase_price,
    sell_price: productQuery.data.sell_price,
    quantity: String(productQuery.data.quantity),
  } : null

  return (
    <>
      <PageHeader title="ویرایش محصول" breadcrumbs={[{ label: 'محصولات', to: paths.products }]} />
      <section className="content"><PageContainer>
        <article className="card card-info">
          <div className="card-header"><h2 className="card-title">فرم ویرایش محصول</h2></div>
          {(productQuery.isPending || categoriesQuery.isPending) ? <LoadingState /> : null}
          {error ? <ErrorState error={error} onRetry={() => { productQuery.refetch(); categoriesQuery.refetch() }} /> : null}
          {initialValues && categoriesQuery.data ? <ProductForm initialValues={initialValues} categories={categoriesQuery.data} onSubmit={submit} pending={mutation.isPending} error={mutation.error} cancelTo={paths.products} /> : null}
        </article>
      </PageContainer></section>
    </>
  )
}

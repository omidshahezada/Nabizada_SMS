import { useNavigate } from 'react-router-dom'
import { paths } from '@/app/routes'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { ProductForm } from '@/features/products/components/ProductForm'
import { useCategories, useCreateProduct } from '@/features/products/hooks/productQueries'
import { ForbiddenPage } from '@/pages/ForbiddenPage'

const initialValues = { product_name: '', category: '', purchase_price: '', sell_price: '', quantity: '' }

export function ProductCreatePage() {
  const navigate = useNavigate()
  const categoriesQuery = useCategories()
  const mutation = useCreateProduct()

  if (categoriesQuery.error?.status === 403) return <ForbiddenPage />

  function submit(values) {
    mutation.mutate(values, {
      onSuccess: () => navigate(paths.products, { state: { message: 'محصول جدید با موفقیت به گدام اضافه گردید.' } }),
      onError: (error) => { if (error.status === 403) navigate(paths.forbidden, { replace: true }) },
    })
  }

  return (
    <>
      <PageHeader title="ثبت محصول" breadcrumbs={[{ label: 'محصولات', to: paths.products }]} />
      <section className="content"><PageContainer>
        <article className="card card-info">
          <div className="card-header"><h2 className="card-title">فرم ثبت محصول</h2></div>
          {categoriesQuery.isPending ? <LoadingState /> : null}
          {categoriesQuery.isError ? <ErrorState error={categoriesQuery.error} onRetry={categoriesQuery.refetch} /> : null}
          {categoriesQuery.data ? <ProductForm initialValues={initialValues} categories={categoriesQuery.data} onSubmit={submit} pending={mutation.isPending} error={mutation.error} cancelTo={paths.products} /> : null}
        </article>
      </PageContainer></section>
    </>
  )
}

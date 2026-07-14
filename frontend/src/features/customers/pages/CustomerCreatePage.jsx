import { useNavigate } from 'react-router-dom'
import { paths } from '@/app/routes'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { CustomerForm } from '@/features/customers/components/CustomerForm'
import { useCreateCustomer } from '@/features/customers/hooks/customerQueries'

const initialValues = { name: '', phone: '', address: '' }

export function CustomerCreatePage() {
  const navigate = useNavigate()
  const mutation = useCreateCustomer()

  function submit(values) {
    mutation.mutate(values, {
      onSuccess: () => navigate(paths.customers, { state: { message: 'مشتری با موفقیت ایجاد گردید.' } }),
      onError: (error) => { if (error.status === 403) navigate(paths.forbidden, { replace: true }) },
    })
  }

  return (
    <>
      <PageHeader title="ایجاد مشتری جدید" breadcrumbs={[{ label: 'مشتریان', to: paths.customers }]} />
      <section className="content"><PageContainer>
        <article className="card card-primary">
          <div className="card-header"><h2 className="card-title">فرم ایجاد مشتری</h2></div>
          <CustomerForm initialValues={initialValues} onSubmit={submit} pending={mutation.isPending} error={mutation.error} cancelTo={paths.customers} />
        </article>
      </PageContainer></section>
    </>
  )
}

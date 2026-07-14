import { Link, useNavigate } from 'react-router-dom'
import { paths } from '@/app/routes'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'

export function ForbiddenPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHeader title="دسترسی غیرمجاز" />
      <section className="content">
        <PageContainer>
          <div className="error-page app-error-page">
            <div className="app-error-page__icon text-danger"><i className="fa fa-lock" aria-hidden="true" /></div>
            <h2>اجازه دسترسی ندارید</h2>
            <p className="text-muted">شما اجازه انجام این عملیات را ندارید. اگر فکر می‌کنید این یک اشتباه است، با مدیر سیستم تماس بگیرید.</p>
            <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate(-1)}>بازگشت</button>
            <Link to={paths.home} className="btn btn-primary">پنجره اطلاعات</Link>
          </div>
        </PageContainer>
      </section>
    </>
  )
}


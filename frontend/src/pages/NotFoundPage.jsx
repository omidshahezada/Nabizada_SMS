import { Link } from 'react-router-dom'
import { paths } from '@/app/routes'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'

export function NotFoundPage() {
  return (
    <>
      <PageHeader title="صفحه خطا ۴۰۴" />
      <section className="content">
        <PageContainer>
          <div className="error-page">
            <h2 className="headline text-warning">۴۰۴</h2>
            <div className="error-content">
              <h3><i className="fa fa-warning text-warning" aria-hidden="true" /> آخ! صفحه مورد نظر شما یافت نشد.</h3>
              <p>متاسفانه صفحه مورد نظر شما در سایت وجود ندارد. می‌توانید به <Link to={paths.home}>داشبورد</Link> برگردید.</p>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  )
}


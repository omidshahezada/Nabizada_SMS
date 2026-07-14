import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export function PageHeader({ title, breadcrumbs, actions }) {
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2 align-items-center">
          <div className="col-sm-6 page-title-row">
            <h1 className="m-0 text-dark">{title}</h1>
            {actions ? <div className="page-actions">{actions}</div> : null}
          </div>
          <div className="col-sm-6">
            <Breadcrumbs title={title} items={breadcrumbs} />
          </div>
        </div>
      </div>
    </div>
  )
}


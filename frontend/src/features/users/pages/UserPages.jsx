import { useState } from 'react'
import { Link, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { paths } from '@/app/routes'
import { Alert } from '@/components/feedback/Alert'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { RouteAlert } from '@/components/feedback/RouteAlert'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { ContentCard } from '@/components/ui/ContentCard'
import { DetailGrid } from '@/components/ui/DetailGrid'
import { ListToolbar } from '@/components/ui/ListToolbar'
import { Pagination } from '@/components/ui/Pagination'
import { ResponsiveTable } from '@/components/ui/ResponsiveTable'
import { SortableHeader } from '@/components/ui/SortableHeader'
import { UserForm } from '@/features/users/components/UserForm'
import { useCreateUser, useDeleteUser, useRoles, useUpdateUser, useUser, useUsers } from '@/features/users/hooks/userQueries'
import { useListSearchParams } from '@/hooks/useListSearchParams'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { formatDateTime } from '@/utils/formatters'

const listConfig = { allowedSorts: ['id', 'name', 'email', 'role_id', 'created_at'], defaultSort: 'id' }

export function UserListPage() {
  const { user: currentUser } = useOutletContext()
  const location = useLocation()
  const navigate = useNavigate()
  const { params, updateParams, changePage, changeSort } = useListSearchParams(listConfig)
  const query = useUsers(params)
  const deletion = useDeleteUser()
  const [selected, setSelected] = useState(null)
  if (query.error?.status === 403) return <ForbiddenPage />

  function remove() {
    deletion.mutate(selected.id, {
      onSuccess: () => {
        setSelected(null)
        navigate(`${location.pathname}${location.search}`, { replace: true, state: { message: 'کاربر با موفقیت حذف شد.' } })
      },
    })
  }

  const rows = query.data?.data || []
  return <><PageHeader title="تنظیمات کاربران" /><section className="content"><PageContainer><RouteAlert />{deletion.error ? <Alert variant="error">{deletion.error.message}</Alert> : null}<ContentCard title="جدول کاربران"><Link className="btn btn-block btn-info list-create-button" to={paths.userNew}><i className="fa fa-plus" /> افزودن کاربر جدید</Link><ListToolbar search={params.search} onSearch={(search) => updateParams({ search })} perPage={params.per_page} onPerPage={(per_page) => updateParams({ per_page })} />{query.isPending ? <LoadingState /> : null}{query.isError ? <ErrorState error={query.error} onRetry={query.refetch} /> : null}{query.data ? <><ResponsiveTable className="table-bordered table-striped"><thead><tr><SortableHeader field="id" activeField={params.sort} direction={params.direction} onSort={changeSort}>شناسه</SortableHeader><th>تصویر</th><SortableHeader field="name" activeField={params.sort} direction={params.direction} onSort={changeSort}>نام</SortableHeader><SortableHeader field="email" activeField={params.sort} direction={params.direction} onSort={changeSort}>ایمیل</SortableHeader><th>نقش</th><th>عملیات</th></tr></thead><tbody>{rows.length ? rows.map((user) => <tr key={user.id}><td>{user.id}</td><td>{user.image_url ? <img className="table-avatar" src={user.image_url} alt="" /> : '-'}</td><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td><td><div className="btn-group table-actions"><Link className="btn btn-info" to={paths.user(user.id)} aria-label={`نمایش ${user.name}`}><i className="fa-regular fa-eye" /></Link><Link className="btn btn-warning" to={paths.userEdit(user.id)} aria-label={`ویرایش ${user.name}`}><i className="fa-regular fa-pen-to-square" /></Link>{user.id !== currentUser.id ? <button type="button" className="btn btn-danger" onClick={() => { deletion.reset(); setSelected(user) }} aria-label={`حذف ${user.name}`}><i className="fa-solid fa-trash-can" /></button> : null}</div></td></tr>) : <tr><td colSpan="6"><EmptyState title="کاربری یافت نشد" /></td></tr>}</tbody></ResponsiveTable><Pagination meta={query.data.meta} onPageChange={changePage} /></> : null}</ContentCard></PageContainer></section><ConfirmDialog open={Boolean(selected)} title="حذف کاربر" message={`آیا مطمئن هستید که می‌خواهید کاربر «${selected?.name || ''}» را حذف کنید؟`} onCancel={() => setSelected(null)} onConfirm={remove} pending={deletion.isPending} /></>
}

export function UserCreatePage() {
  const navigate = useNavigate()
  const roles = useRoles()
  const mutation = useCreateUser()
  if (roles.error?.status === 403) return <ForbiddenPage />
  return <><PageHeader title="کاربر جدید" breadcrumbs={[{ label: 'کاربران', to: paths.users }]} /><section className="content"><PageContainer><article className="card card-info"><div className="card-header"><h2 className="card-title">فرم کاربر جدید</h2></div>{roles.isPending ? <LoadingState /> : null}{roles.isError ? <ErrorState error={roles.error} onRetry={roles.refetch} /> : null}{roles.data ? <UserForm initialValues={{ name: '', email: '', password: '', role_id: '', profile_image: null, image_url: null }} roles={roles.data} onSubmit={(values) => mutation.mutate(values, { onSuccess: () => navigate(paths.users, { state: { message: 'کاربر با موفقیت ایجاد شد.' } }) })} pending={mutation.isPending} error={mutation.error} cancelTo={paths.users} /> : null}</article></PageContainer></section></>
}

export function UserDetailPage() {
  const { userId } = useParams()
  const query = useUser(userId)
  if (query.error?.status === 404) return <NotFoundPage />
  if (query.error?.status === 403) return <ForbiddenPage />
  const user = query.data
  return <><PageHeader title="نمایش کاربر" breadcrumbs={[{ label: 'کاربران', to: paths.users }]} /><section className="content"><PageContainer>{query.isPending ? <LoadingState /> : null}{query.isError ? <ErrorState error={query.error} onRetry={query.refetch} /> : null}{user ? <ContentCard title="جزئیات کاربر">{user.image_url ? <img className="image-preview" src={user.image_url} alt={`تصویر ${user.name}`} /> : null}<DetailGrid items={[{ label: 'شناسه', value: user.id }, { label: 'نام', value: user.name }, { label: 'ایمیل', value: user.email }, { label: 'نقش', value: user.role }, { label: 'تاریخ ایجاد', value: formatDateTime(user.created_at) }]} /><div className="form-actions"><Link className="btn btn-warning" to={paths.userEdit(user.id)}>ویرایش</Link><Link className="btn btn-secondary" to={paths.users}>بازگشت</Link></div></ContentCard> : null}</PageContainer></section></>
}

function UserEditForm({ user, roles, mutation, onSuccess }) {
  return <UserForm editing initialValues={{ name: user.name, email: user.email, password: '', role_id: user.role_id, profile_image: null, image_url: user.image_url }} roles={roles} onSubmit={(values) => mutation.mutate({ id: user.id, values }, { onSuccess })} pending={mutation.isPending} error={mutation.error} cancelTo={paths.users} />
}

export function UserEditPage() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const query = useUser(userId)
  const roles = useRoles()
  const mutation = useUpdateUser()
  if (query.error?.status === 404) return <NotFoundPage />
  if (query.error?.status === 403 || roles.error?.status === 403) return <ForbiddenPage />
  const error = query.error || roles.error
  return <><PageHeader title="ویرایش کاربر" breadcrumbs={[{ label: 'کاربران', to: paths.users }]} /><section className="content"><PageContainer><article className="card card-info"><div className="card-header"><h2 className="card-title">فرم ویرایش کاربر</h2></div>{query.isPending || roles.isPending ? <LoadingState /> : null}{error ? <ErrorState error={error} onRetry={() => { query.refetch(); roles.refetch() }} /> : null}{query.data && roles.data ? <UserEditForm user={query.data} roles={roles.data} mutation={mutation} onSuccess={() => navigate(paths.users, { state: { message: 'کاربر با موفقیت به‌روزرسانی شد.' } })} /> : null}</article></PageContainer></section></>
}

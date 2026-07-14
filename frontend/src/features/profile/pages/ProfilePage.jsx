import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { paths } from '@/app/routes'
import { firstFieldError } from '@/api/errors'
import { Alert } from '@/components/feedback/Alert'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { FormField } from '@/components/ui/FormField'
import { TextInput } from '@/components/ui/TextInput'
import { useDeleteProfile, useProfile, useUpdatePassword, useUpdateProfile } from '@/features/profile/hooks/profileQueries'

function ProfileForm({ user, mutation }) {
  const [values, setValues] = useState({ name: user.name, email: user.email, image: null })
  const [preview, setPreview] = useState(user.image_url || null)
  const [saved, setSaved] = useState(false)
  const errors = mutation.error?.fieldErrors || {}

  useEffect(() => () => {
    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview)
  }, [preview])

  function change(field) { return (event) => { setSaved(false); setValues((current) => ({ ...current, [field]: event.target.value })) } }
  function image(event) { const file = event.target.files?.[0] || null; setSaved(false); setValues((current) => ({ ...current, image: file })); setPreview(file ? URL.createObjectURL(file) : user.image_url || null) }
  function submit(event) { event.preventDefault(); mutation.mutate(values, { onSuccess: (updated) => { setSaved(true); setValues({ name: updated.name, email: updated.email, image: null }); setPreview(updated.image_url || null) } }) }

  return <form onSubmit={submit} noValidate><div className="card-body">{saved ? <Alert variant="success">اطلاعات پروفایل ذخیره شد.</Alert> : null}{mutation.error && !Object.keys(errors).length ? <Alert variant="error">{mutation.error.message}</Alert> : null}<FormField label="نام" htmlFor="profile-name" error={firstFieldError(errors, 'name')}><TextInput id="profile-name" value={values.name} onChange={change('name')} invalid={Boolean(firstFieldError(errors, 'name'))} required /></FormField><FormField label="ایمیل" htmlFor="profile-email" error={firstFieldError(errors, 'email')}><TextInput id="profile-email" type="email" value={values.email} onChange={change('email')} invalid={Boolean(firstFieldError(errors, 'email'))} required /></FormField><FormField label="تصویر پروفایل" htmlFor="profile-image" error={firstFieldError(errors, 'image')}><input id="profile-image" className="form-control" type="file" accept="image/*" onChange={image} /></FormField>{preview ? <img className="image-preview" src={preview} alt="پیش‌نمایش تصویر پروفایل" /> : null}</div><div className="card-footer"><Button type="submit" loading={mutation.isPending}>ذخیره پروفایل</Button></div></form>
}

function PasswordForm() {
  const mutation = useUpdatePassword()
  const [values, setValues] = useState({ current_password: '', password: '', password_confirmation: '' })
  const [saved, setSaved] = useState(false)
  const errors = mutation.error?.fieldErrors || {}
  function change(field) { return (event) => { setSaved(false); setValues((current) => ({ ...current, [field]: event.target.value })) } }
  function submit(event) { event.preventDefault(); mutation.mutate(values, { onSuccess: () => { setSaved(true); setValues({ current_password: '', password: '', password_confirmation: '' }) } }) }
  return <form onSubmit={submit} noValidate><div className="card-body">{saved ? <Alert variant="success">رمز عبور با موفقیت تغییر کرد.</Alert> : null}{mutation.error && !Object.keys(errors).length ? <Alert variant="error">{mutation.error.message}</Alert> : null}<FormField label="رمز عبور فعلی" htmlFor="current-password" error={firstFieldError(errors, 'current_password')}><TextInput id="current-password" type="password" value={values.current_password} onChange={change('current_password')} autoComplete="current-password" required /></FormField><FormField label="رمز عبور جدید" htmlFor="new-password" error={firstFieldError(errors, 'password')}><TextInput id="new-password" type="password" value={values.password} onChange={change('password')} autoComplete="new-password" required /></FormField><FormField label="تکرار رمز عبور جدید" htmlFor="password-confirmation" error={firstFieldError(errors, 'password_confirmation')}><TextInput id="password-confirmation" type="password" value={values.password_confirmation} onChange={change('password_confirmation')} autoComplete="new-password" required /></FormField></div><div className="card-footer"><Button type="submit" variant="warning" loading={mutation.isPending}>تغییر رمز عبور</Button></div></form>
}

function DeleteAccount() {
  const navigate = useNavigate()
  const mutation = useDeleteProfile()
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)
  const errors = mutation.error?.fieldErrors || {}
  function remove() { mutation.mutate(password, { onSuccess: () => navigate(paths.login, { replace: true, state: { message: 'حساب کاربری حذف شد.' } }), onError: () => setOpen(false) }) }
  return <><div className="card-body">{mutation.error ? <Alert variant="error">{firstFieldError(errors, 'password') || mutation.error.message}</Alert> : null}<p>حذف حساب دائمی است و قابل بازگشت نیست. برای ادامه رمز عبور فعلی را وارد کنید.</p><FormField label="رمز عبور" htmlFor="delete-password" error={firstFieldError(errors, 'password')}><TextInput id="delete-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></FormField><Button type="button" variant="danger" disabled={!password} onClick={() => { mutation.reset(); setOpen(true) }}>حذف حساب کاربری</Button></div><ConfirmDialog open={open} title="حذف حساب کاربری" message="تمام اطلاعات این حساب حذف خواهد شد. آیا مطمئن هستید؟" onCancel={() => setOpen(false)} onConfirm={remove} pending={mutation.isPending} /></>
}

export function ProfilePage() {
  const query = useProfile()
  const profileMutation = useUpdateProfile()
  return <><PageHeader title="نمایه" /><section className="content"><PageContainer>{query.isPending ? <LoadingState /> : null}{query.isError ? <ErrorState error={query.error} onRetry={query.refetch} /> : null}{query.data ? <div className="row"><div className="col-lg-6"><article className="card card-info"><div className="card-header"><h2 className="card-title">اطلاعات پروفایل</h2></div><ProfileForm user={query.data} mutation={profileMutation} /></article></div><div className="col-lg-6"><article className="card card-warning"><div className="card-header"><h2 className="card-title">تغییر رمز عبور</h2></div><PasswordForm /></article><article className="card card-danger"><div className="card-header"><h2 className="card-title">حذف حساب</h2></div><DeleteAccount /></article></div></div> : null}</PageContainer></section></>
}

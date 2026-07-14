import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firstFieldError } from '@/api/errors'
import { Alert } from '@/components/feedback/Alert'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { TextInput } from '@/components/ui/TextInput'

export function UserForm({ initialValues, roles, onSubmit, pending, error, cancelTo, editing = false }) {
  const [values, setValues] = useState(initialValues)
  const [preview, setPreview] = useState(initialValues.image_url || null)
  const errors = error?.fieldErrors || {}

  useEffect(() => () => {
    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview)
  }, [preview])

  function change(field) {
    return (event) => setValues((current) => ({ ...current, [field]: event.target.value }))
  }

  function selectImage(event) {
    const file = event.target.files?.[0] || null
    setValues((current) => ({ ...current, profile_image: file }))
    setPreview(file ? URL.createObjectURL(file) : initialValues.image_url || null)
  }

  function submit(event) {
    event.preventDefault()
    if (!pending) onSubmit(values)
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="card-body">
        {error && !Object.keys(errors).length ? <Alert variant="error">{error.message}</Alert> : null}
        <div className="row">
          <div className="col-md-6">
            <FormField label="نام" htmlFor="user-name" error={firstFieldError(errors, 'name')}>
              <TextInput id="user-name" value={values.name} onChange={change('name')} invalid={Boolean(firstFieldError(errors, 'name'))} required />
            </FormField>
          </div>
          <div className="col-md-6">
            <FormField label="ایمیل" htmlFor="user-email" error={firstFieldError(errors, 'email')}>
              <TextInput id="user-email" type="email" value={values.email} onChange={change('email')} invalid={Boolean(firstFieldError(errors, 'email'))} required />
            </FormField>
          </div>
          <div className="col-md-6">
            <FormField label={editing ? 'رمز عبور جدید (اختیاری)' : 'رمز عبور'} htmlFor="user-password" error={firstFieldError(errors, 'password')}>
              <TextInput id="user-password" type="password" value={values.password} onChange={change('password')} invalid={Boolean(firstFieldError(errors, 'password'))} required={!editing} autoComplete="new-password" />
            </FormField>
          </div>
          <div className="col-md-6">
            <FormField label="نقش" htmlFor="user-role" error={firstFieldError(errors, 'role_id')}>
              <select id="user-role" className={`form-control ${firstFieldError(errors, 'role_id') ? 'is-invalid' : ''}`} value={values.role_id} onChange={change('role_id')} required>
                <option value="">انتخاب نقش</option>
                {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
              </select>
            </FormField>
          </div>
        </div>
        <FormField label="تصویر پروفایل" htmlFor="user-image" error={firstFieldError(errors, 'profile_image')}>
          <input id="user-image" className="form-control" type="file" accept="image/jpeg,image/png,image/gif" onChange={selectImage} />
        </FormField>
        {preview ? <img className="image-preview" src={preview} alt="پیش‌نمایش تصویر کاربر" /> : null}
      </div>
      <div className="card-footer form-actions">
        <Button type="submit" variant={editing ? 'warning' : 'primary'} loading={pending}>{editing ? 'به‌روزرسانی' : 'ذخیره'}</Button>
        <Link to={cancelTo} className="btn btn-secondary">انصراف</Link>
      </div>
    </form>
  )
}

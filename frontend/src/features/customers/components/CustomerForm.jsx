import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firstFieldError } from '@/api/errors'
import { Alert } from '@/components/feedback/Alert'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { TextInput } from '@/components/ui/TextInput'

const EMPTY_ERRORS = {}

export function CustomerForm({ initialValues, onSubmit, pending, error, cancelTo, submitLabel = 'ذخیره' }) {
  const [values, setValues] = useState(initialValues)
  const [clientErrors, setClientErrors] = useState(EMPTY_ERRORS)
  const serverErrors = error?.fieldErrors || EMPTY_ERRORS
  const fieldErrors = { ...serverErrors, ...clientErrors }

  useEffect(() => {
    const firstInvalidField = Object.keys(serverErrors)[0]
    if (firstInvalidField) document.getElementById(`customer-${firstInvalidField}`)?.focus()
  }, [serverErrors])

  function change(field) {
    return (event) => {
      setValues((current) => ({ ...current, [field]: event.target.value }))
      setClientErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (pending) return

    const errors = Object.fromEntries(['name', 'phone']
      .filter((field) => values[field].trim() === '')
      .map((field) => [field, ['این فیلد الزامی است.']]))
    if (Object.keys(errors).length) {
      setClientErrors(errors)
      document.getElementById(`customer-${Object.keys(errors)[0]}`)?.focus()
      return
    }

    setClientErrors(EMPTY_ERRORS)
    onSubmit({ ...values, name: values.name.trim(), phone: values.phone.trim() })
  }

  const generalError = error && Object.keys(serverErrors).length === 0 ? error.message : null

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="card-body">
        {generalError ? <Alert variant="error">{generalError}</Alert> : null}
        <FormField label="نام مشتری" htmlFor="customer-name" error={firstFieldError(fieldErrors, 'name')}>
          <TextInput id="customer-name" value={values.name} onChange={change('name')} invalid={Boolean(firstFieldError(fieldErrors, 'name'))} maxLength="255" placeholder="نام مشتری را وارد کنید" required />
        </FormField>
        <FormField label="تلفن" htmlFor="customer-phone" error={firstFieldError(fieldErrors, 'phone')}>
          <TextInput id="customer-phone" value={values.phone} onChange={change('phone')} invalid={Boolean(firstFieldError(fieldErrors, 'phone'))} maxLength="50" placeholder="تلفن مشتری را وارد کنید" required />
        </FormField>
        <FormField label="آدرس" htmlFor="customer-address" error={firstFieldError(fieldErrors, 'address')}>
          <textarea id="customer-address" className={`form-control ${firstFieldError(fieldErrors, 'address') ? 'is-invalid' : ''}`} rows="3" value={values.address} onChange={change('address')} maxLength="1000" aria-invalid={Boolean(firstFieldError(fieldErrors, 'address'))} aria-describedby={firstFieldError(fieldErrors, 'address') ? 'customer-address-error' : undefined} placeholder="آدرس مشتری را وارد کنید" />
        </FormField>
      </div>
      <div className="card-footer form-actions">
        <Button type="submit" variant={submitLabel === 'به‌روزرسانی' ? 'warning' : 'primary'} loading={pending}>{submitLabel}</Button>
        <Link to={cancelTo} className="btn btn-secondary">انصراف</Link>
      </div>
    </form>
  )
}

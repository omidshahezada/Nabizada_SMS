import { useEffect, useRef, useState } from 'react'
import { firstFieldError } from '@/api/errors'
import { Alert } from '@/components/feedback/Alert'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { FormField } from '@/components/ui/FormField'
import { TextInput } from '@/components/ui/TextInput'

const emptyErrors = {}

export function LoginForm({ onSubmit, error, isPending, forgotPasswordUrl }) {
  const [values, setValues] = useState({ email: '', password: '', remember: false })
  const [clientErrors, setClientErrors] = useState(emptyErrors)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const fieldErrors = error?.fieldErrors || clientErrors

  useEffect(() => {
    if (firstFieldError(fieldErrors, 'email')) emailRef.current?.focus()
    else if (firstFieldError(fieldErrors, 'password')) passwordRef.current?.focus()
  }, [fieldErrors])

  function updateValue(event) {
    const { name, type, checked, value } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setClientErrors((current) => ({ ...current, [name]: undefined }))
  }

  function submit(event) {
    event.preventDefault()
    if (isPending) return

    const validationErrors = {}
    if (!values.email.trim()) validationErrors.email = ['ایمیل الزامی است.']
    if (!values.password) validationErrors.password = ['رمز عبور الزامی است.']

    if (Object.keys(validationErrors).length) {
      setClientErrors(validationErrors)
      return
    }

    setClientErrors(emptyErrors)
    onSubmit({ ...values, email: values.email.trim() })
  }

  const infrastructureError = error && Object.keys(error.fieldErrors || {}).length === 0

  return (
    <form className="form-horizontal" onSubmit={submit} noValidate>
      {infrastructureError ? <Alert variant="error">{error.message}</Alert> : null}
      <div className="card-body">
        <FormField label="ایمیل" htmlFor="email" error={firstFieldError(fieldErrors, 'email')}>
          <TextInput
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ایمیل را وارد کنید"
            value={values.email}
            onChange={updateValue}
            invalid={Boolean(firstFieldError(fieldErrors, 'email'))}
            required
          />
        </FormField>
        <FormField label="رمزعبور" htmlFor="password" error={firstFieldError(fieldErrors, 'password')}>
          <TextInput
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="رمز عبور را وارد کنید"
            value={values.password}
            onChange={updateValue}
            invalid={Boolean(firstFieldError(fieldErrors, 'password'))}
            required
          />
        </FormField>
        <Checkbox
          id="remember"
          name="remember"
          checked={values.remember}
          onChange={updateValue}
          label="مرا به خاطر بسپار"
        />
      </div>
      <div className="card-footer auth-card__footer">
        <Button type="submit" variant="info" loading={isPending} disabled={isPending}>
          {isPending ? 'در حال ورود...' : 'ورود'}
        </Button>
        <a className="btn btn-link" href={forgotPasswordUrl}>رمز خود را فراموش کردید؟</a>
      </div>
    </form>
  )
}

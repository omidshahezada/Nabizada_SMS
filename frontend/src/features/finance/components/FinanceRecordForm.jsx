import { useState } from 'react'
import { Link } from 'react-router-dom'
import { firstFieldError } from '@/api/errors'
import { Alert } from '@/components/feedback/Alert'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { TextInput } from '@/components/ui/TextInput'

export function FinanceRecordForm({ kind, initialValues, onSubmit, pending, error, cancelTo, submitLabel }) {
  const [values, setValues] = useState(initialValues)
  const errors = error?.fieldErrors || {}
  const titleField = kind === 'transaction' ? 'type' : 'title'
  const dateField = kind === 'transaction' ? 'transaction_date' : 'expense_date'
  function change(field) { return (event) => setValues((current) => ({ ...current, [field]: event.target.value })) }
  function submit(event) { event.preventDefault(); onSubmit(values) }
  return <form onSubmit={submit} noValidate><div className="card-body">{error && !Object.keys(errors).length ? <Alert variant="error">{error.message}</Alert> : null}<FormField label={kind === 'transaction' ? 'نوع تراکنش' : 'عنوان هزینه'} htmlFor={`finance-${titleField}`} error={firstFieldError(errors, titleField)}><TextInput id={`finance-${titleField}`} value={values[titleField]} onChange={change(titleField)} invalid={Boolean(firstFieldError(errors, titleField))} required /></FormField><FormField label="مبلغ" htmlFor="finance-amount" error={firstFieldError(errors, 'amount')}><TextInput id="finance-amount" type="number" step="any" value={values.amount} onChange={change('amount')} invalid={Boolean(firstFieldError(errors, 'amount'))} required /></FormField><FormField label={kind === 'transaction' ? 'تاریخ تراکنش' : 'تاریخ هزینه'} htmlFor={`finance-${dateField}`} error={firstFieldError(errors, dateField)}><TextInput id={`finance-${dateField}`} type="datetime-local" value={values[dateField]} onChange={change(dateField)} invalid={Boolean(firstFieldError(errors, dateField))} required /></FormField><FormField label="توضیحات" htmlFor="finance-description" error={firstFieldError(errors, 'description')}><textarea id="finance-description" className="form-control" rows="4" value={values.description} onChange={change('description')} /></FormField></div><div className="card-footer form-actions"><Button type="submit" variant="info" loading={pending}>{submitLabel}</Button><Link to={cancelTo} className="btn btn-secondary">لغو</Link></div></form>
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firstFieldError } from '@/api/errors'
import { Alert } from '@/components/feedback/Alert'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { TextInput } from '@/components/ui/TextInput'

const EMPTY_ERRORS = {}

export function ProductForm({ initialValues, categories = [], onSubmit, pending, error, cancelTo, submitLabel = 'ذخیره' }) {
  const [values, setValues] = useState(initialValues)
  const [clientErrors, setClientErrors] = useState(EMPTY_ERRORS)
  const serverErrors = error?.fieldErrors || EMPTY_ERRORS
  const fieldErrors = { ...serverErrors, ...clientErrors }

  useEffect(() => {
    const firstInvalidField = Object.keys(serverErrors)[0]
    if (firstInvalidField) document.getElementById(`product-${firstInvalidField}`)?.focus()
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

    const required = ['product_name', 'category', 'purchase_price', 'sell_price', 'quantity']
    const errors = Object.fromEntries(required
      .filter((field) => String(values[field] ?? '').trim() === '')
      .map((field) => [field, ['این فیلد الزامی است.']]))

    if (Object.keys(errors).length) {
      setClientErrors(errors)
      document.getElementById(`product-${Object.keys(errors)[0]}`)?.focus()
      return
    }

    setClientErrors(EMPTY_ERRORS)
    onSubmit(values)
  }

  const generalError = error && Object.keys(serverErrors).length === 0 ? error.message : null

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="card-body">
        {generalError ? <Alert variant="error">{generalError}</Alert> : null}
        <div className="row">
          <div className="col-md-4">
            <FormField label="نام محصول" htmlFor="product-product_name" error={firstFieldError(fieldErrors, 'product_name')}>
              <TextInput id="product-product_name" value={values.product_name} onChange={change('product_name')} invalid={Boolean(firstFieldError(fieldErrors, 'product_name'))} maxLength="255" placeholder="نام محصول را وارد کنید" required />
            </FormField>
            <FormField label="قیمت خرید" htmlFor="product-purchase_price" error={firstFieldError(fieldErrors, 'purchase_price')}>
              <div className="input-group">
                <TextInput id="product-purchase_price" type="number" step="any" min="0" value={values.purchase_price} onChange={change('purchase_price')} invalid={Boolean(firstFieldError(fieldErrors, 'purchase_price'))} placeholder="قیمت خرید را وارد کنید" required />
                <div className="input-group-append"><span className="input-group-text">اف</span></div>
              </div>
            </FormField>
          </div>
          <div className="col-md-4">
            <FormField label="دسته | طبقه" htmlFor="product-category" error={firstFieldError(fieldErrors, 'category')}>
              <TextInput id="product-category" list="product-categories" value={values.category} onChange={change('category')} invalid={Boolean(firstFieldError(fieldErrors, 'category'))} maxLength="255" placeholder="دسته محصول را وارد کنید" required />
              <datalist id="product-categories">{categories.map((category) => <option value={category.name} key={category.id} />)}</datalist>
            </FormField>
            <FormField label="قیمت فروش" htmlFor="product-sell_price" error={firstFieldError(fieldErrors, 'sell_price')}>
              <div className="input-group">
                <TextInput id="product-sell_price" type="number" step="any" min="0" value={values.sell_price} onChange={change('sell_price')} invalid={Boolean(firstFieldError(fieldErrors, 'sell_price'))} placeholder="قیمت فروش را وارد کنید" required />
                <div className="input-group-append"><span className="input-group-text">اف</span></div>
              </div>
            </FormField>
          </div>
          <div className="col-md-4">
            <FormField label="تعداد" htmlFor="product-quantity" error={firstFieldError(fieldErrors, 'quantity')}>
              <TextInput id="product-quantity" type="number" step="1" min="0" value={values.quantity} onChange={change('quantity')} invalid={Boolean(firstFieldError(fieldErrors, 'quantity'))} placeholder="تعداد را وارد کنید" required />
            </FormField>
          </div>
        </div>
      </div>
      <div className="card-footer form-actions">
        <Button type="submit" variant="info" loading={pending}>{submitLabel}</Button>
        <Link to={cancelTo} className="btn btn-secondary">لغو</Link>
      </div>
    </form>
  )
}

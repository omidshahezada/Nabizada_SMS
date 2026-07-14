import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { firstFieldError } from '@/api/errors'
import { Alert } from '@/components/feedback/Alert'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { ResponsiveTable } from '@/components/ui/ResponsiveTable'
import { TextInput } from '@/components/ui/TextInput'
import { formatNumber } from '@/utils/formatters'

export function SaleForm({ products, customers, onSubmit, pending, error, cancelTo }) {
  const [customerId, setCustomerId] = useState('')
  const [paidAmount, setPaidAmount] = useState('0')
  const [items, setItems] = useState([])
  const [line, setLine] = useState({ product_id: '', quantity: '1', unit_price: '', discount: '0' })
  const [lineError, setLineError] = useState('')
  const fieldErrors = error?.fieldErrors || {}

  const total = useMemo(() => items.reduce((sum, item) => sum + (Number(item.unit_price) * Number(item.quantity)) - Number(item.discount || 0), 0), [items])

  function selectProduct(event) {
    const product = products.find((item) => String(item.id) === event.target.value)
    setLine((current) => ({ ...current, product_id: event.target.value, unit_price: product?.sell_price || '' }))
    setLineError('')
  }

  function addItem() {
    const product = products.find((item) => String(item.id) === String(line.product_id))
    const quantity = Number(line.quantity)
    const price = Number(line.unit_price)
    const discount = Number(line.discount || 0)
    const existingQuantity = items.filter((item) => item.product_id === product?.id).reduce((sum, item) => sum + item.quantity, 0)

    if (!product) return setLineError('یک محصول انتخاب کنید.')
    if (!Number.isInteger(quantity) || quantity < 1) return setLineError('تعداد باید حداقل یک باشد.')
    if (!Number.isFinite(price) || price < 0) return setLineError('قیمت واحد معتبر نیست.')
    if (!Number.isFinite(discount) || discount < 0 || discount > price * quantity) return setLineError('تخفیف این قلم معتبر نیست.')
    if (existingQuantity + quantity > Number(product.quantity)) return setLineError(`موجودی محصول کافی نیست. موجودی فعلی: ${product.quantity}`)

    setItems((current) => [...current, { product_id: product.id, product_name: product.name, quantity, unit_price: line.unit_price, discount: line.discount || '0' }])
    setLine({ product_id: '', quantity: '1', unit_price: '', discount: '0' })
    setLineError('')
  }

  function submit(event) {
    event.preventDefault()
    if (!items.length) return setLineError('حداقل یک قلم فروش اضافه کنید.')
    onSubmit({ customer_id: customerId || null, paid_amount: paidAmount || 0, items: items.map((item) => ({ product_id: item.product_id, quantity: item.quantity, unit_price: item.unit_price, discount: item.discount })) })
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="card-body">
        {error && !Object.keys(fieldErrors).length ? <Alert variant="error">{error.message}</Alert> : null}
        {lineError ? <Alert variant="error" dismissible onDismiss={() => setLineError('')}>{lineError}</Alert> : null}
        {firstFieldError(fieldErrors, 'items') ? <Alert variant="error">{firstFieldError(fieldErrors, 'items')}</Alert> : null}
        <div className="row">
          <div className="col-md-4"><FormField label="مشتری (اختیاری)" htmlFor="sale-customer" error={firstFieldError(fieldErrors, 'customer_id')}><select id="sale-customer" className="form-control" value={customerId} onChange={(event) => setCustomerId(event.target.value)}><option value="">مشتری نقدی</option>{customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}</select></FormField></div>
          <div className="col-md-4"><FormField label="محصول" htmlFor="sale-product"><select id="sale-product" className="form-control" value={line.product_id} onChange={selectProduct}><option value="">انتخاب محصول</option>{products.map((product) => <option key={product.id} value={product.id}>{product.name} (موجودی: {product.quantity})</option>)}</select></FormField></div>
          <div className="col-md-4"><FormField label="تعداد" htmlFor="sale-quantity"><TextInput id="sale-quantity" type="number" min="1" step="1" value={line.quantity} onChange={(event) => setLine((current) => ({ ...current, quantity: event.target.value }))} /></FormField></div>
        </div>
        <div className="row">
          <div className="col-md-4"><FormField label="قیمت واحد" htmlFor="sale-unit-price"><TextInput id="sale-unit-price" type="number" min="0" step="any" value={line.unit_price} onChange={(event) => setLine((current) => ({ ...current, unit_price: event.target.value }))} /></FormField></div>
          <div className="col-md-4"><FormField label="تخفیف" htmlFor="sale-discount"><TextInput id="sale-discount" type="number" min="0" step="any" value={line.discount} onChange={(event) => setLine((current) => ({ ...current, discount: event.target.value }))} /></FormField></div>
          <div className="col-md-4 d-flex align-items-end"><Button type="button" variant="primary" onClick={addItem}>اضافه کردن آیتم</Button></div>
        </div>
        <ResponsiveTable className="table-bordered table-striped"><thead><tr><th>محصول</th><th>تعداد</th><th>قیمت واحد</th><th>تخفیف</th><th>قیمت کل</th><th>عملیات</th></tr></thead><tbody>{items.length ? items.map((item, index) => <tr key={`${item.product_id}-${index}`}><td>{item.product_name}</td><td>{item.quantity}</td><td>{formatNumber(item.unit_price)}</td><td>{formatNumber(item.discount)}</td><td>{formatNumber((Number(item.unit_price) * item.quantity - Number(item.discount)).toFixed(2))}</td><td><button type="button" className="btn btn-danger" onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))}>حذف</button></td></tr>) : <tr><td colSpan="6">هنوز قلمی اضافه نشده است.</td></tr>}</tbody></ResponsiveTable>
        <div className="row mt-3"><div className="col-md-4"><FormField label="مبلغ کل" htmlFor="sale-total"><TextInput id="sale-total" value={total.toFixed(2)} readOnly /></FormField></div><div className="col-md-4"><FormField label="مبلغ پرداختی" htmlFor="sale-paid" error={firstFieldError(fieldErrors, 'paid_amount')}><TextInput id="sale-paid" type="number" step="any" value={paidAmount} onChange={(event) => setPaidAmount(event.target.value)} invalid={Boolean(firstFieldError(fieldErrors, 'paid_amount'))} /></FormField></div></div>
      </div>
      <div className="card-footer form-actions"><Button type="submit" variant="info" loading={pending}>ثبت فروش و صدور فاکتور</Button><Link className="btn btn-secondary" to={cancelTo}>لغو</Link></div>
    </form>
  )
}

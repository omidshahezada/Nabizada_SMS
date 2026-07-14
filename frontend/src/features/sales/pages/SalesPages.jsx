import { useState } from 'react'
import { Link, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { paths, roles } from '@/app/routes'
import { firstFieldError } from '@/api/errors'
import { Alert } from '@/components/feedback/Alert'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { RouteAlert } from '@/components/feedback/RouteAlert'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { RoleGate } from '@/components/routing/RoleGate'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { ContentCard } from '@/components/ui/ContentCard'
import { FormField } from '@/components/ui/FormField'
import { ListToolbar } from '@/components/ui/ListToolbar'
import { Pagination } from '@/components/ui/Pagination'
import { ResponsiveTable } from '@/components/ui/ResponsiveTable'
import { SortableHeader } from '@/components/ui/SortableHeader'
import { TextInput } from '@/components/ui/TextInput'
import { useCustomers } from '@/features/customers/hooks/customerQueries'
import { useProducts } from '@/features/products/hooks/productQueries'
import { SaleForm } from '@/features/sales/components/SaleForm'
import { useCreateSale, useDeleteSale, useInvoice, useSale, useSaleItems, useSales, useTodaySales, useUpdateInvoice, useUpdateSale } from '@/features/sales/hooks/salesQueries'
import { useListSearchParams } from '@/hooks/useListSearchParams'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { displayValue, formatDateTime, formatNumber } from '@/utils/formatters'

const mutationRoles = [roles.admin, roles.seller]
const saleListConfig = { allowedSorts: ['id', 'total_amount', 'paid_amount', 'discount', 'status', 'created_at'], defaultSort: 'created_at' }
const itemListConfig = { allowedSorts: ['id', 'sale_id', 'product_id', 'quantity', 'unit_price', 'discount', 'total_price'], defaultSort: 'id' }

function SalesTable({ rows, params, changeSort, user, onDelete }) {
  return <ResponsiveTable className="table-bordered table-striped"><thead><tr><SortableHeader field="id" activeField={params.sort} direction={params.direction} onSort={changeSort}>شماره</SortableHeader><th>مشتری</th><SortableHeader field="total_amount" activeField={params.sort} direction={params.direction} onSort={changeSort}>مبلغ کل</SortableHeader><SortableHeader field="paid_amount" activeField={params.sort} direction={params.direction} onSort={changeSort}>پرداختی</SortableHeader><th>مانده</th><SortableHeader field="discount" activeField={params.sort} direction={params.direction} onSort={changeSort}>تخفیف</SortableHeader><th>فروشنده</th><th>تاریخ</th><th>عملیات</th></tr></thead><tbody>{rows.length ? rows.map((sale) => <tr key={sale.id}><td>{sale.id}</td><td>{sale.customer?.name || 'مشتری نقدی'}</td><td>{formatNumber(sale.total_amount)}</td><td>{formatNumber(sale.paid_amount)}</td><td>{formatNumber(sale.remaining_amount)}</td><td>{formatNumber(sale.discount)}</td><td>{displayValue(sale.seller?.name)}</td><td>{formatDateTime(sale.created_at)}</td><td><div className="btn-group table-actions"><Link className="btn btn-info" to={paths.saleInvoice(sale.id)} aria-label="نمایش فاکتور"><i className="fa-regular fa-eye" /></Link>{onDelete ? <RoleGate user={user} allowedRoles={mutationRoles}><Link className="btn btn-warning" to={paths.saleEdit(sale.id)} aria-label="ویرایش"><i className="fa-regular fa-pen-to-square" /></Link><button type="button" className="btn btn-danger" onClick={() => onDelete(sale)} aria-label="حذف"><i className="fa-solid fa-trash-can" /></button></RoleGate> : null}</div></td></tr>) : <tr><td colSpan="9"><EmptyState title="فروشی یافت نشد" /></td></tr>}</tbody></ResponsiveTable>
}

export function SaleListPage() {
  const { user } = useOutletContext()
  const location = useLocation()
  const navigate = useNavigate()
  const { params, updateParams, changePage, changeSort } = useListSearchParams(saleListConfig)
  const query = useSales(params)
  const deletion = useDeleteSale()
  const [selected, setSelected] = useState(null)
  if (query.error?.status === 403) return <ForbiddenPage />
  function remove() { deletion.mutate(selected.id, { onSuccess: () => { setSelected(null); navigate(`${location.pathname}${location.search}`, { replace: true, state: { message: 'فروش با موفقیت حذف شد.' } }) } }) }
  return <><PageHeader title="فروشات عمومی" /><section className="content"><PageContainer><RouteAlert />{deletion.error ? <Alert variant="error">{deletion.error.message}</Alert> : null}<ContentCard title="جدول فروشات عمومی"><RoleGate user={user} allowedRoles={mutationRoles}><Link to={paths.saleNew} className="btn btn-block btn-info list-create-button"><i className="fa fa-plus" /> افزودن فروش جدید</Link></RoleGate><ListToolbar search={params.search} onSearch={(search) => updateParams({ search })} perPage={params.per_page} onPerPage={(per_page) => updateParams({ per_page })} />{query.isPending ? <LoadingState /> : null}{query.isError ? <ErrorState error={query.error} onRetry={query.refetch} /> : null}{query.data ? <><SalesTable rows={query.data.data || []} params={params} changeSort={changeSort} user={user} onDelete={(sale) => { deletion.reset(); setSelected(sale) }} /><Pagination meta={query.data.meta} onPageChange={changePage} /></> : null}</ContentCard></PageContainer></section><ConfirmDialog open={Boolean(selected)} title="حذف فروش" message={`آیا مطمئن هستید که می‌خواهید فروش شماره ${selected?.id || ''} را حذف کنید؟ موجودی محصولات بازگردانده می‌شود.`} onCancel={() => setSelected(null)} onConfirm={remove} pending={deletion.isPending} /></>
}

function SummaryCard({ color, icon, label, value }) { return <div className="col-12 col-sm-6 col-md-3"><div className="info-box"><span className={`info-box-icon bg-${color}`}><i className={`fa ${icon}`} /></span><div className="info-box-content"><span className="info-box-text">{label}</span><span className="info-box-number">{formatNumber(value)}</span></div></div></div> }

export function TodaySalesPage() {
  const { user } = useOutletContext()
  const { params, updateParams, changePage, changeSort } = useListSearchParams(saleListConfig)
  const query = useTodaySales(params)
  if (query.error?.status === 403) return <ForbiddenPage />
  const data = query.data
  return <><PageHeader title="فروشات امروز" /><section className="content"><PageContainer>{query.isPending ? <LoadingState /> : null}{query.isError ? <ErrorState error={query.error} onRetry={query.refetch} /> : null}{data ? <><div className="row"><SummaryCard color="success" icon="fa-shopping-cart" label="تعداد فروش" value={data.summary.total_sales} /><SummaryCard color="info" icon="fa-money" label="مبلغ کل" value={data.summary.total_amount} /><SummaryCard color="warning" icon="fa-credit-card" label="مبلغ پرداختی" value={data.summary.total_paid} /><SummaryCard color="danger" icon="fa-tag" label="کل تخفیفات" value={data.summary.total_discount} /></div><ContentCard title="جدول فروشات امروز"><ListToolbar search={params.search} onSearch={(search) => updateParams({ search })} perPage={params.per_page} onPerPage={(per_page) => updateParams({ per_page })} /><SalesTable rows={data.sales || []} params={params} changeSort={changeSort} user={user} /><Pagination meta={data.meta} onPageChange={changePage} /></ContentCard></> : null}</PageContainer></section></>
}

export function SaleCreatePage() {
  const navigate = useNavigate()
  const products = useProducts({ page: 1, per_page: 100, sort: 'name', direction: 'asc' })
  const customers = useCustomers({ page: 1, per_page: 100, sort: 'name', direction: 'asc' })
  const mutation = useCreateSale()
  function submit(payload) { mutation.mutate(payload, { onSuccess: (sale) => navigate(paths.saleInvoice(sale.id), { replace: true, state: { message: 'فروش با موفقیت ثبت شد.' } }) }) }
  const error = products.error || customers.error
  if (error?.status === 403) return <ForbiddenPage />
  return <><PageHeader title="فروش جدید" breadcrumbs={[{ label: 'فروشات', to: paths.sales }]} /><section className="content"><PageContainer><article className="card card-info"><div className="card-header"><h2 className="card-title">ایجاد فروش جدید</h2></div>{products.isPending || customers.isPending ? <LoadingState /> : null}{error ? <ErrorState error={error} onRetry={() => { products.refetch(); customers.refetch() }} /> : null}{products.data && customers.data ? <SaleForm products={products.data.data || []} customers={customers.data.data || []} onSubmit={submit} pending={mutation.isPending} error={mutation.error} cancelTo={paths.sales} /> : null}</article></PageContainer></section></>
}

function SaleEditForm({ sale, customers, mutation, onSuccess }) {
  const [values, setValues] = useState({ customer_id: sale.customer?.id || '', paid_amount: sale.paid_amount, status: sale.status })
  const errors = mutation.error?.fieldErrors || {}
  function change(field) { return (event) => setValues((current) => ({ ...current, [field]: event.target.value })) }
  function submit(event) { event.preventDefault(); mutation.mutate({ saleId: sale.id, payload: { ...values, customer_id: values.customer_id || null } }, { onSuccess }) }
  return <form onSubmit={submit}><div className="card-body">{mutation.error && !Object.keys(errors).length ? <Alert variant="error">{mutation.error.message}</Alert> : null}<div className="row"><div className="col-md-4"><FormField label="مشتری" htmlFor="edit-customer" error={firstFieldError(errors, 'customer_id')}><select id="edit-customer" className="form-control" value={values.customer_id} onChange={change('customer_id')}><option value="">مشتری نقدی</option>{customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}</select></FormField></div><div className="col-md-4"><FormField label="مبلغ پرداختی" htmlFor="edit-paid" error={firstFieldError(errors, 'paid_amount')}><TextInput id="edit-paid" type="number" step="any" value={values.paid_amount} onChange={change('paid_amount')} /></FormField></div><div className="col-md-4"><FormField label="وضعیت" htmlFor="edit-status" error={firstFieldError(errors, 'status')}><select id="edit-status" className="form-control" value={values.status} onChange={change('status')}><option value="completed">تکمیل شده</option><option value="pending">در انتظار</option><option value="cancelled">لغو شده</option></select></FormField></div></div></div><div className="card-footer form-actions"><Button type="submit" variant="info" loading={mutation.isPending}>به‌روزرسانی</Button><Link to={paths.sales} className="btn btn-secondary">لغو</Link></div></form>
}

export function SaleEditPage() {
  const { saleId } = useParams(); const navigate = useNavigate(); const sale = useSale(saleId); const customers = useCustomers({ page: 1, per_page: 100, sort: 'name', direction: 'asc' }); const mutation = useUpdateSale()
  if (sale.error?.status === 404) return <NotFoundPage />
  if (sale.error?.status === 403 || customers.error?.status === 403) return <ForbiddenPage />
  const error = sale.error || customers.error
  return <><PageHeader title="ویرایش فروش" breadcrumbs={[{ label: 'فروشات', to: paths.sales }]} /><section className="content"><PageContainer><article className="card card-info"><div className="card-header"><h2 className="card-title">فرم ویرایش فروش</h2></div>{sale.isPending || customers.isPending ? <LoadingState /> : null}{error ? <ErrorState error={error} onRetry={() => { sale.refetch(); customers.refetch() }} /> : null}{sale.data && customers.data ? <SaleEditForm sale={sale.data} customers={customers.data.data || []} mutation={mutation} onSuccess={() => navigate(paths.sales, { state: { message: 'فروش با موفقیت به‌روزرسانی شد.' } })} /> : null}</article></PageContainer></section></>
}

export function SaleInvoicePage() {
  const { saleId } = useParams(); const { user } = useOutletContext(); const query = useInvoice(saleId)
  if (query.error?.status === 404) return <NotFoundPage />
  if (query.error?.status === 403) return <ForbiddenPage />
  const invoice = query.data; const sale = invoice?.sale; const company = invoice?.company
  return <><PageHeader title="فاکتور فروش" breadcrumbs={[{ label: 'فروشات', to: paths.sales }]} /><section className="content"><PageContainer><RouteAlert />{query.isPending ? <LoadingState /> : null}{query.isError ? <ErrorState error={query.error} onRetry={query.refetch} /> : null}{invoice ? <article className="invoice-card"><header className="invoice-header">{company.logo_url ? <img src={company.logo_url} alt="لوگوی شرکت" className="invoice-logo" /> : null}<div><h2>{company.company_name}</h2><p>{company.address}</p><p>{company.phone}</p></div><div><h1>فاکتور</h1><p>شماره: #{sale.id}</p><p>تاریخ: {formatDateTime(sale.created_at)}</p></div></header>{invoice.resolved_header ? <div className="invoice-note">{invoice.resolved_header}</div> : null}<div className="invoice-customer"><strong>صورتحساب برای:</strong> {sale.customer?.name || 'مشتری نقدی'}{sale.customer?.phone ? <span> — {sale.customer.phone}</span> : null}</div><ResponsiveTable className="table-bordered"><thead><tr><th>#</th><th>محصول</th><th>تعداد</th><th>قیمت واحد</th><th>تخفیف</th><th>مجموع</th></tr></thead><tbody>{sale.items.map((item, index) => <tr key={item.id}><td>{index + 1}</td><td>{item.product?.name || 'محصول حذف شده'}</td><td>{formatNumber(item.quantity)}</td><td>{formatNumber(item.unit_price)}</td><td>{formatNumber(item.discount)}</td><td>{formatNumber(item.total_price)}</td></tr>)}</tbody></ResponsiveTable><div className="invoice-totals"><p>جمع کل: <strong>{formatNumber(sale.total_amount)}</strong></p><p>پرداخت شده: <strong>{formatNumber(sale.paid_amount)}</strong></p><p>مانده: <strong>{formatNumber(sale.remaining_amount)}</strong></p></div>{invoice.resolved_footer ? <div className="invoice-note">{invoice.resolved_footer}</div> : null}<div className="form-actions no-print"><RoleGate user={user} allowedRoles={mutationRoles}><Link className="btn btn-primary" to={paths.saleInvoiceEdit(sale.id)}>ویرایش سربرگ/پابرگ</Link></RoleGate><button type="button" className="btn btn-success" onClick={() => window.print()}>چاپ</button><Link className="btn btn-secondary" to={paths.sales}>بازگشت</Link></div></article> : null}</PageContainer></section></>
}

function InvoiceEditForm({ invoice, mutation, onSuccess }) {
  const [values, setValues] = useState({ bill_header: invoice.bill_header || '', bill_footer: invoice.bill_footer || '' }); const errors = mutation.error?.fieldErrors || {}
  function submit(event) { event.preventDefault(); mutation.mutate({ saleId: invoice.sale.id, payload: values }, { onSuccess }) }
  return <form onSubmit={submit}><div className="card-body">{mutation.error && !Object.keys(errors).length ? <Alert variant="error">{mutation.error.message}</Alert> : null}<FormField label="سربرگ (متن ساده)" htmlFor="invoice-header" error={firstFieldError(errors, 'bill_header')}><textarea id="invoice-header" className="form-control" rows="6" value={values.bill_header} onChange={(event) => setValues((current) => ({ ...current, bill_header: event.target.value }))} /></FormField><FormField label="پابرگ (متن ساده)" htmlFor="invoice-footer" error={firstFieldError(errors, 'bill_footer')}><textarea id="invoice-footer" className="form-control" rows="4" value={values.bill_footer} onChange={(event) => setValues((current) => ({ ...current, bill_footer: event.target.value }))} /></FormField></div><div className="card-footer form-actions"><Button type="submit" loading={mutation.isPending}>ذخیره</Button><Link className="btn btn-secondary" to={paths.saleInvoice(invoice.sale.id)}>بازگشت</Link></div></form>
}

export function SaleInvoiceEditPage() {
  const { saleId } = useParams(); const navigate = useNavigate(); const query = useInvoice(saleId); const mutation = useUpdateInvoice()
  if (query.error?.status === 404) return <NotFoundPage />
  if (query.error?.status === 403) return <ForbiddenPage />
  return <><PageHeader title="ویرایش فاکتور" breadcrumbs={[{ label: 'فاکتور', to: paths.saleInvoice(saleId) }]} /><section className="content"><PageContainer><article className="card"><div className="card-header"><h2 className="card-title">ویرایش سربرگ و پابرگ</h2></div>{query.isPending ? <LoadingState /> : null}{query.isError ? <ErrorState error={query.error} onRetry={query.refetch} /> : null}{query.data ? <InvoiceEditForm invoice={query.data} mutation={mutation} onSuccess={() => navigate(paths.saleInvoice(saleId), { state: { message: 'فاکتور به‌روزرسانی شد.' } })} /> : null}</article></PageContainer></section></>
}

export function SaleItemListPage() {
  const { params, updateParams, changePage, changeSort } = useListSearchParams(itemListConfig); const query = useSaleItems(params)
  if (query.error?.status === 403) return <ForbiddenPage />
  const data = query.data
  return <><PageHeader title="فروشات" /><section className="content"><PageContainer>{query.isPending ? <LoadingState /> : null}{query.isError ? <ErrorState error={query.error} onRetry={query.refetch} /> : null}{data ? <><div className="row"><SummaryCard color="info" icon="fa-list" label="تعداد آیتم‌ها" value={data.summary.total_items} /><SummaryCard color="success" icon="fa-cubes" label="مجموع مقدار" value={data.summary.total_quantity} /><SummaryCard color="warning" icon="fa-money" label="مجموع ارزش" value={data.summary.total_value} /></div><ContentCard title="جدول فروشات"><ListToolbar search={params.search} onSearch={(search) => updateParams({ search })} perPage={params.per_page} onPerPage={(per_page) => updateParams({ per_page })} /><ResponsiveTable className="table-bordered table-striped"><thead><tr><SortableHeader field="sale_id" activeField={params.sort} direction={params.direction} onSort={changeSort}>شماره فروش</SortableHeader><th>محصول</th><SortableHeader field="quantity" activeField={params.sort} direction={params.direction} onSort={changeSort}>مقدار</SortableHeader><SortableHeader field="unit_price" activeField={params.sort} direction={params.direction} onSort={changeSort}>قیمت واحد</SortableHeader><SortableHeader field="discount" activeField={params.sort} direction={params.direction} onSort={changeSort}>تخفیف</SortableHeader><SortableHeader field="total_price" activeField={params.sort} direction={params.direction} onSort={changeSort}>قیمت کل</SortableHeader><th>مشتری</th><th>فروشنده</th><th>تاریخ</th></tr></thead><tbody>{data.items.length ? data.items.map((item) => <tr key={item.id}><td><Link to={paths.saleInvoice(item.sale_id)}>{item.sale_id}</Link></td><td>{item.product?.name || 'محصول حذف شده'}</td><td>{formatNumber(item.quantity)}</td><td>{formatNumber(item.unit_price)}</td><td>{formatNumber(item.discount)}</td><td>{formatNumber(item.total_price)}</td><td>{item.sale?.customer?.name || '-'}</td><td>{item.sale?.seller?.name || '-'}</td><td>{formatDateTime(item.sale?.created_at)}</td></tr>) : <tr><td colSpan="9"><EmptyState title="آیتم فروشی یافت نشد" /></td></tr>}</tbody></ResponsiveTable><Pagination meta={data.meta} onPageChange={changePage} /></ContentCard></> : null}</PageContainer></section></>
}

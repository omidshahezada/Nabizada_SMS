import { useEffect, useState } from 'react'
import { firstFieldError } from '@/api/errors'
import { Alert } from '@/components/feedback/Alert'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { TextInput } from '@/components/ui/TextInput'
import { useCompanySettings, useUpdateCompanySettings } from '@/features/settings/hooks/companySettingsQueries'
import { ForbiddenPage } from '@/pages/ForbiddenPage'

function SettingsForm({ settings, mutation }) {
  const [values, setValues] = useState({ ...settings, logo: null })
  const [preview, setPreview] = useState(settings.logo_url || null)
  const [saved, setSaved] = useState(false)
  const errors = mutation.error?.fieldErrors || {}

  useEffect(() => () => {
    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview)
  }, [preview])

  function change(field) {
    return (event) => {
      setSaved(false)
      setValues((current) => ({ ...current, [field]: event.target.value }))
    }
  }

  function selectLogo(event) {
    const logo = event.target.files?.[0] || null
    setSaved(false)
    setValues((current) => ({ ...current, logo }))
    setPreview(logo ? URL.createObjectURL(logo) : settings.logo_url || null)
  }

  function submit(event) {
    event.preventDefault()
    mutation.mutate(values, {
      onSuccess: (updated) => {
        setSaved(true)
        setValues({ ...updated, logo: null })
        setPreview(updated.logo_url || null)
      },
    })
  }

  return <form onSubmit={submit} noValidate><div className="card-body">{saved ? <Alert variant="success">تنظیمات شرکت با موفقیت ذخیره شد.</Alert> : null}{mutation.error && !Object.keys(errors).length ? <Alert variant="error">{mutation.error.message}</Alert> : null}<div className="row"><div className="col-md-6"><FormField label="نام شرکت" htmlFor="company-name" error={firstFieldError(errors, 'company_name')}><TextInput id="company-name" value={values.company_name || ''} onChange={change('company_name')} /></FormField></div><div className="col-md-6"><FormField label="شماره تماس" htmlFor="company-phone" error={firstFieldError(errors, 'phone')}><TextInput id="company-phone" value={values.phone || ''} onChange={change('phone')} /></FormField></div></div><FormField label="آدرس" htmlFor="company-address" error={firstFieldError(errors, 'address')}><textarea id="company-address" className="form-control" rows="3" value={values.address || ''} onChange={change('address')} /></FormField><FormField label="لوگو" htmlFor="company-logo" error={firstFieldError(errors, 'logo')}><input id="company-logo" className="form-control" type="file" accept="image/jpeg,image/png,image/gif" onChange={selectLogo} /></FormField>{preview ? <img className="image-preview image-preview--logo" src={preview} alt="پیش‌نمایش لوگوی شرکت" /> : null}<FormField label="سربرگ پیش‌فرض فاکتور (متن ساده)" htmlFor="bill-header" error={firstFieldError(errors, 'bill_header')}><textarea id="bill-header" className="form-control" rows="5" value={values.bill_header || ''} onChange={change('bill_header')} /></FormField><FormField label="پابرگ پیش‌فرض فاکتور (متن ساده)" htmlFor="bill-footer" error={firstFieldError(errors, 'bill_footer')}><textarea id="bill-footer" className="form-control" rows="4" value={values.bill_footer || ''} onChange={change('bill_footer')} /></FormField></div><div className="card-footer"><Button type="submit" loading={mutation.isPending}>ذخیره تنظیمات</Button></div></form>
}

export function CompanySettingsPage() {
  const query = useCompanySettings()
  const mutation = useUpdateCompanySettings()
  if (query.error?.status === 403) return <ForbiddenPage />
  return <><PageHeader title="تنظیمات فاکتور" /><section className="content"><PageContainer><article className="card card-info"><div className="card-header"><h2 className="card-title">اطلاعات شرکت و قالب فاکتور</h2></div>{query.isPending ? <LoadingState /> : null}{query.isError ? <ErrorState error={query.error} onRetry={query.refetch} /> : null}{query.data ? <SettingsForm settings={query.data} mutation={mutation} /> : null}</article></PageContainer></section></>
}

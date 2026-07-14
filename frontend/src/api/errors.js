export class ApiError extends Error {
  constructor({ message, status = 0, data = null, fieldErrors = {}, cause }) {
    super(message, { cause })
    this.name = 'ApiError'
    this.status = status
    this.data = data
    this.fieldErrors = fieldErrors
  }
}

const FALLBACK_MESSAGES = {
  401: 'برای ادامه لطفاً وارد سیستم شوید.',
  403: 'اجازه دسترسی به این بخش را ندارید.',
  404: 'منبع درخواستی پیدا نشد.',
  419: 'نشست شما منقضی شده است. لطفاً دوباره وارد شوید.',
  422: 'اطلاعات واردشده معتبر نیست.',
  500: 'خطایی در سرور رخ داد. لطفاً دوباره تلاش کنید.',
}

export function normalizeApiError(error) {
  if (error instanceof ApiError) return error

  const status = error.response?.status ?? 0
  const data = error.response?.data ?? null
  const fieldErrors = status === 422 && data?.errors && typeof data.errors === 'object'
    ? data.errors
    : {}
  const message = data?.message || FALLBACK_MESSAGES[status] || error.message || 'خطای پیش‌بینی‌نشده‌ای رخ داد.'

  return new ApiError({ message, status, data, fieldErrors, cause: error })
}

export function firstFieldError(fieldErrors, fieldName) {
  const errors = fieldErrors?.[fieldName]
  return Array.isArray(errors) ? errors[0] : errors || null
}

export function isAuthenticationError(error) {
  return error?.status === 401 || error?.status === 419
}


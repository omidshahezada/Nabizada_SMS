import { laravelUrl } from '@/api/client'

export function resolveMediaUrl(value) {
  if (!value) return null
  if (/^(https?:|blob:|data:)/i.test(value)) return value
  return laravelUrl(value)
}

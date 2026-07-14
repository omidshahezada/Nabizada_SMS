const numberParts = new Intl.NumberFormat('en-US').formatToParts(1000.1)
const groupSeparator = numberParts.find((part) => part.type === 'group')?.value || ','
const decimalSeparator = numberParts.find((part) => part.type === 'decimal')?.value || '.'

function groupInteger(value, separator) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

function roundDecimal(integer, fraction, digits) {
  const padded = fraction.padEnd(digits + 1, '0')
  let kept = padded.slice(0, digits)

  if (padded[digits] >= '5') {
    const combined = `${integer}${kept || ''}`
    const rounded = (BigInt(combined || '0') + 1n).toString().padStart(integer.length + digits, '0')
    integer = rounded.slice(0, rounded.length - digits) || '0'
    kept = digits ? rounded.slice(-digits) : ''
  }

  return { integer, fraction: kept }
}

export function formatNumber(value, options = {}) {
  if (value === null || value === undefined || value === '') return '-'

  const match = String(value).trim().match(/^(-?)(\d+)(?:\.(\d+))?$/)
  if (!match) return String(value)

  const [, sign, rawInteger, rawFraction = ''] = match
  const integer = rawInteger.replace(/^0+(?=\d)/, '') || '0'
  const group = options.groupSeparator ?? groupSeparator
  const decimal = options.decimalSeparator ?? decimalSeparator

  if (Number.isInteger(options.fractionDigits)) {
    const rounded = roundDecimal(integer, rawFraction, options.fractionDigits)
    const fraction = options.fractionDigits ? `${decimal}${rounded.fraction}` : ''
    return `${sign}${groupInteger(rounded.integer, group)}${fraction}`
  }

  const fraction = rawFraction ? `${decimal}${rawFraction}` : ''
  return `${sign}${groupInteger(integer, group)}${fraction}`
}

export function formatDateTime(value) {
  if (!value) return '-'
  const match = String(value).match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2})/)
  return match ? `${match[1]} ${match[2]}` : String(value)
}

export function displayValue(value, fallback = '-') {
  return value === null || value === undefined || value === '' ? fallback : value
}

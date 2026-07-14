export const PAGE_SIZES = [10, 15, 25, 50, 100]

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

export function readListParams(searchParams, { allowedSorts, defaultSort = 'id', category = false }) {
  const requestedSort = searchParams.get('sort')
  const requestedDirection = searchParams.get('direction')
  const requestedPerPage = positiveInteger(searchParams.get('per_page'), 15)
  const categoryId = positiveInteger(searchParams.get('category_id'), null)

  return {
    page: positiveInteger(searchParams.get('page'), 1),
    per_page: PAGE_SIZES.includes(requestedPerPage) ? requestedPerPage : 15,
    search: searchParams.get('search') || '',
    sort: allowedSorts.includes(requestedSort) ? requestedSort : defaultSort,
    direction: ['asc', 'desc'].includes(requestedDirection) ? requestedDirection : 'desc',
    ...(category ? { category_id: categoryId } : {}),
  }
}

export function writeListParams(params, { category = false } = {}) {
  const searchParams = new URLSearchParams()
  searchParams.set('page', String(params.page))
  searchParams.set('per_page', String(params.per_page))
  searchParams.set('sort', params.sort)
  searchParams.set('direction', params.direction)
  if (params.search) searchParams.set('search', params.search)
  if (category && params.category_id) searchParams.set('category_id', String(params.category_id))
  return searchParams
}

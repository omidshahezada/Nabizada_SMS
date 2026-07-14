import { useSearchParams } from 'react-router-dom'
import { readListParams, writeListParams } from '@/utils/listParams'

export function useListSearchParams(config) {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = readListParams(searchParams, config)

  function updateParams(changes, resetPage = true) {
    const next = { ...params, ...changes }
    if (resetPage) next.page = 1
    setSearchParams(writeListParams(next, config))
  }

  function changeSort(sort) {
    updateParams({
      sort,
      direction: params.sort === sort && params.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return {
    params,
    updateParams,
    changePage: (page) => updateParams({ page }, false),
    changeSort,
  }
}

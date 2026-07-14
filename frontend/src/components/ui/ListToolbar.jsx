import { useEffect, useRef, useState } from 'react'
import { PAGE_SIZES } from '@/utils/listParams'

function DebouncedSearch({ initialValue, onChange }) {
  const [value, setValue] = useState(initialValue)
  const timerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  function handleChange(event) {
    const nextValue = event.target.value
    setValue(nextValue)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => onChange(nextValue), 350)
  }

  return (
    <div className="list-toolbar__search">
      <label htmlFor="list-search">جستجو</label>
      <input
        id="list-search"
        type="search"
        className="form-control"
        value={value}
        onChange={handleChange}
        placeholder="جستجو..."
      />
    </div>
  )
}

export function ListToolbar({ search, onSearch, perPage, onPerPage, children }) {
  return (
    <div className="list-toolbar">
      <DebouncedSearch key={search} initialValue={search} onChange={onSearch} />
      {children}
      <div className="list-toolbar__size">
        <label htmlFor="list-page-size">تعداد در صفحه</label>
        <select
          id="list-page-size"
          className="form-control"
          value={perPage}
          onChange={(event) => onPerPage(Number(event.target.value))}
        >
          {PAGE_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
        </select>
      </div>
    </div>
  )
}

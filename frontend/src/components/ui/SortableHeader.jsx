export function SortableHeader({ field, activeField, direction, onSort, children }) {
  const active = field === activeField
  return (
    <th scope="col" aria-sort={active ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
      <button type="button" className="sortable-header" onClick={() => onSort(field)}>
        <span>{children}</span>
        <i className={`fa ${active ? (direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'}`} aria-hidden="true" />
      </button>
    </th>
  )
}

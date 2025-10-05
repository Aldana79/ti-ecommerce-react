export function CategoryFilter({ value, onChange, options }){
  return (
    <select className="form-select" value={value} onChange={e=>onChange(e.target.value)}>
      <option value="">Todas las categorías</option>
      {options.map(op => <option key={op} value={op}>{op}</option>)}
    </select>
  )
}
export function SortSelect({ value, onChange }){
  return (
    <select className="form-select" value={value} onChange={e=>onChange(e.target.value)}>
      <option value="">Ordenar</option>
      <option value="price_asc">Precio: menor a mayor</option>
      <option value="price_desc">Precio: mayor a menor</option>
      <option value="name_asc">Nombre: A-Z</option>
      <option value="name_desc">Nombre: Z-A</option>
    </select>
  )
}
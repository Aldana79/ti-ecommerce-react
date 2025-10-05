import { useMemo, useState } from 'react'
import data from '../data/products.json'
import ProductCard from '../components/ProductCard.jsx'
import { CategoryFilter, SortSelect } from '../components/Filters.jsx'
import { useSearchParams } from 'react-router-dom'

function applySort(list, sort){
  const arr = [...list]
  switch(sort){
    case 'price_asc': arr.sort((a,b)=>a.price-b.price); break
    case 'price_desc': arr.sort((a,b)=>b.price-a.price); break
    case 'name_asc': arr.sort((a,b)=>a.name.localeCompare(b.name)); break
    case 'name_desc': arr.sort((a,b)=>b.name.localeCompare(a.name)); break
  }
  return arr
}

export default function Products(){
  const categories = useMemo(()=>Array.from(new Set(data.map(d=>d.category))), [])
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState(params.get('cat') || '')
  const [sort, setSort] = useState(params.get('sort') || '')
  const q = params.get('q')?.toLowerCase() || ''

  const filtered = useMemo(()=>{
    let list = data
    if(category) list = list.filter(p => p.category === category)
    if(q) list = list.filter(p => p.name.toLowerCase().includes(q))
    return applySort(list, sort)
  }, [category, sort, q])

  const updateParams = (cat, s) => {
    const next = {}
    if(q) next.q = q
    if(cat) next.cat = cat
    if(s) next.sort = s
    setParams(next)
  }

  const onCategory = (val)=>{ setCategory(val); updateParams(val, sort) }
  const onSort = (val)=>{ setSort(val); updateParams(category, val) }

  return (
    <div>
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <CategoryFilter value={category} onChange={onCategory} options={categories} />
        <SortSelect value={sort} onChange={onSort} />
        <div className="ms-auto text-muted small">{filtered.length} productos</div>
      </div>
      <div className="row g-3">
        {filtered.map(p => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </div>
  )
}
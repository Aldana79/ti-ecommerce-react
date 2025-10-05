import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { money } from '../utils/format.js'

export default function ProductCard({ p }){
  const { dispatch } = useCart()
  return (
    <div className="card h-100 shadow-sm">
      <img src={p.image} className="card-img-top" alt={p.name} loading="lazy"/>
      <div className="card-body d-flex flex-column">
        <span className="badge-cat mb-2 text-capitalize">{p.category}</span>
        <h6 className="card-title flex-grow-1">{p.name}</h6>
        <div className="d-flex align-items-center justify-content-between">
          <strong>{money(p.price)}</strong>
          <div className="btn-group">
            <Link to={`/producto/${p.id}`} className="btn btn-sm btn-outline-secondary">Ver</Link>
            <button className="btn btn-sm btn-primary" onClick={()=>dispatch({type:'ADD', payload:p})}>Añadir</button>
          </div>
        </div>
      </div>
    </div>
  )
}
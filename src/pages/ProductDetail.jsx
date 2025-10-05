import { useParams } from 'react-router-dom'
import data from '../data/products.json'
import { useCart } from '../context/CartContext.jsx'
import { money } from '../utils/format.js'

export default function ProductDetail(){
  const { id } = useParams()
  const product = data.find(p => String(p.id) === String(id))
  const { dispatch } = useCart()
  if(!product) return <p>Producto no encontrado.</p>
  return (
    <div className="row g-4 align-items-start">
      <div className="col-12 col-md-6">
        <img src={product.image} alt={product.name} className="img-fluid bg-white p-3 rounded shadow-sm"/>
      </div>
      <div className="col-12 col-md-6">
        <h2>{product.name}</h2>
        <span className="badge-cat text-capitalize">{product.category}</span>
        <p className="mt-3">{product.description}</p>
        <h3 className="my-3">{money(product.price)}</h3>
        <button className="btn btn-primary btn-lg" onClick={()=>dispatch({type:'ADD', payload: product})}>Añadir al carrito</button>
      </div>
    </div>
  )
}
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import QuantityInput from '../components/QuantityInput.jsx'
import { money } from '../utils/format.js'

export default function Cart(){
  const { cart, dispatch, totals } = useCart()
  const changeQty = (id, qty) => dispatch({ type:'SET_QTY', payload:{ id, qty } })
  const remove = (id) => dispatch({ type:'REMOVE', payload:id })

  if(cart.length === 0){
    return (
      <div className="text-center py-5">
        <h3>Tu carrito está vacío</h3>
        <Link to="/productos" className="btn btn-primary mt-3">Explorar productos</Link>
      </div>
    )
  }

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-8">
        <div className="list-group">
          {cart.map(item => (
            <div key={item.id} className="list-group-item d-flex align-items-center gap-3">
              <img src={item.image} alt={item.name} width="72" height="72" style={{objectFit:'contain', background:'#fff', borderRadius:6}}/>
              <div className="flex-fill">
                <div className="d-flex justify-content-between">
                  <strong>{item.name}</strong>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>remove(item.id)}>Quitar</button>
                </div>
                <div className="text-muted small text-capitalize">{item.category}</div>
                <div className="d-flex align-items-center gap-3 mt-2">
                  <QuantityInput value={item.qty} onChange={(q)=>changeQty(item.id, q)} />
                  <span className="ms-auto fw-semibold">{money(item.price * item.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="card p-3 shadow-sm">
          <h5>Resumen</h5>
          <div className="d-flex justify-content-between"><span>Ítems</span><span>{totals.items}</span></div>
          <div className="d-flex justify-content-between"><span>Subtotal</span><span>{money(totals.subtotal)}</span></div>
          <hr/>
          <div className="d-grid">
            <button className="btn btn btn-success">Proceder al pago</button>
            <button className="btn btn-outline-danger mt-2" onClick={()=>dispatch({type:'CLEAR'})}>Vaciar carrito</button>
          </div>
        </div>
      </div>
    </div>
  )
}
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar(){
  const { totals } = useCart()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const q = params.get('q') || ''

  const onSearch = (e)=>{
    e.preventDefault()
    const value = new FormData(e.currentTarget).get('q') || ''
    navigate(`/productos?q=${encodeURIComponent(value)}`)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">HardTech</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink end to="/" className="nav-link">Inicio</NavLink></li>
            <li className="nav-item"><NavLink to="/productos" className="nav-link">Productos</NavLink></li>
          </ul>
          <form className="d-flex me-3" role="search" onSubmit={onSearch}>
            <input className="form-control me-2" type="search" placeholder="Buscar..." name="q" defaultValue={q} />
            <button className="btn btn-outline-primary" type="submit">Buscar</button>
          </form>
          <Link to="/carrito" className="btn btn-primary position-relative">
            Carrito
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{totals.items}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <div className="text-center py-5">
      <h1 className="mb-3">Bienvenido a HardTech</h1>
      <p className="lead">Tu tienda de tecnología: PCs, tablets, routers, accesorios y más.</p>
      <Link to="/productos" className="btn btn-primary btn-lg mt-3">Ver Productos</Link>
    </div>
  )
}
import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="text-center py-5">
      <h2>404</h2>
      <p>Página no encontrada.</p>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  )
}
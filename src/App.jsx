import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import NotFound from './pages/NotFound.jsx'
import Footer from './components/Footer.jsx'
import { CartProvider } from './context/CartContext.jsx'

export default function App(){
  return (
    <CartProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navbar/>
        <main className="container flex-fill py-4">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/productos" element={<Products/>}/>
            <Route path="/producto/:id" element={<ProductDetail/>}/>
            <Route path="/carrito" element={<Cart/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </CartProvider>
  )
}
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext()

const initial = () => {
  try{ const raw = localStorage.getItem('cart_v1'); return raw ? JSON.parse(raw) : [] }catch{ return [] }
}

function reducer(state, action){
  switch(action.type){
    case 'ADD': {
      const item = action.payload
      const idx = state.findIndex(p => p.id === item.id)
      if(idx >= 0){ const c=[...state]; c[idx]={...c[idx], qty:c[idx].qty+(item.qty||1)}; return c }
      return [...state, { ...item, qty:item.qty||1 }]
    }
    case 'SET_QTY': {
      const { id, qty } = action.payload
      return state.map(p => p.id===id ? { ...p, qty: Math.max(1, qty) } : p)
    }
    case 'REMOVE': return state.filter(p => p.id !== action.payload)
    case 'CLEAR': return []
    default: return state
  }
}

export function CartProvider({ children }){
  const [cart, dispatch] = useReducer(reducer, [], initial)
  useEffect(()=>{ localStorage.setItem('cart_v1', JSON.stringify(cart)) }, [cart])
  const totals = useMemo(()=>{
    const items = cart.reduce((a,b)=>a+b.qty,0)
    const subtotal = cart.reduce((a,b)=>a+b.qty*b.price,0)
    return { items, subtotal, total: subtotal }
  }, [cart])
  return <CartContext.Provider value={{ cart, dispatch, totals }}>{children}</CartContext.Provider>
}
export const useCart = ()=>useContext(CartContext)
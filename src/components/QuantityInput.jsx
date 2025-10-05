export default function QuantityInput({ value, onChange }){
  return (
    <div className="input-group input-group-sm" style={{ maxWidth:'120px' }}>
      <button className="btn btn-outline-secondary" type="button" onClick={()=>onChange(Math.max(1, value-1))}>-</button>
      <input type="number" className="form-control text-center" value={value} min={1} onChange={e=>onChange(Math.max(1, Number(e.target.value)||1))}/>
      <button className="btn btn-outline-secondary" type="button" onClick={()=>onChange(value+1)}>+</button>
    </div>
  )
}
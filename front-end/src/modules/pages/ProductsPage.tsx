import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../shared/api'
import { useCartStore } from '../stores/cartStore'

export function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const add = useCartStore(s => s.add)

  useEffect(() => {
    api.get('/v1/products').then(res => {
      setProducts(res.data.data ?? res.data)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(p => (
        <div key={p.id} className="border rounded p-3 flex flex-col">
          <img src={p.image || 'https://via.placeholder.com/300x200?text=Product'} alt="" className="aspect-video object-cover rounded" />
          <Link to={`/products/${p.slug}`} className="mt-2 font-medium hover:underline">{p.name}</Link>
          <div className="text-sm text-gray-500">{p.brand} · {p.category}</div>
          <div className="mt-auto flex items-center justify-between">
            <span className="font-semibold">${p.price}</span>
            <button className="px-3 py-1 border rounded" onClick={() => add(p, 1)}>Add</button>
          </div>
        </div>
      ))}
    </div>
  )
}

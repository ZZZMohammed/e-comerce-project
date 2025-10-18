import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../shared/api'
import { useCartStore } from '../stores/cartStore'

export function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const add = useCartStore(s => s.add)

  useEffect(() => {
    if (!slug) return
    api.get(`/v1/products/${slug}`).then(res => setProduct(res.data)).finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div>Loading...</div>
  if (!product) return <div>Not found</div>

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={product.image || 'https://via.placeholder.com/600x400?text=Product'} alt="" className="rounded" />
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="text-gray-500">{product.brand} · {product.category}</div>
        <p className="mt-4">{product.description}</p>
        <div className="mt-6 flex items-center gap-4">
          <span className="text-xl font-bold">${product.price}</span>
          <button className="px-4 py-2 border rounded" onClick={() => add(product, 1)}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

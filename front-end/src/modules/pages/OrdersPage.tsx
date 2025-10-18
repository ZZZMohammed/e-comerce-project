import { useEffect, useState } from 'react'
import { apiAuthed } from '../shared/api'

export function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiAuthed.get('/v1/orders').then(res => setOrders(res.data.data ?? res.data)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      {orders.map(o => (
        <div key={o.id} className="border p-3 rounded">
          <div className="font-semibold">Order #{o.id} · {o.status} · ${o.total}</div>
          <ul className="list-disc pl-6 text-sm text-gray-600">
            {o.items?.map((it: any) => (
              <li key={it.id}>{it.product?.name} × {it.quantity} = ${it.subtotal}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

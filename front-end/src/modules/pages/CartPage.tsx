import { useCartStore } from '../stores/cartStore'
import { apiAuthed } from '../shared/api'

export function CartPage() {
  const { items, totalPrice, update, remove, clear } = useCartStore()

  const checkout = async () => {
    const payload = {
      items: items.map(i => ({ product_id: i.product.id, quantity: i.quantity }))
    }
    const res = await apiAuthed.post('/v1/orders', payload)
    alert('Order created #' + res.data.id)
    clear()
  }

  return (
    <div className="space-y-4">
      {items.length === 0 && <div>Your cart is empty.</div>}
      {items.map(i => (
        <div key={i.product.id} className="flex items-center gap-4 border p-3 rounded">
          <img src={i.product.image || 'https://via.placeholder.com/80'} className="w-20 h-20 object-cover rounded" />
          <div className="flex-1">
            <div className="font-medium">{i.product.name}</div>
            <div className="text-sm text-gray-500">${i.product.price}</div>
          </div>
          <input type="number" min={1} value={i.quantity} onChange={e => update(i.product.id, Number(e.target.value))} className="w-20 border rounded px-2 py-1" />
          <button onClick={() => remove(i.product.id)} className="px-3 py-1 border rounded">Remove</button>
        </div>
      ))}

      {items.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</div>
          <button onClick={checkout} className="px-4 py-2 border rounded">Checkout</button>
        </div>
      )}
    </div>
  )
}

import { create } from 'zustand'

export type CartItem = {
  product: any
  quantity: number
}

type CartState = {
  items: CartItem[]
  add: (product: any, quantity: number) => void
  update: (productId: number, quantity: number) => void
  remove: (productId: number) => void
  clear: () => void
  totalPrice: number
  totalQuantity: number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  add: (product, quantity) => {
    const items = [...get().items]
    const existing = items.find(i => i.product.id === product.id)
    if (existing) existing.quantity += quantity
    else items.push({ product, quantity })
    set({ items })
  },
  update: (productId, quantity) => {
    const items = get().items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    set({ items })
  },
  remove: (productId) => {
    set({ items: get().items.filter(i => i.product.id !== productId) })
  },
  clear: () => set({ items: [] }),
  get totalPrice() {
    return get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  },
  get totalQuantity() {
    return get().items.reduce((sum, i) => sum + i.quantity, 0)
  },
}))

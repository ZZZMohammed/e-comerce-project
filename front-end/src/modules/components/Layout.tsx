import { Link, Outlet } from 'react-router-dom'
import { useCartStore } from '../stores/cartStore'

export function Layout() {
  const itemCount = useCartStore(s => s.totalQuantity)
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
          <Link to="/products" className="font-semibold">Ecommerce</Link>
          <nav className="flex items-center gap-4 ml-auto">
            <Link to="/products" className="hover:underline">Products</Link>
            <Link to="/orders" className="hover:underline">Orders</Link>
            <Link to="/cart" className="hover:underline">Cart ({itemCount})</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">© {new Date().getFullYear()} Ecommerce</div>
      </footer>
    </div>
  )
}

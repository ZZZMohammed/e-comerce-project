import { useState } from 'react'
import { auth } from '../../shared/auth'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await auth.login({ email, password })
      navigate('/products')
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto space-y-3">
      <h1 className="text-xl font-semibold">Login</h1>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="w-full border rounded px-3 py-2">Sign in</button>
    </form>
  )
}

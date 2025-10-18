import { api, apiAuthed } from './api'

export const auth = {
  async login(payload: { email: string; password: string }) {
    const res = await api.post('/v1/auth/login', payload)
    localStorage.setItem('token', res.data.token)
    return res.data
  },
  async register(payload: { name: string; email: string; password: string; password_confirmation: string }) {
    const res = await api.post('/v1/auth/register', payload)
    localStorage.setItem('token', res.data.token)
    return res.data
  },
  async me() {
    const res = await apiAuthed.get('/v1/auth/me')
    return res.data
  },
  async logout() {
    await apiAuthed.post('/v1/auth/logout')
    localStorage.removeItem('token')
  },
}

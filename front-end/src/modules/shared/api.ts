import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

export function getToken() {
  return localStorage.getItem('token')
}

export const apiAuthed = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

apiAuthed.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` }
  }
  return config
})

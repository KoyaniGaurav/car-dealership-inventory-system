import axios from 'axios'
import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const skipAuthRedirect = error.config?.skipAuthRedirect
    const isAuthPage = ['/login', '/register'].some((path) =>
      window.location.pathname.includes(path)
    )

    if (error.response?.status === 401 && !skipAuthRedirect && !isAuthPage) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN)
      localStorage.removeItem(STORAGE_KEYS.EMAIL)
      localStorage.removeItem(STORAGE_KEYS.ROLE)
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance

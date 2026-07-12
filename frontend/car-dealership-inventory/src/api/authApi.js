import axiosInstance from './axiosInstance'

export async function login(credentials) {
  const response = await axiosInstance.post('/auth/login', credentials)
  return response.data
}

export async function register(userData) {
  const response = await axiosInstance.post('/auth/register', userData)
  return response.data
}

export async function probeAdminRole() {
  try {
    await axiosInstance.post('/vehicles', {})
    return 'ADMIN'
  } catch (error) {
    if (error.response?.status === 403) {
      return 'USER'
    }
    if (error.response?.status === 400) {
      return 'ADMIN'
    }
    throw error
  }
}

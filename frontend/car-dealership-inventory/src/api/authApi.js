import axiosInstance from './axiosInstance'

export async function login(credentials) {
  const response = await axiosInstance.post('/auth/login', credentials)
  return response.data
}

export async function register(userData) {
  const response = await axiosInstance.post('/auth/register', userData)
  return response.data
}

export async function probeAdminRole(token) {
  try {
    await axiosInstance.post(
      '/vehicles',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        // Skip global 401 handler during login role detection
        skipAuthRedirect: true,
      }
    )
    return 'ADMIN'
  } catch (error) {
    const status = error.response?.status

    // 400 = reached admin controller, validation failed on empty body
    if (status === 400) {
      return 'ADMIN'
    }

    // 403 = authenticated USER, not allowed to create vehicles
    // 401 = treat as regular user so login is not blocked
    if (status === 403 || status === 401) {
      return 'USER'
    }

    return 'USER'
  }
}

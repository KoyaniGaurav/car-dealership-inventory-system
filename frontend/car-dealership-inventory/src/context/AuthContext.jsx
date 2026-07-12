import { createContext, useContext, useMemo, useState } from 'react'
import { login as loginApi, register as registerApi, probeAdminRole } from '../api/authApi'
import { clearAuth, getStoredAuth, saveAuth } from '../services/authService'
import { getErrorMessage } from '../utils/apiError'
import { ROLES } from '../utils/constants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const storedAuth = getStoredAuth()
  const [token, setToken] = useState(storedAuth.token)
  const [email, setEmail] = useState(storedAuth.email)
  const [role, setRole] = useState(storedAuth.role)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const isAuthenticated = Boolean(token)
  const isAdmin = role === ROLES.ADMIN

  async function login(credentials) {
    setLoading(true)
    setError(null)

    try {
      const data = await loginApi(credentials)

      saveAuth({
        token: data.token,
        email: credentials.email,
      })

      const detectedRole = await probeAdminRole(data.token)

      setToken(data.token)
      setEmail(credentials.email)
      setRole(detectedRole)

      saveAuth({
        token: data.token,
        email: credentials.email,
        role: detectedRole,
      })

      return { success: true, role: detectedRole }
    } catch (err) {
      clearAuth()
      setToken(null)
      setEmail(null)
      setRole(null)
      const message = getErrorMessage(err, 'Login failed. Please try again.')
      setError(message)
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }

  async function register(userData) {
    setLoading(true)
    setError(null)

    try {
      await registerApi({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      })
      return { success: true }
    } catch (err) {
      const message = getErrorMessage(err, 'Registration failed. Please try again.')
      setError(message)
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    clearAuth()
    setToken(null)
    setEmail(null)
    setRole(null)
    setError(null)
  }

  const value = useMemo(
    () => ({
      token,
      email,
      role,
      loading,
      error,
      isAuthenticated,
      isAdmin,
      login,
      register,
      logout,
      setError,
    }),
    [token, email, role, loading, error, isAuthenticated, isAdmin]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

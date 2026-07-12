import { STORAGE_KEYS, ROLES } from '../utils/constants'

export function getStoredAuth() {
  return {
    token: localStorage.getItem(STORAGE_KEYS.TOKEN),
    email: localStorage.getItem(STORAGE_KEYS.EMAIL),
    role: localStorage.getItem(STORAGE_KEYS.ROLE),
  }
}

export function saveAuth({ token, email, role }) {
  if (token) localStorage.setItem(STORAGE_KEYS.TOKEN, token)
  if (email) localStorage.setItem(STORAGE_KEYS.EMAIL, email)
  if (role) localStorage.setItem(STORAGE_KEYS.ROLE, role)
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN)
  localStorage.removeItem(STORAGE_KEYS.EMAIL)
  localStorage.removeItem(STORAGE_KEYS.ROLE)
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(STORAGE_KEYS.TOKEN))
}

export function isAdmin() {
  return localStorage.getItem(STORAGE_KEYS.ROLE) === ROLES.ADMIN
}

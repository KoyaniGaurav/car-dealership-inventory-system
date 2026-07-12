export const API_BASE_URL = '/api'

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/',
  VEHICLES: '/vehicles',
  VEHICLE_DETAILS: '/vehicles/:id',
  ADMIN: '/admin',
  ADMIN_ADD: '/admin/add',
  ADMIN_EDIT: '/admin/edit/:id',
}

export const CATEGORIES = [
  'SUV',
  'SEDAN',
  'HATCHBACK',
  'COUPE',
  'PICKUP_TRUCK',
  'WAGON',
]

export const CATEGORY_LABELS = {
  SUV: 'SUV',
  SEDAN: 'Sedan',
  HATCHBACK: 'Hatchback',
  COUPE: 'Coupe',
  PICKUP_TRUCK: 'Pickup Truck',
  WAGON: 'Wagon',
}

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
}

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  EMAIL: 'auth_email',
  ROLE: 'auth_role',
}

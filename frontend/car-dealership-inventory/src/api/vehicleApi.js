import axiosInstance from './axiosInstance'

export async function getAllVehicles() {
  const response = await axiosInstance.get('/vehicles')
  return response.data
}

export async function searchVehicles(filters) {
  const params = {}

  if (filters.make?.trim()) params.make = filters.make.trim()
  if (filters.model?.trim()) params.model = filters.model.trim()
  if (filters.category) params.category = filters.category
  if (filters.minPrice !== '' && filters.minPrice != null) params.minPrice = filters.minPrice
  if (filters.maxPrice !== '' && filters.maxPrice != null) params.maxPrice = filters.maxPrice

  const response = await axiosInstance.get('/vehicles/search', { params })
  return response.data
}

export async function purchaseVehicle(id) {
  const response = await axiosInstance.post(`/vehicles/${id}/purchase`)
  return response.data
}

export async function createVehicle(vehicle) {
  const response = await axiosInstance.post('/vehicles', vehicle)
  return response.data
}

export async function updateVehicle(id, vehicle) {
  const response = await axiosInstance.put(`/vehicles/${id}`, vehicle)
  return response.data
}

export async function deleteVehicle(id) {
  await axiosInstance.delete(`/vehicles/${id}`)
}

export async function restockVehicle(id, quantity) {
  const response = await axiosInstance.post(`/vehicles/${id}/restock`, { quantity })
  return response.data
}

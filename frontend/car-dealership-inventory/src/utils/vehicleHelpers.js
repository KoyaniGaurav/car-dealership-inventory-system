export function getStockClass(quantity) {
  if (quantity <= 0) return 'stock--out'
  if (quantity <= 3) return 'stock--low'
  return 'stock--in'
}

export function computeVehicleStats(vehicles) {
  const total = vehicles.length
  const inStock = vehicles.filter((vehicle) => vehicle.quantity > 0).length
  const outOfStock = vehicles.filter((vehicle) => vehicle.quantity <= 0).length
  const totalValue = vehicles.reduce(
    (sum, vehicle) => sum + Number(vehicle.price) * Number(vehicle.quantity),
    0
  )
  const lowStock = vehicles.filter((vehicle) => vehicle.quantity > 0 && vehicle.quantity <= 3)

  return { total, inStock, outOfStock, totalValue, lowStock }
}

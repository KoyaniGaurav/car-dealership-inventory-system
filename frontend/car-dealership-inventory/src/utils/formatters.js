import { CATEGORY_LABELS } from './constants'

export function formatPrice(price) {
  if (price == null) return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatCategory(category) {
  return CATEGORY_LABELS[category] || category
}

export function formatStockStatus(quantity) {
  if (quantity <= 0) return 'Out of Stock'
  if (quantity <= 3) return 'Low Stock'
  return 'In Stock'
}

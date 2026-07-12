import { useEffect, useState } from 'react'
import { CATEGORIES, CATEGORY_LABELS } from '../../utils/constants'
import { validateVehicleForm } from '../../utils/validators'
import Button from '../common/Button'
import Input from '../common/Input'

const INITIAL_FORM = {
  make: '',
  model: '',
  category: '',
  price: '',
  quantity: '',
}

function VehicleForm({ initialData, onSubmit, onCancel, loading, submitLabel = 'Save Vehicle' }) {
  const [formData, setFormData] = useState(() => ({
    ...INITIAL_FORM,
    ...initialData,
    price: initialData?.price ?? '',
    quantity: initialData?.quantity ?? '',
  }))
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...INITIAL_FORM,
        ...initialData,
        price: initialData.price ?? '',
        quantity: initialData.quantity ?? '',
      })
    }
  }, [initialData])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateVehicleForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    onSubmit({
      make: formData.make.trim(),
      model: formData.model.trim(),
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    })
  }

  return (
    <form className="vehicle-form" onSubmit={handleSubmit} noValidate>
      <div className="vehicle-form__grid">
        <Input
          label="Make"
          name="make"
          value={formData.make}
          placeholder="e.g. Toyota"
          error={errors.make}
          onChange={handleChange}
          required
        />
        <Input
          label="Model"
          name="model"
          value={formData.model}
          placeholder="e.g. RAV4"
          error={errors.model}
          onChange={handleChange}
          required
        />
        <div className="form-field">
          <label className="form-field__label" htmlFor="category">
            Category <span className="form-field__required">*</span>
          </label>
          <select
            id="category"
            name="category"
            className={`form-field__select ${errors.category ? 'form-field__select--error' : ''}`}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {CATEGORY_LABELS[category]}
              </option>
            ))}
          </select>
          {errors.category && <span className="form-field__error">{errors.category}</span>}
        </div>
        <Input
          label="Price ($)"
          name="price"
          type="number"
          value={formData.price}
          placeholder="30000"
          error={errors.price}
          onChange={handleChange}
          required
        />
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          placeholder="5"
          error={errors.quantity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="vehicle-form__actions">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default VehicleForm

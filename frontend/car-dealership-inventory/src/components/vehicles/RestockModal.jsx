import { useState } from 'react'
import { validateRestockQuantity } from '../../utils/validators'
import Button from '../common/Button'
import Input from '../common/Input'
import Modal from '../common/Modal'

function RestockModal({ vehicle, isOpen, onClose, onConfirm, loading }) {
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState('')

  function handleClose() {
    setQuantity('')
    setError('')
    onClose()
  }

  function handleConfirm() {
    const validationError = validateRestockQuantity(quantity)
    if (validationError) {
      setError(validationError)
      return
    }

    onConfirm(Number(quantity))
  }

  if (!vehicle) return null

  return (
    <Modal
      isOpen={isOpen}
      title={`Restock ${vehicle.make} ${vehicle.model}`}
      onClose={handleClose}
      footer={
        <>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? 'Restocking...' : 'Confirm Restock'}
          </Button>
        </>
      }
    >
      <p className="restock-modal__info">
        Current stock: <strong>{vehicle.quantity}</strong> units
      </p>
      <Input
        label="Quantity to Add"
        name="quantity"
        type="number"
        value={quantity}
        placeholder="e.g. 10"
        error={error}
        onChange={(event) => {
          setQuantity(event.target.value)
          setError('')
        }}
        required
      />
    </Modal>
  )
}

export default RestockModal

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/common/Alert'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { useAuth } from '../hooks/useAuth'
import { validateRegisterForm } from '../utils/validators'

function RegisterPage() {
  const navigate = useNavigate()
  const { register, loading, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [alert, setAlert] = useState({ type: '', message: '' })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setAlert({ type: '', message: '' })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateRegisterForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const result = await register(formData)
    if (result.success) {
      setAlert({ type: 'success', message: 'Registration successful! Please sign in.' })
      setTimeout(() => navigate('/login'), 1500)
    } else {
      setAlert({ type: 'error', message: result.message })
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <h1 className="auth-card__title">Create Account</h1>
        <p className="auth-card__subtitle">Join the dealership inventory platform</p>
      </div>

      {alert.message && (
        <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          placeholder="John Doe"
          error={errors.name}
          onChange={handleChange}
          autoComplete="name"
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          placeholder="you@example.com"
          error={errors.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Min 8 chars with upper, lower, number & symbol"
          error={errors.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Re-enter your password"
          error={errors.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>

      <p className="auth-card__footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}

export default RegisterPage

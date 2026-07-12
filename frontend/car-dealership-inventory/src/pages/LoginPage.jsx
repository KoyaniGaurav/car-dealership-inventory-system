import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/common/Alert'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { useAuth } from '../hooks/useAuth'
import { validateLoginForm } from '../utils/validators'

function LoginPage() {
  const navigate = useNavigate()
  const { login, loading, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [alert, setAlert] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setAlert('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateLoginForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const result = await login(formData)
    if (result.success) {
      navigate('/')
    } else {
      setAlert(result.message)
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <h1 className="auth-card__title">Welcome Back</h1>
        <p className="auth-card__subtitle">Sign in to manage your dealership inventory</p>
      </div>

      {alert && <Alert type="error" message={alert} onClose={() => setAlert('')} />}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
          placeholder="Enter your password"
          error={errors.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <p className="auth-card__footer">
        Don&apos;t have an account? <Link to="/register">Create one</Link>
      </p>
    </div>
  )
}

export default LoginPage

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email is required'
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid email address'
  }
  return ''
}

export function validatePassword(password) {
  if (!password) {
    return 'Password is required'
  }
  if (!PASSWORD_REGEX.test(password)) {
    return 'Password must be 8+ chars with uppercase, lowercase, number, and special character (@$!%*?&)'
  }
  return ''
}

export function validateName(name) {
  if (!name || !name.trim()) {
    return 'Name is required'
  }
  return ''
}

export function validateLoginForm({ email, password }) {
  const errors = {}
  const emailError = validateEmail(email)
  const passwordError = password ? '' : 'Password is required'

  if (emailError) errors.email = emailError
  if (passwordError) errors.password = passwordError

  return errors
}

export function validateRegisterForm({ name, email, password, confirmPassword }) {
  const errors = {}
  const nameError = validateName(name)
  const emailError = validateEmail(email)
  const passwordError = validatePassword(password)

  if (nameError) errors.name = nameError
  if (emailError) errors.email = emailError
  if (passwordError) errors.password = passwordError

  if (password && confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  } else if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  }

  return errors
}

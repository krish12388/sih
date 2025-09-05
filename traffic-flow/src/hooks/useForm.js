import { useState, useCallback } from 'react'

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = useCallback((name, value) => {
    const rules = validationRules[name]
    if (!rules) return ''

    for (const rule of rules) {
      const error = rule(value, values)
      if (error) return error
    }
    return ''
  }, [validationRules, values])

  const validateForm = useCallback(() => {
    const newErrors = {}
    let isValid = true

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, values[field])
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [values, validateField, validationRules])

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value

    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }, [errors])

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    // Validate field on blur
    const error = validateField(name, value)
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }, [validateField])

  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true)
    setTouched(
      Object.keys(validationRules).reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {})
    )

    const isValid = validateForm()
    
    if (isValid) {
      try {
        await onSubmit(values)
      } catch (error) {
        console.error('Form submission error:', error)
      }
    }
    
    setIsSubmitting(false)
  }, [values, validateForm, validationRules])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }, [])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    validateForm
  }
}

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required') => (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return message
    }
    return ''
  },

  email: (message = 'Please enter a valid email address') => (value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return message
    }
    return ''
  },

  minLength: (min, message) => (value) => {
    if (value && value.length < min) {
      return message || `Must be at least ${min} characters long`
    }
    return ''
  },

  maxLength: (max, message) => (value) => {
    if (value && value.length > max) {
      return message || `Must be no more than ${max} characters long`
    }
    return ''
  },

  pattern: (regex, message) => (value) => {
    if (value && !regex.test(value)) {
      return message || 'Invalid format'
    }
    return ''
  },

  confirmPassword: (passwordField, message = 'Passwords do not match') => (value, allValues) => {
    if (value && value !== allValues[passwordField]) {
      return message
    }
    return ''
  }
}
import { forwardRef } from 'react'

export const TextInput = forwardRef(function TextInput({ invalid = false, className = '', ...props }, ref) {
  const errorId = `${props.id}-error`
  return (
    <input
      ref={ref}
      className={`form-control ${invalid ? 'is-invalid' : ''} ${className}`.trim()}
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
      {...props}
    />
  )
})


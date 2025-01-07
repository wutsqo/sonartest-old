import React from 'react'
import PropTypes from 'prop-types'
import { BUTTON_CLASSNAMES } from './variants'
import useAppearance from 'commons/appearance/useAppearance'

// variant: primary, secondary, tertiary
const Button = ({
  disabled,
  type,
  onClick,
  variant,
  className,
  children,
  kit,
}) => {
  const interfaceKit = useAppearance()
  const buttonStyle = (kit ?? interfaceKit).button[variant]
  const buttonVariant = BUTTON_CLASSNAMES[buttonStyle]

  return (
    <button
      className={`btn ${buttonVariant} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type || 'button'}
    >
      {children}
    </button>
  )
}

export default Button

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'neutral']),
}

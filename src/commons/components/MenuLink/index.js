import React from 'react'
import { Link } from 'react-router-dom'

const MenuLink = ({ to, className, onClick, tabIndex, children }) => {
  if (to === '#') {
    return (
      <button
        tabIndex={tabIndex ?? 0}
        className={className + ' flex justify-between'}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  return (
    <Link to={to} onClick={onClick}>
      <span className={className}>{children}</span>
    </Link>
  )
}

export default MenuLink

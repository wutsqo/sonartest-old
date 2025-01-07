import React from 'react'

const MenuChildren = ({ isFirstLevel, children, className }) => {
  return (
    <ul
      className={
        className +
        (isFirstLevel
          ? ' rounded-box bg-base-100 text-base-content shadow-xl p-2'
          : '')
      }
    >
      {children}
    </ul>
  )
}

export default MenuChildren

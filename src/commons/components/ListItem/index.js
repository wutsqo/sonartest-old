import React from 'react'
const ListItem = ({ onClick, variant, children }) => {
  return (
    <li
      className="w-full card card-compact bg-base-100 shadow-lg"
      onClick={onClick}
      {...variant}
    >
      {children}
    </li>
  )
}

export default ListItem

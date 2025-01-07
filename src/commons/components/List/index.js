import React from 'react'

const List = ({ className, children }) => {
  return (
    <ul
      className={`grid w-full gap-6 ${className}`}
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(290px, 1fr))` }}
    >
      {children}
    </ul>
  )
}

export default List

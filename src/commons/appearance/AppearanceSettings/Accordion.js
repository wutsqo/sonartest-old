import React from 'react'

const Accordion = ({ active, setActive, name, label, children }) => {
  return (
    <div
      onClick={() => setActive(name)}
      className={`collapse collapse-arrow border border-base-300 bg-base-100 rounded-box ${
        active === name ? 'collapse-open' : 'collapse-close'
      }`}
    >
      <div className="collapse-title text-xl font-medium">{label}</div>
      <div className="collapse-content">{children}</div>
    </div>
  )
}

export default Accordion

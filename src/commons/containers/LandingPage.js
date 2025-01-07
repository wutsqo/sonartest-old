import { Footer, Hero } from 'commons/components'
import React from 'react'

const LandingPage = () => {
  const DUMMY_BANNER =
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

  return (
    <div className="landing-page">
      <Hero banner={DUMMY_BANNER} />
    </div>
  )
}

export default LandingPage

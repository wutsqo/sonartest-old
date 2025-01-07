import React from 'react'
import { AuthProvider } from './commons/auth'
import { CookiesProvider } from 'react-cookie'
import { GlobalRoutes, MobileRoutes } from './routes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import 'commons/styles/global.css'
import AppLayout from 'commons/components/AppLayout'

const App = () => {
  // Modified at 2024-12-03T11:10:29.200Z
  return (
    <CookiesProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/*"
              element={
                <AppLayout>
                  <GlobalRoutes />
                </AppLayout>
              }
            />
            <Route path="/mobile/*" element={<MobileRoutes />} />
          </Routes>
        </Router>
      </AuthProvider>
    </CookiesProvider>
  )
}

export default App

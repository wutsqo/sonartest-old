import React, { useEffect, useState } from 'react'

import axios from 'axios'
import useAppearanceStore from 'commons/appearance/store'
import environment from 'commons/utils/environment'

import { Toaster } from 'react-hot-toast'
import { FiLogOut } from 'react-icons/fi'
import { ImSpinner } from 'react-icons/im'
import { Link, useNavigate } from 'react-router-dom'

import Brand from './Brand'
import Navbar from './Navigation/Navbar'
import SidebarMenu from './Navigation/Sidebar'

import menus, { settingsMenu } from 'menus'
import { INTERFACE_KITS } from 'commons/constants/interface'
import useTypography from './Typography'

import { useAuth } from '../auth'
import Footer from './Footer'
import HeaderContext from './Header/HeaderContext'
import Header from './Header'

const AppLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { interfaceKit, colorTheme, setAppearance } = useAppearanceStore()
  const typography = useTypography()
  const [title, setTitle] = useState('Home')

  const navigate = useNavigate()
  const { isAuth, logout, checkPermission } = useAuth()

  const logoutUser = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    if (!colorTheme) {
      setIsLoading(true)
      axios
        .get(`${environment.staticServerApi}/appearance`)
        .then(res => setAppearance(res.data))
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false))
    }
  }, [])

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const isRounded = INTERFACE_KITS[interfaceKit]?.rounded ?? true

  if (isLoading)
    return (
      <div className="w-screen h-screen grid place-items-center">
        <ImSpinner className="w-12 h-12 animate-spin" />
      </div>
    )

  return (
    <div
      data-theme={colorTheme}
      className={`drawer ${typography} ${
        isRounded ? 'rounded-true' : 'rounded-false'
      }`}
    >
      <input
        type="checkbox"
        checked={isSidebarOpen}
        onChange={setIsSidebarOpen}
        id="drawer-toggle"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <div className="min-h-screen flex flex-col">
          <Navbar {...{ isAuth, logout: logoutUser, menus, toggleSidebar }} />
          <HeaderContext.Provider value={{ title, setTitle }}>
            <div className="flex-1 bg-base-200">{children}</div>
          </HeaderContext.Provider>
        </div>
        <Footer />
      </div>
      <div className="drawer-side">
        <div onClick={toggleSidebar} className="drawer-overlay"></div>
        <div className="overflow-y-auto flex flex-col relative h-screen w-80 bg-base-100">
          <div
            onClick={toggleSidebar}
            className="pt-4 px-4 pb-3 border-b sticky top-0 bg-base-100 z-[1]"
          >
            <Brand />
          </div>
          <ul className="menu flex-1 p-4">
            {menus.map(menu => (
              <SidebarMenu
                key={menu.label}
                menu={menu}
                onClick={toggleSidebar}
              />
            ))}
            {checkPermission('administrator') &&
              settingsMenu.map(menu => (
                <SidebarMenu
                  key={menu.label}
                  menu={menu}
                  onClick={toggleSidebar}
                  isFirstLevel
                />
              ))}
          </ul>
          {isAuth ? (
            <div className="p-4 sticky bottom-0 bg-base-100">
              <button
                className="btn btn-error btn-outline items-center w-full gap-2 text-primary-content normal-case"
                onClick={logoutUser}
              >
                <FiLogOut className="w-5 h-5" />
                Keluar
              </button>
            </div>
          ) : (
            <div className="sticky bg-base-100 bottom-0 p-4">
              <Link
                to="/login"
                onClick={toggleSidebar}
                className="btn btn-primary w-full"
              >
                <label htmlFor="drawer-toggle">Login</label>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default AppLayout

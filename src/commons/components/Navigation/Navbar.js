import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiLogOut, FiMenu } from 'react-icons/fi'
import { GoChevronDown } from 'react-icons/go'

import Brand from '../Brand'
import MenuLink from '../MenuLink'
import MenuItem from '../MenuItem'
import MenuChildren from '../MenuChildren'
import { settingsMenu } from 'menus'

import { useAuth } from 'commons/auth'

const Menu = ({ menu, isFirstLevel }) => {
  return (
    <MenuItem>
      <MenuLink to={menu.route}>
        {menu.label}
        {menu?.subMenus?.length > 0 && <GoChevronDown />}
      </MenuLink>
      {menu?.subMenus?.length > 0 && (
        <MenuChildren isFirstLevel={isFirstLevel}>
          {menu.subMenus.map(subMenu => (
            <Menu key={subMenu.label} menu={subMenu} />
          ))}
        </MenuChildren>
      )}
    </MenuItem>
  )
}

const Navbar = ({ isAuth, logout, menus, toggleSidebar }) => {
  const { checkPermission } = useAuth()
  const { pathname } = useLocation()
  const isNotAuthPage = ['/register', '/login', '/forgot-password']

  return (
    <nav className="sticky top-0 navbar justify-between w-full py-0 px-4 bg-primary text-primary-content z-20 shadow-xl">
      <Brand />
      {!isNotAuthPage.includes(pathname) && (
        <ul className="menu menu-horizontal rounded-box p-2 hidden lg:flex">
          {menus.map(menu => (
            <Menu key={menu.label} menu={menu} isFirstLevel />
          ))}
          {!isAuth ? (
            <MenuItem>
              <Link
                to={'/login'}
                className="btn btn-primary bg-base-100 text-base-content hover:text-base-primary"
              >
                Masuk
              </Link>
            </MenuItem>
          ) : (
            checkPermission('administrator') &&
            settingsMenu.map(menu => (
              <Menu key={menu.label} menu={menu} isFirstLevel />
            ))
          )}
        </ul>
      )}
      {isAuth && (
        <button
          className="btn btn-ghost items-center gap-2 text-primary-content normal-case hidden lg:inline-flex"
          onClick={logout}
        >
          <FiLogOut className="w-5 h-5" />
          Keluar
        </button>
      )}
      {!isNotAuthPage.includes(pathname) && (
        <label htmlFor="drawer-toggle" className="flex-none lg:hidden">
          <button
            onClick={toggleSidebar}
            title="Toggle Sidebar"
            className="btn btn-square btn-ghost"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </label>
      )}
    </nav>
  )
}

export default Navbar

import MenuItem from '../MenuItem'
import MenuLink from '../MenuLink'

const SidebarMenu = ({ menu, onClick }) => {
  if (menu?.subMenus?.length > 0) {
    return (
      <label
        htmlFor={menu.label}
        tabIndex={0}
        className="collapse collapse-arrow"
      >
        <input type="checkbox" name={menu.label} />
        <MenuLink to={menu.route} className="collapse-title">
          {menu.label}
        </MenuLink>
        <ul className="collapse-content menu">
          {menu.subMenus.map(subMenu => (
            <SidebarMenu key={subMenu.label} menu={subMenu} onClick={onClick} />
          ))}
        </ul>
      </label>
    )
  }
  return (
    <MenuItem>
      <MenuLink to={menu.route} onClick={onClick}>
        {menu.label}
      </MenuLink>
    </MenuItem>
  )
}

export default SidebarMenu

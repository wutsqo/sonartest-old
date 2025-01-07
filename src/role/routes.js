/*
	Generated on 13/06/2024 by UI Generator PRICES-IDE
	https://amanah.cs.ui.ac.id/research/ifml-regen
	version 3.4.0
*/
import RequireAuth from 'commons/auth/RequireAuth'

import DaftarRolePage from './containers/DaftarRolePage'
import TambahRolePage from './containers/TambahRolePage'
import DetailRolePage from './containers/DetailRolePage'
import UbahRolePage from './containers/UbahRolePage'

const roleRoutes = [
  {
    path: '/settings/role/tambah',
    element: (
      <RequireAuth permissionNeeded="administrator">
        <TambahRolePage />
      </RequireAuth>
    ),
  },
  {
    path: '/settings/role/ubah',
    element: (
      <RequireAuth permissionNeeded="administrator">
        <UbahRolePage />
      </RequireAuth>
    ),
  },
  {
    path: '/settings/role/:id',
    element: (
      <RequireAuth permissionNeeded="administrator">
        <DetailRolePage />
      </RequireAuth>
    ),
  },
  {
    path: '/settings/role',
    element: (
      <RequireAuth permissionNeeded="administrator">
        <DaftarRolePage />
      </RequireAuth>
    ),
  },
]

export default roleRoutes

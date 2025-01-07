/*
	Generated on 13/06/2024 by UI Generator PRICES-IDE
	https://amanah.cs.ui.ac.id/research/ifml-regen
	version 3.4.0
*/
import RequireAuth from 'commons/auth/RequireAuth'

import TablePemasukanPage from './containers/TablePemasukanPage'
import DetailPemasukanPage from './containers/DetailPemasukanPage'
import TambahPemasukanPage from './containers/TambahPemasukanPage'
import UbahPemasukanPage from './containers/UbahPemasukanPage'

const incomeRoutes = [
  {
    path: '/income',
    element: <TablePemasukanPage />,
  },
  {
    path: '/income/:id',
    element: <DetailPemasukanPage />,
  },
  {
    path: '/income/tambah',
    element: (
      <RequireAuth permissionNeeded="CreateIncome">
        <TambahPemasukanPage />
      </RequireAuth>
    ),
  },
  {
    path: '/income/ubah',
    element: (
      <RequireAuth permissionNeeded="UpdateIcome">
        <UbahPemasukanPage />
      </RequireAuth>
    ),
  },
]

export default incomeRoutes

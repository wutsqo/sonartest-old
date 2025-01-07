/*
	Generated on 13/06/2024 by UI Generator PRICES-IDE
	https://amanah.cs.ui.ac.id/research/ifml-regen
	version 3.4.0
*/
import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useAuth } from 'commons/auth'
import {
  Button,
  Detail,
  VisualizationAttr,
  Modal,
  Spinner,
} from 'commons/components'

import deleteUser from '../services/deleteUser.js'

import * as Layouts from 'commons/layouts'

const DetailUser = ({ data }) => {
  const { checkPermission } = useAuth()
  const navigate = useNavigate()
  const [
    showModalKonfirmasiHapusUser,
    setShowModalKonfirmasiHapusUser,
  ] = React.useState(false)
  const ubah = async () => {
    navigate('/settings/user/ubah?' + `id=${data.id}`)
  }

  const pilihRole = async () => {
    navigate('/settings/user/change-role?' + `id=${data.id}`)
  }

  const hapus = async () => {
    await deleteUser({
      id: data.id,
    })
    navigate('/settings/user')
  }

  return (
    <Layouts.DetailComponentLayout
      item={data}
      itemsAttrs={[
        {
          id: 'name',
          condition: '',
          label: 'Name',
          featureName: 'name',
        },
        {
          id: 'email',
          condition: '',
          label: 'Email',
          featureName: 'email',
        },
        {
          id: 'role',
          condition: '',
          label: 'Role',
          featureName: 'userRolesName',
        },
      ]}
      itemsEvents={[
        <Button variant="secondary" onClick={() => ubah()}>
          Ubah
        </Button>,
        checkPermission('administrator') && (
          <Button variant="secondary" onClick={() => pilihRole()}>
            Pilih Role
          </Button>
        ),
        <Button
          variant="tertiary"
          onClick={() => setShowModalKonfirmasiHapusUser(true)}
        >
          Hapus
        </Button>,
      ]}
      itemsModals={[
        <Modal
          isShow={showModalKonfirmasiHapusUser}
          title={'Konfirmasi Hapus User'}
        >
          <Link to="">
            <Button
              variant="tertiary"
              onClick={() => setShowModalKonfirmasiHapusUser(false)}
            >
              Batal
            </Button>
          </Link>
          <Button variant="danger" onClick={() => hapus()}>
            Hapus
          </Button>
        </Modal>,
      ]}
    />
  )
}

export default DetailUser

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

import deleteRole from '../services/deleteRole.js'

import * as Layouts from 'commons/layouts'

const DetailRole = ({ data }) => {
  const { checkPermission } = useAuth()
  const navigate = useNavigate()
  const [
    showModalKonfirmasiHapusRole,
    setShowModalKonfirmasiHapusRole,
  ] = React.useState(false)
  const ubah = async () => {
    navigate('/settings/role/ubah?' + `id=${data.id}`)
  }

  const hapus = async () => {
    await deleteRole({
      id: data.id,
    })
    navigate('/settings/role')
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
          id: 'allowedPermissions',
          condition: '',
          label: 'Allowed Permissions',
          featureName: 'allowedPermissions',
        },
      ]}
      itemsEvents={[
        <Button variant="secondary" onClick={() => ubah()}>
          Ubah
        </Button>,
        <Button
          variant="tertiary"
          onClick={() => setShowModalKonfirmasiHapusRole(true)}
        >
          Hapus
        </Button>,
      ]}
      itemsModals={[
        <Modal
          isShow={showModalKonfirmasiHapusRole}
          title={'Konfirmasi Hapus Role'}
        >
          <Link to="">
            <Button
              variant="tertiary"
              onClick={() => setShowModalKonfirmasiHapusRole(false)}
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

export default DetailRole

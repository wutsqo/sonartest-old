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

import deleteActivity from '../services/deleteActivity.js'

import * as Layouts from 'commons/layouts'

const DetailActivity = ({ data }) => {
  const { checkPermission } = useAuth()
  const navigate = useNavigate()
  const [
    showModalKonfirmasiHapusActivity,
    setShowModalKonfirmasiHapusActivity,
  ] = React.useState(false)

  const ubah = async () => {
    navigate('/activity/ubah?' + `id=${data.id}`)
  }

  const hapus = async () => {
    await deleteActivity({
      id: data.id,
    })
    navigate('/activity')
  }

  return (
    <Layouts.DetailComponentLayout
      item={data}
      itemsAttrs={[
        {
          id: 'uRLGambarProgram',
          condition: '',
          label: 'URL Gambar Program',
          featureName: 'logoUrl',
        },
        {
          id: 'nama',
          condition: '',
          label: 'Nama',
          featureName: 'name',
        },
        {
          id: 'deskripsi',
          condition: '',
          label: 'Deskripsi',
          featureName: 'description',
        },
        {
          id: 'target',
          condition: '',
          label: 'Target',
          featureName: 'target',
        },
        {
          id: 'partner',
          condition: '',
          label: 'Partner',
          featureName: 'partner',
        },
        {
          id: 'tanggalPelaksanaan',
          condition: '',
          label: 'Tanggal Pelaksanaan',
          featureName: 'executionDate',
        },
      ]}
      itemsEvents={[
        checkPermission('DeleteActivity') && (
          <Button
            variant="tertiary"
            onClick={() => setShowModalKonfirmasiHapusActivity(true)}
          >
            Hapus
          </Button>
        ),
        checkPermission('UpdateActivity') && (
          <Button variant="secondary" onClick={() => ubah()}>
            Ubah
          </Button>
        ),
      ]}
      itemsModals={[
        <Modal
          isShow={showModalKonfirmasiHapusActivity}
          title={'Konfirmasi Hapus Activity'}
        >
          <Link to="">
            <Button
              variant="tertiary"
              onClick={() => setShowModalKonfirmasiHapusActivity(false)}
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

export default DetailActivity

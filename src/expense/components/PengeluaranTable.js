/*
	Generated on 13/06/2024 by UI Generator PRICES-IDE
	https://amanah.cs.ui.ac.id/research/ifml-regen
	version 3.4.0
*/
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from 'commons/auth'
import { Button, Modal } from 'commons/components'
import isSelectedFeature from 'commons/utils/isSelectedFeature'
import { isMobile } from 'commons/utils/responsive'

import deleteExpense from '../services/deleteExpense'

import * as Layouts from 'commons/layouts'

const PengeluaranTable = ({ filterPrograms, expenseListElement }) => {
  const { checkPermission } = useAuth()
  const navigate = useNavigate()
  const detail = async pengeluaranItem => {
    isMobile() && navigate(`/expense/${pengeluaranItem.id}`)
  }

  const [
    showModalKonfirmasiHapusPengeluaran,
    setShowModalKonfirmasiHapusPengeluaran,
  ] = React.useState(false)
  const hapus = async pengeluaran => {
    await deleteExpense({
      id: pengeluaran.id,
    })
    window.location.reload(false)
  }

  return (
    <Layouts.ListComponentTableLayout
      items={[filterPrograms, expenseListElement]}
      detail={detail}
      isSearchable
      filterFields={[
        {
          label: 'Program',
          featureName: 'programName',
          options: filterPrograms,
        },
      ]}
      itemsAttrs={[
        ,
        {
          id: 'tanggal',
          condition: 'isHeading isHiddenMobile',
          label: 'Tanggal',
          featureName: 'datestamp',
        },
        {
          id: 'program',
          condition: 'isHeading',
          label: 'Program',
          featureName: 'programName',
        },
        {
          id: 'jumlah',
          condition: 'isHeading isCurrency',
          label: 'Jumlah',
          featureName: 'amount',
        },
        {
          id: 'kategori',
          condition: 'isHeading isHiddenMobile',
          label: 'Kategori',
          featureName: 'coaName',
        },
      ]}
      itemsEvents={pengeluaranItem => [
        <Link to={`/expense/${pengeluaranItem.id}`}>
          <Button variant="primary">Detail</Button>
        </Link>,

        checkPermission('UpdateExpense') && (
          <Link to={`/expense/ubah?id=${pengeluaranItem.id}`}>
            <Button variant="secondary">Ubah</Button>
          </Link>
        ),

        checkPermission('DeleteExpense') && (
          <Link to="">
            <Button
              variant="info"
              onClick={() => setShowModalKonfirmasiHapusPengeluaran(true)}
            >
              Hapus
            </Button>
          </Link>
        ),
      ]}
      itemsModals={pengeluaranItem => [
        <Modal
          isShow={showModalKonfirmasiHapusPengeluaran}
          title={'Konfirmasi Hapus Pengeluaran'}
        >
          <Link to="">
            <Button
              variant="tertiary"
              onClick={() => setShowModalKonfirmasiHapusPengeluaran(false)}
            >
              Batal
            </Button>
          </Link>
          <Button variant="danger" onClick={() => hapus(pengeluaranItem)}>
            Hapus
          </Button>
        </Modal>,
      ]}
    />
  )
}

export default PengeluaranTable

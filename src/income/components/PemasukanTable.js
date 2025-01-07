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

import deleteIncome from '../services/deleteIncome'

import * as Layouts from 'commons/layouts'

const PemasukanTable = ({ filterPrograms, incomeListElement }) => {
  const { checkPermission } = useAuth()
  const navigate = useNavigate()
  const detail = async pemasukanItem => {
    isMobile() && navigate(`/income/${pemasukanItem.id}`)
  }

  const [
    showModalKonfirmasiHapusPemasukan,
    setShowModalKonfirmasiHapusPemasukan,
  ] = React.useState(false)
  const hapus = async pemasukan => {
    await deleteIncome({
      id: pemasukan.id,
    })
    window.location.reload(false)
  }

  return (
    <Layouts.ListComponentTableLayout
      items={[filterPrograms, incomeListElement]}
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
          id: 'metodePembayaran',
          condition: 'isHeading isHiddenMobile',
          label: 'Metode Pembayaran',
          featureName: 'paymentMethod',
        },
      ]}
      itemsEvents={pemasukanItem => [
        <Link to={`/income/${pemasukanItem.id}`}>
          <Button variant="primary">Detail</Button>
        </Link>,

        checkPermission('UpdateIcome') && (
          <Link to={`/income/ubah?id=${pemasukanItem.id}`}>
            <Button variant="secondary">Ubah</Button>
          </Link>
        ),

        checkPermission('DeleteIncome') && (
          <Link to="">
            <Button
              variant="info"
              onClick={() => setShowModalKonfirmasiHapusPemasukan(true)}
            >
              Hapus
            </Button>
          </Link>
        ),
      ]}
      itemsModals={pemasukanItem => [
        <Modal
          isShow={showModalKonfirmasiHapusPemasukan}
          title={'Konfirmasi Hapus Pemasukan'}
        >
          <Link to="">
            <Button
              variant="tertiary"
              onClick={() => setShowModalKonfirmasiHapusPemasukan(false)}
            >
              Batal
            </Button>
          </Link>
          <Button variant="danger" onClick={() => hapus(pemasukanItem)}>
            Hapus
          </Button>
        </Modal>,
      ]}
    />
  )
}

export default PemasukanTable

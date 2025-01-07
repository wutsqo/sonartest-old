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

import * as Layouts from 'commons/layouts'

const DetailPemasukan = ({ data }) => {
  const { checkPermission } = useAuth()
  const navigate = useNavigate()

  return (
    <Layouts.DetailComponentLayout
      item={data}
      itemsAttrs={[
        {
          id: 'tanggal',
          condition: '',
          label: 'Tanggal',
          featureName: 'datestamp',
        },
        {
          id: 'keterangan',
          condition: '',
          label: 'Keterangan',
          featureName: 'description',
        },
        {
          id: 'jumlah',
          condition: ' isCurrency',
          label: 'Jumlah',
          featureName: 'amount',
        },
        {
          id: 'namaProgram',
          condition: '',
          label: 'Nama Program',
          featureName: 'programName',
        },
        {
          id: 'jenisPemasukan',
          condition: '',
          label: 'Jenis Pemasukan',
          featureName: 'coaName',
        },
        {
          id: 'metodePembayaran',
          condition: '',
          label: 'Metode Pembayaran',
          featureName: 'paymentMethod',
        },
      ]}
      itemsEvents={[]}
      itemsModals={[]}
    />
  )
}

export default DetailPemasukan

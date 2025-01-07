/*
	Generated on 13/06/2024 by UI Generator PRICES-IDE
	https://amanah.cs.ui.ac.id/research/ifml-regen
	version 3.4.0
*/
import React from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from 'commons/auth'
import { Button } from 'commons/components'
import isSelectedFeature from 'commons/utils/isSelectedFeature'

import * as Layouts from 'commons/layouts'

const TahunCard = ({ periodeListElement }) => {
  const { checkPermission } = useAuth()
  return (
    <Layouts.ListComponentCardLayout
      items={[periodeListElement]}
      itemsAttrs={[
        {
          id: 'laporanKeuanganTahunAnggaran',
          condition: '',
          label: 'Laporan Keuangan Tahun Anggaran',
          featureName: 'name',
        },
      ]}
      itemsEvents={tahunItem => [
        <Link to={`/summary/${tahunItem.id}`}>
          <Button variant="primary">Lihat</Button>
        </Link>,
      ]}
    />
  )
}

export default TahunCard

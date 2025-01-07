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

import * as Layouts from 'commons/layouts'

import { useRef } from 'react'
const ChartTable = ({ automaticReportPeriodicElement }) => {
  const { checkPermission } = useAuth()

  return (
    <Layouts.ListComponentReportLayout
      items={[automaticReportPeriodicElement]}
      itemsAttrs={[
        {
          id: 'nama',
          condition: '',
          label: 'Nama',
          featureName: 'name',
        },
        {
          id: 'jumlah',
          condition: '',
          label: 'Jumlah',
          featureName: 'amount',
        },
      ]}
    />
  )
}

export default ChartTable

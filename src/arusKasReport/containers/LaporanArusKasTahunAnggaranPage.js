/*
	Generated on 13/06/2024 by UI Generator PRICES-IDE
	https://amanah.cs.ui.ac.id/research/ifml-regen
	version 3.4.0
*/
import React, { useEffect, useState, useContext } from 'react'
import { Button, Spinner } from 'commons/components'
import * as Layouts from 'commons/layouts'
import { Link, useParams } from 'react-router-dom'
import { HeaderContext } from 'commons/components'
import isSelectedFeature from 'commons/utils/isSelectedFeature'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'commons/auth'
import ChartTable from '../components/ChartTable'

import getAutomaticReportPeriodicElement from '../services/getAutomaticReportPeriodicElement'
const LaporanArusKasTahunAnggaranPage = props => {
  const { checkPermission } = useAuth()

  const [isLoading, setIsLoading] = useState({
    reportChartofAccountEntryPeriodic: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [
    automaticReportPeriodicElement,
    setAutomaticReportPeriodicElement,
  ] = useState()
  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({
          ...prev,
          reportChartofAccountEntryPeriodic: true,
        }))
        const {
          data: automaticReportPeriodicElement,
        } = await getAutomaticReportPeriodicElement({ id })
        setAutomaticReportPeriodicElement(automaticReportPeriodicElement.data)
      } finally {
        setIsLoading(prev => ({
          ...prev,
          reportChartofAccountEntryPeriodic: false,
        }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTitle('Laporan Arus Kas Tahun Anggaran Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <></>
        </>
      }
    >
      <Layouts.ListContainerTableLayout
        title={'Report Chart of Account Entry Periodic'}
        singularName={'Chart'}
        items={[automaticReportPeriodicElement]}
        isLoading={isLoading.reportChartofAccountEntryPeriodic}
      >
        <ChartTable
          automaticReportPeriodicElement={automaticReportPeriodicElement}
        />
      </Layouts.ListContainerTableLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default LaporanArusKasTahunAnggaranPage

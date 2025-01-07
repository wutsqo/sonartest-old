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
import LaporanTable from '../components/LaporanTable'

import getFinancialPositionListElement from '../services/getFinancialPositionListElement'
import exportFinancialPosition from '../services/exportFinancialPosition'
const LaporanPosisiKeuanganPage = props => {
  const { checkPermission } = useAuth()

  const [isLoading, setIsLoading] = useState({
    reportLaporanPosisiKeuangan: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [
    financialPositionListElement,
    setFinancialPositionListElement,
  ] = useState()
  const {} = useParams()
  const navigate = useNavigate()
  const download = async () => {
    await exportFinancialPosition()
    navigate('/financial-position')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, reportLaporanPosisiKeuangan: true }))
        const {
          data: financialPositionListElement,
        } = await getFinancialPositionListElement({})
        setFinancialPositionListElement(financialPositionListElement.data)
      } finally {
        setIsLoading(prev => ({ ...prev, reportLaporanPosisiKeuangan: false }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTitle('Laporan Posisi Keuangan Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerButtonLayout>
            <Button
              className="mt-2 sm:mt-0"
              variant="primary"
              onClick={download}
            >
              Download
            </Button>
          </Layouts.ViewContainerButtonLayout>
        </>
      }
    >
      <Layouts.ListContainerTableLayout
        title={'Report Laporan Posisi Keuangan'}
        singularName={'Laporan'}
        items={[financialPositionListElement]}
        isLoading={isLoading.reportLaporanPosisiKeuangan}
      >
        <LaporanTable
          financialPositionListElement={financialPositionListElement}
        />
      </Layouts.ListContainerTableLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default LaporanPosisiKeuanganPage

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
import TahunCard from '../components/TahunCard'

import getPeriodeListElement from '../services/getPeriodeListElement'
const DaftarTahunAnggaranPage = props => {
  const { checkPermission } = useAuth()

  const [isLoading, setIsLoading] = useState({
    listTahunAnggaran: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [periodeListElement, setPeriodeListElement] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, listTahunAnggaran: true }))
        const { data: periodeListElement } = await getPeriodeListElement()
        setPeriodeListElement(periodeListElement.data)
      } finally {
        setIsLoading(prev => ({ ...prev, listTahunAnggaran: false }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTitle('Daftar Tahun Anggaran Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <></>
        </>
      }
    >
      <Layouts.ListContainerCardLayout
        title={'List Tahun Anggaran'}
        singularName={'Tahun'}
        items={[periodeListElement]}
        isLoading={isLoading.listTahunAnggaran}
      >
        <TahunCard periodeListElement={periodeListElement} />
      </Layouts.ListContainerCardLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default DaftarTahunAnggaranPage

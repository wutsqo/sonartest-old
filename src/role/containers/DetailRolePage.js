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

import DetailRole from '../components/DetailRole'
import getRoleDetail from '../services/getRoleDetail'
const DetailRolePage = props => {
  const [isLoading, setIsLoading] = useState({
    detailRole: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [roleDetail, setRoleDetail] = useState()
  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, detailRole: true }))
        const { data: roleDetail } = await getRoleDetail({ id })
        setRoleDetail(roleDetail.data)
      } finally {
        setIsLoading(prev => ({ ...prev, detailRole: false }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTitle('Detail Role Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerBackButtonLayout>
            <Link to={`/settings/role`}>
              {' '}
              <Button className="p-4 w-full" variant="secondary">
                Kembali
              </Button>
            </Link>
          </Layouts.ViewContainerBackButtonLayout>
        </>
      }
    >
      <Layouts.DetailContainerLayout
        title={'Detail Role'}
        singularName={'Role'}
        items={{ ...roleDetail }}
        isLoading={isLoading.detailRole}
        isCorrelatedWithAnotherComponent={false}
      >
        <DetailRole {...{ data: { ...roleDetail } }} />
      </Layouts.DetailContainerLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default DetailRolePage

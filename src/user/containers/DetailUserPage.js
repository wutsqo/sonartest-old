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

import DetailUser from '../components/DetailUser'
import getUserDetail from '../services/getUserDetail'
const DetailUserPage = props => {
  const [isLoading, setIsLoading] = useState({
    detailUser: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [userDetail, setUserDetail] = useState()
  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, detailUser: true }))
        const { data: userDetail } = await getUserDetail({ id })
        setUserDetail(userDetail.data)
      } finally {
        setIsLoading(prev => ({ ...prev, detailUser: false }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTitle('Detail User Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerBackButtonLayout>
            <Link to={`/settings/user`}>
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
        title={'Detail User'}
        singularName={'User'}
        items={{ ...userDetail }}
        isLoading={isLoading.detailUser}
        isCorrelatedWithAnotherComponent={false}
      >
        <DetailUser {...{ data: { ...userDetail } }} />
      </Layouts.DetailContainerLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default DetailUserPage

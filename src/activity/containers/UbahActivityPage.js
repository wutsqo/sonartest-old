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
import { useSearchParams } from 'react-router-dom'
import ModifiedFormUbahActivity from '../components/ModifiedFormUbahActivity'

import getActivityData from '../services/getActivityData'
const UbahActivityPage = props => {
  const [isLoading, setIsLoading] = useState({
    ubahActivity: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [activityData, setActivityData] = useState()
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(prev => ({ ...prev, ubahActivity: true }))
      const { data: activityDataResponse } = await getActivityData({ id })

      setActivityData(activityDataResponse.data)

      setIsLoading(prev => ({ ...prev, ubahActivity: false }))
    }
    fetch()
  }, [])

  useEffect(() => {
    setTitle('Ubah Activity Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerBackButtonLayout>
            <Link to={`/activity/${id}`}>
              {' '}
              <Button className="p-4" variant="secondary">
                Kembali
              </Button>
            </Link>
          </Layouts.ViewContainerBackButtonLayout>
        </>
      }
    >
      <Layouts.FormContainerLayout
        singularName={'Activity'}
        isLoading={isLoading.ubahActivity}
      >
        {activityData ? (
          <>
            <ModifiedFormUbahActivity
              {...{
                activityData,
              }}
            />
          </>
        ) : (
          <></>
        )}
      </Layouts.FormContainerLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default UbahActivityPage

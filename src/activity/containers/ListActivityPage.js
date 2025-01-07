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
import ActivityCard from '../components/ActivityCard'

import getActivityListElement from '../services/getActivityListElement'
const ListActivityPage = props => {
  const { checkPermission } = useAuth()

  const [isLoading, setIsLoading] = useState({
    listActivity: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [activityListElement, setActivityListElement] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, listActivity: true }))
        const { data: activityListElement } = await getActivityListElement()
        setActivityListElement(activityListElement.data)
      } finally {
        setIsLoading(prev => ({ ...prev, listActivity: false }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTitle('List Activity Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerButtonLayout>
            {checkPermission('CreateActivity') && (
              <Link to={`/activity/tambah`}>
                {' '}
                <Button className="p-2" variant="primary">
                  Tambah Activity
                </Button>
              </Link>
            )}
          </Layouts.ViewContainerButtonLayout>
        </>
      }
    >
      <Layouts.ListContainerCardLayout
        title={'List Activity'}
        singularName={'Activity'}
        items={[activityListElement]}
        isLoading={isLoading.listActivity}
      >
        <ActivityCard activityListElement={activityListElement} />
      </Layouts.ListContainerCardLayout>
    </Layouts.ViewContainerLayout>
  )
}
export default ListActivityPage

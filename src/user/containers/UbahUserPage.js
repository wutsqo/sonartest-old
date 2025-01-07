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
import FormUbahUser from '../components/FormUbahUser'

import getUser from '../services/getUser'
import getAllowedPermissions from '../services/getAllowedPermissions'
const UbahUserPage = props => {
  const [isLoading, setIsLoading] = useState({
    ubahUser: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [user, setUser] = useState()
  const [allowedPermissions, setAllowedPermissions] = useState()
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(prev => ({ ...prev, ubahUser: true }))
      const { data: userResponse } = await getUser({ id })
      const { data: allowedPermissionsResponse } = await getAllowedPermissions({
        id,
      })

      setUser(userResponse.data)
      setAllowedPermissions(allowedPermissionsResponse.data)

      setIsLoading(prev => ({ ...prev, ubahUser: false }))
    }
    fetch()
  }, [])

  useEffect(() => {
    setTitle('Ubah User Page')
  }, [])
  return (
    <Layouts.ViewContainerLayout
      buttons={
        <>
          <Layouts.ViewContainerBackButtonLayout>
            <Link to={`/settings/user/${id}`}>
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
        singularName={'User'}
        isLoading={isLoading.ubahUser}
      >
        {user && allowedPermissions ? (
          <>
            <FormUbahUser
              {...{
                user,
                allowedPermissions,
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
export default UbahUserPage

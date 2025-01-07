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
import FormUbahRoleUser from '../components/FormUbahRoleUser'

import getUser from '../services/getUser'
import getRoles from '../services/getRoles'
const UbahRoleUserPage = props => {
  const [isLoading, setIsLoading] = useState({
    ubahRoleUser: false,
  })
  const { setTitle } = useContext(HeaderContext)

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [user, setUser] = useState()
  const [roles, setRoles] = useState()
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(prev => ({ ...prev, ubahRoleUser: true }))
      const { data: userResponse } = await getUser({ id })
      const { data: rolesResponse } = await getRoles({ id })

      setUser(userResponse.data)
      setRoles(rolesResponse.data)

      setIsLoading(prev => ({ ...prev, ubahRoleUser: false }))
    }
    fetch()
  }, [])

  useEffect(() => {
    setTitle('Ubah Role User Page')
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
        singularName={'Role'}
        isLoading={isLoading.ubahRoleUser}
      >
        {user && roles ? (
          <>
            <FormUbahRoleUser
              {...{
                user,
                roles,
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
export default UbahRoleUserPage

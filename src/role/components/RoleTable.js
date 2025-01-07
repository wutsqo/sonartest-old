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
import { isMobile } from 'commons/utils/responsive'

import * as Layouts from 'commons/layouts'

const RoleTable = ({ roleListElement }) => {
  const { checkPermission } = useAuth()
  const navigate = useNavigate()
  const detail = async roleItem => {
    isMobile() && navigate(`/settings/role/${roleItem.id}`)
  }

  return (
    <Layouts.ListComponentTableLayout
      items={[roleListElement]}
      detail={detail}
      itemsAttrs={[
        {
          id: 'nama',
          condition: 'isHeading',
          label: 'Nama',
          featureName: 'name',
        },
        {
          id: 'allowedPermissions',
          condition: 'isHeading isHiddenMobile',
          label: 'AllowedPermissions',
          featureName: 'allowedPermissions',
        },
      ]}
      itemsEvents={roleItem => [
        <Link to={`/settings/role/${roleItem.id}`}>
          <Button variant="primary">Detail</Button>
        </Link>,
      ]}
      itemsModals={roleItem => []}
    />
  )
}

export default RoleTable

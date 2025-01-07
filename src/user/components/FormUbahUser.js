/*
	Generated on 13/06/2024 by UI Generator PRICES-IDE
	https://amanah.cs.ui.ac.id/research/ifml-regen
	version 3.4.0
*/
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Button,
  Form,
  SelectionField,
  MultiSelectionField,
  InputField,
  MultiSelectField,
  TextAreaField,
  VisualizationAttr,
  Spinner,
} from 'commons/components'
import {
  ALLOWED_PERMISSIONS,
  findAllowedPermission,
} from 'commons/constants/allowedPermission'
import cleanFormData from 'commons/utils/cleanFormData'

import updateUser from '../services/updateUser'

import { ToasterError } from 'commons/components'
import * as Layouts from 'commons/layouts'

const FormUbahUser = ({ user, allowedPermissions }) => {
  const { control, handleSubmit } = useForm({ defaultValues: user })

  const navigate = useNavigate()

  const kirim = data => {
    const cleanData = cleanFormData(data)
    updateUser({
      ...cleanData,
    })
      .then(({ data: { data } }) => {
        navigate(`/settings/user/${user.id}`)
      })
      .catch(error => {
        console.error(error)
        toast.error(t => <ToasterError error={error} t={t} />)
      })
  }

  return (
    <Layouts.FormComponentLayout
      title="Ubah User"
      onSubmit={handleSubmit(kirim)}
      vas={[]}
      formFields={[
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <InputField
              label="Name"
              placeholder="Masukkan name"
              defaultValue={user.name}
              fieldState={fieldState}
              {...field}
              isRequired={false}
            />
          )}
        />,
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <InputField
              label="Email"
              placeholder="Masukkan email"
              defaultValue={user.email}
              fieldState={fieldState}
              {...field}
              isRequired={false}
            />
          )}
        />,
        <Controller
          name="allowedPermissions"
          control={control}
          rules={{ required: 'Harap masukkan allowed permissions' }}
          render={({ field: { onChange, ref }, fieldState }) => (
            <MultiSelectField
              inputRef={ref}
              label="Allowed Permissions"
              isMulti
              name="allowed permissions"
              options={allowedPermissions}
              className="basic-multi-select"
              classNamePrefix="select"
              fieldState={fieldState}
              onChange={val => onChange(val.map(c => c.id))}
              defaultValue={allowedPermissions.filter(data =>
                user.allowedPermissions.includes(data.id)
              )}
              getOptionLabel={option => option.name}
              getOptionValue={option => option.id}
            />
          )}
        />,
      ]}
      itemsEvents={[
        <Button type="submit" variant="primary">
          Kirim
        </Button>,
      ]}
    />
  )
}

export default FormUbahUser

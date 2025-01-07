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
  FileInputField,
} from 'commons/components'
import {
  ALLOWED_PERMISSIONS,
  findAllowedPermission,
} from 'commons/constants/allowedPermission'
import cleanFormData from 'commons/utils/cleanFormData'

import saveActivity from '../services/saveActivity'

import { ToasterError } from 'commons/components'
import * as Layouts from 'commons/layouts'

const ModifiedFormTambahActivity = ({}) => {
  const { control, handleSubmit } = useForm()

  const navigate = useNavigate()

  const kirim = data => {
    const cleanData = cleanFormData(data)
    saveActivity({
      ...cleanData,
    })
      .then(({ data: { data } }) => {
        navigate(`/activity`)
      })
      .catch(error => {
        console.error(error)
        toast.error(t => <ToasterError error={error} t={t} />)
      })
  }

  return (
    <Layouts.FormComponentLayout
      title="Tambah Activity"
      onSubmit={handleSubmit(kirim)}
      vas={[]}
      formFields={[
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Harap masukkan nama program' }}
          render={({ field, fieldState }) => (
            <InputField
              label="Nama Program"
              placeholder="Masukkan nama program"
              fieldState={fieldState}
              {...field}
              isRequired={true}
            />
          )}
        />,
        <Controller
          name="description"
          control={control}
          rules={{ required: 'Harap masukkan deskripsi' }}
          render={({ field, fieldState }) => (
            <TextAreaField
              label="Deskripsi"
              placeholder="Masukkan deskripsi"
              fieldState={fieldState}
              {...field}
              isRequired={true}
            />
          )}
        />,
        <Controller
          name="target"
          control={control}
          render={({ field, fieldState }) => (
            <InputField
              label="Target"
              placeholder="Masukkan target"
              fieldState={fieldState}
              {...field}
              isRequired={false}
            />
          )}
        />,
        <Controller
          name="logoUrl"
          control={control}
          rules={{ required: 'Harap masukkan gambar program' }}
          render={({ field, fieldState }) => (
            <FileInputField
              label="Gambar Program"
              placeholder="Masukkan gambar program"
              fieldState={fieldState}
              {...field}
              isRequired={true}
            />
          )}
        />,
        <Controller
          name="executionDate"
          control={control}
          rules={{ required: 'Harap masukkan tanggal pelaksanaan' }}
          render={({ field, fieldState }) => (
            <InputField
              label="Tanggal Pelaksanaan"
              placeholder="Masukkan tanggal pelaksanaan"
              type="date"
              fieldState={fieldState}
              {...field}
              isRequired={true}
            />
          )}
        />,
        <Controller
          name="partner"
          control={control}
          render={({ field, fieldState }) => (
            <InputField
              label="Partner"
              placeholder="Masukkan partner"
              fieldState={fieldState}
              {...field}
              isRequired={false}
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

export default ModifiedFormTambahActivity

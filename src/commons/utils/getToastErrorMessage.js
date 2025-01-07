const getToastErrorMessage = error => {
  return (
    // VMJ Error
    ((error.response?.data?.data?.vmjErrorCode ||
      error.response?.data?.data?.message) &&
      `${error.response?.data?.data?.vmjErrorCode} - ${error.response?.data?.data?.message}`) ||
    error.toString() ||
    'Terjadi kesalahan pada sistem. Harap coba lagi!'
  )
}

export default getToastErrorMessage

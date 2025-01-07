import axios from 'axios'
import tokenManager from 'commons/utils/token'
import environment from 'commons/utils/environment'

const exportActivityReport = (data = {}) => {
  let body = data

  const { getToken } = tokenManager()
  const token = getToken()
  let paramsGet = Object.assign(body, { token })
  return axios
    .get(`${environment.rootApi}/call/activityreport/export`, {
      params: paramsGet,

      headers: {
        Authorization: token,
        responseType: 'blob',
      },
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      var filename = response.headers['Content-Disposition']
        .split('filename=')[1]
        .split(';')[0]
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
    })
}

export default exportActivityReport

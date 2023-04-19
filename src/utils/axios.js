import axios from 'axios'
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  updateLocalAccessToken,
} from './localStorage'
import { APi } from '@/commons/Constant.ts'
export const customFetch = axios.create({
  baseURL: APi.BaseUrl,
})
const handleFetchResponse = (customFetch) => {
  customFetch.interceptors.request.use(
    (config) => {
      const token = getLocalAccessToken()
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
        // config.headers['x-access-token'] = token
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  customFetch.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      const originalConfig = err.config

      if (originalConfig.url !== '/signup' && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true
          try {
            const refreshToken = { refreshToken: getLocalRefreshToken() }
            const rs = await customFetch.post('/token/refresh', refreshToken)
            const { accessToken } = rs.data
            updateLocalAccessToken(accessToken)
            return customFetch(originalConfig)
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
      }
      return Promise.reject(err)
    }
  )
}
handleFetchResponse(customFetch)

const api = axios.create({
  baseURL: APi.BaseUrl,
})

const uploadImage = (imageFile) => {
  const formData = new FormData()
  formData.append('files', imageFile)
  return api.post(APi.uploadImage, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export { api, uploadImage }

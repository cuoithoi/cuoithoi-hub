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
  // customFetch.interceptors.response.use(
  //   (res) => {
  //     return res
  //   },
  //   async (err) => {
  //     const originalConfig = err.config

  //     if (originalConfig.url !== '/signup' && err.response) {
  //       if (err.response.status === 401 && !originalConfig._retry) {
  //         originalConfig._retry = true
  //         try {
  //           const refreshToken = { refreshToken: getLocalRefreshToken() }
  //           const rs = await customFetch.post('/token/refresh', refreshToken)
  //           const { accessToken } = rs.data
  //           updateLocalAccessToken(accessToken)
  //           return customFetch(originalConfig)
  //         } catch (_error) {
  //           return Promise.reject(_error)
  //         }
  //       }
  //     }
  //     return Promise.reject(err)
  //   }
  // )
}
handleFetchResponse(customFetch)

const api = axios.create({
  baseURL: APi.BaseUrl,
  timeout: 10000,
})

const handleErrors = (error) => {
  console.error(error)
  throw error
}

const uploadImage = (imageFile) => {
  const formData = new FormData()
  formData.append('files', imageFile)
  return api.post(APi.uploadImage, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
const getDataApi = async (url) => {
  try {
    const token = getLocalAccessToken()
    const resp = await customFetch.get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return resp.data
  } catch (error) {
    handleErrors(error)
  }
}
const postDataApi = async (url) => {
  try {
    const token = getLocalAccessToken()
    const resp = await customFetch.post(url)
    return resp.data
  } catch (error) {
    console.log(error)
  }
}
const getDataWithParams = async (url, params) => {
  try {
    const token = getLocalAccessToken()
    const resp = await customFetch.get(url, {
      params,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return resp.data
  } catch (error) {
    handleErrors(error)
  }
}
// const postWithData = async (url, data) => {
//   try {
//     const resp = await customFetch.get(url, data
//     )
//     return resp.data
//   } catch (error) {
//     handleErrors(error)
//   }
// }
const getWithParams = async (url, params = {}, options = {}) => {
  try {
    const response = await api.get(url, {
      params,
      ...options,
    })
    return response.data
  } catch (error) {
    handleErrors(error)
  }
}

const postWithFormData = async (url, data, headers = {}, options = {}) => {
  try {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    const response = await api.post(url, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
      ...options,
    })
    return response.data
  } catch (error) {
    handleErrors(error)
  }
}

const putWithHeaders = async (url, data, headers = {}, options = {}) => {
  try {
    const response = await api.put(url, data, {
      headers: {
        ...headers,
      },
      ...options,
    })
    return response.data
  } catch (error) {
    handleErrors(error)
  }
}

const postJson = async (url, data, options = {}) => {
  try {
    const response = await api.post(url, data, options)
    return response.data
  } catch (error) {
    handleErrors(error)
  }
}

const getFromCache = (url) => {
  const cached = localStorage.getItem(url)

  if (cached) {
    const { data, expire } = JSON.parse(cached)
    if (expire && expire > new Date().getTime()) {
      return data
    } else {
      localStorage.removeItem(url)
    }
  }
}

const storeInCache = (url, data, duration) => {
  const expire = new Date().getTime() + duration
  const cacheData = { data, expire }
  localStorage.setItem(url, JSON.stringify(cacheData))
}

//hàm load data từ cache giảm thiểu request đến serve => tối ưu
async function getWithCache(url, data, cacheConfig) {
  const cachedData = getFromCache(url)

  if (cachedData) {
    return Promise.resolve(cachedData)
  }

  return api.get(url, data).then((response) => {
    storeInCache(url, response, cacheConfig?.duration || 0)
    return response
  })
}

export {
  api,
  uploadImage,
  getWithParams,
  getDataWithParams,
  postDataApi,
  postWithFormData,
  getDataApi,
  putWithHeaders,
  postJson,
  getWithCache,
}

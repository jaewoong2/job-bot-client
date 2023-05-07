import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_JWT}`,
}

const instance = axios.create({
  baseURL: import.meta.env.DEV ? '/api/' : import.meta.env.VITE_ENDPOINT_URL,
  headers: import.meta.env.DEV ? { 'Content-Type': 'application/json' } : HEADERS,
})

// Add a request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // You can add any logic before the request is sent, e.g., adding an authorization token
    // config.headers['Authorization'] = 'Bearer ' + token;
    return config
  },
  (error: AxiosError) => {
    // Handle the error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can add any logic after the response is received, e.g., transforming the data
    return response
  },
  (error: AxiosError) => {
    // Handle the error
    if (error.response) {
      // The request was made, and the server responded with a status code outside of the 2xx range
    } else if (error.request) {
      // The request was made but no response was received
    } else {
      // Something happened in setting up the request that triggered an error
    }
    return Promise.reject(error)
  }
)

export default instance

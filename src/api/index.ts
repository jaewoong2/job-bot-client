type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface RequestConfig<T = any> {
  url: string
  method?: Method
  headers?: Record<string, string>
  baseURL?: string
  params?: Record<string, string>
  data?: T
}

export interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: Headers
}

export interface ApiError extends Error {
  config: RequestConfig
  code?: string
  request?: any
  response?: ApiResponse
}

type Interceptor<T> = (value: T) => T

class Api {
  private requestInterceptor: Interceptor<RequestConfig> | null = null
  private responseInterceptor: Interceptor<ApiResponse> | null = null
  configuration: Partial<RequestConfig> | null = null

  async request<T, K>(config: RequestConfig<T>): Promise<ApiResponse<K>> {
    if (this.configuration) {
      config = { ...this.configuration, ...config }
    }

    if (this.requestInterceptor) {
      config = this.requestInterceptor(config)
    }

    const queryString = config.params
      ? '?' +
        Object.keys(config.params)
          .map((key) => `${key}=${config.params ? config.params[key] : null}`)
          .join('&')
      : ''

    const options: RequestInit = {
      method: config.method,
      headers: config.headers,
      body: config.data ? JSON.stringify(config.data) : undefined,
    }
    try {
      const response = await fetch(config.baseURL + config.url + queryString, options)
      const data = await response.json()

      let result: ApiResponse<K> = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      }

      if (this.responseInterceptor) {
        result = this.responseInterceptor(result)
      }

      if (!response.ok) {
        const error: ApiError = {
          name: 'ApiError',
          message: `Request failed with status code ${response.status}`,
          config: config,
          response: result,
        }
        throw error
      }

      return result
    } catch (error: any) {
      if (error.name === 'ApiError') {
        throw error
      } else {
        const apiError: ApiError = {
          ...error,
          name: 'apiError',
          message: `Request failed with status code ${error.status}`,
          config: config,
          request: options,
        }
        throw apiError
      }
    }
  }

  setRequestInterceptor(interceptor: Interceptor<RequestConfig>) {
    this.requestInterceptor = interceptor
  }

  setResponseInterceptor(interceptor: Interceptor<ApiResponse>) {
    this.responseInterceptor = interceptor
  }
}

const api = new Api()

const URL = process.env.NODE_ENV === 'development' ? 'api/' : process.env.NEXT_PUBLIC_ENDPOINT_URL_PRODUCTION!

api.configuration = {
  baseURL: URL,
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_JWT!}` },
}

export default api

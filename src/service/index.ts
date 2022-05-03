import type { AxiosResponse } from "axios"
const $HTTP = axios.create({
  baseURL: "/api",
  timeout: 5000,
  method: "get",
  headers: {
    "Content-Type": "application/json",
  },
})
//拦截器
$HTTP.interceptors.request.use(
  (config) => {
    return config
  },
  (error): Promise<any> => {
    return Promise.reject(error)
  }
)
$HTTP.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return response
  },
  (error): Promise<any> => {
    return Promise.reject(error)
  }
)
export default $HTTP

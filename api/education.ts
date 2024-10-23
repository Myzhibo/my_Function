import api, { MyAxiosRequestConfig } from './api'

/**
 * @description 获取学科信息
 * @param params { academic?:str }
 * @return { Promise }
 */
export const getSubject = (params: { academic?: string }) => {
  const cacheKey = '__cache_workSubject'    // [缓存标识]
  const config: MyAxiosRequestConfig = { params, cacheKey }
  return api.get('/subject/v1/get', config)
}

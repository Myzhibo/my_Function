import api, { MyAxiosRequestConfig } from './api'

//  cacheKey 例子
export const getSubject = (params: { academic?: string }) => {
  const cacheKey = '__cache_workSubject'    // [缓存标识]
  const config: MyAxiosRequestConfig = { params, cacheKey }
  return api.get('/subject/v1/get', config)
}

//  vuexConfig 例子
export const getPPTTaskListV2 = (params) => {
  const vuexConfig = {key: params._id, getter: 'projectInfo/cacheProjectList', mutation: 'projectInfo/cacheProjectListMutation'};
  return api.get('ppt2/task/dashboard', params, { vuexConfig });
};
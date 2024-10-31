import axios, { AxiosRequestConfig, AxiosAdapter } from 'axios';
import router from '@/router';
import storage from './storage';
import store from '@/store';
axios.defaults.withCredentials = true;

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  cacheKey?: string;
  vuexConfig?: IVuexConfig;
}
interface IVuexConfig {
  key: object;
  getter: string;
  mutation: string;
}

// 【缓存适配器】 通常用于缓存数据再利用，可以避免再次请求接口
const cacheAdapter: AxiosAdapter = async (config: MyAxiosRequestConfig) => {
  // 缓存检查：如果请求配置中包含cacheKey，则会首先尝试从存储中获取缓存的数据。
  if (config.cacheKey) {
    const cachedResponse = await storage.get(config.cacheKey);
    if (cachedResponse) {
      // 缓存命中：如果存储中找到了与cacheKey匹配的数据，cacheAdapter会立即返回一个解析为缓存数据的Promise。此时，axios的默认适配器（即发送网络请求的部分）不会被调用，因此不会发出实际的网络请求
      return Promise.resolve(cachedResponse)
    }
    return (axios.defaults.adapter as AxiosAdapter)(config)
  }
  if (config.vuexConfig) {
    const response = store.getters[config.vuexConfig.getter];
    console.log(response.some((item) => item.key === config.vuexConfig.key));
    
    if (response.some((item) => item.key === config.vuexConfig.key)) {
      const r = response.find((item) => item.key === config.vuexConfig.key).data;
      return Promise.resolve(r);
    }
    return (axios.defaults.adapter as AxiosAdapter)(config);
  }
  return (axios.defaults.adapter as AxiosAdapter)(config);
};

const axiosInstance = axios.create({ baseURL: '/api/admin', adapter: cacheAdapter });

// 【请求】拦截器
axiosInstance.interceptors.request.use(
  request => {
    /* 这里可以对request做一些处理 */
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

// 【响应】拦截器 (即使缓存命中并且没有发出网络请求，axios的响应拦截器仍然会被调用。这是因为cacheAdapter返回的是一个“模拟”的响应对象，它会被传递给拦截器链。)
axiosInstance.interceptors.response.use(
  async (response) => {
    const { cacheKey, vuexConfig } = response.config as MyAxiosRequestConfig
    if (response && response.data) {
      const status = response.status
      if (status === 200) {
        if (response.data.code === 2) {
          router.push('/login')
        }
        // 缓存 (存localforage)
        if (cacheKey) {
          await storage.set(cacheKey, response)
          return response
        }
        // 缓存 (存vuex)
        if (vuexConfig) {
          store.commit(vuexConfig.mutation, { key: vuexConfig.key, data: response });
          return response;
        }
        return Promise.resolve(response)
      }
      if (status === 1006) {
        router.push('/login')
      }
      return Promise.reject(response.data.data)
    }
    return Promise.reject({
      data: {
        status: -1,
        statusInfo: '未知错误'
      }
    })
  },
  (error) => {
    error.data = { statusInfo: '未知错误' }
    if (error.response.status === 404) {
      error.data.statusInfo = '找不到页面'
    } else if (error.response.status === 500) {
      error.data.statusInfo = '服务器错误'
    }
    return Promise.reject(error)
  }
)

/* 下面是二次封装 get post 方法 */
export async function get(url: string, data: Record<string, any>, options: MyAxiosRequestConfig = {}) {  
  return axiosInstance.get(url, { params: data, ...options });
}
export async function post(url: string, data: Record<string, any>, options: MyAxiosRequestConfig = {}) {  
  return axiosInstance.post(url, data, options);  
}  
export async function put(url: string, data: Record<string, any>, options: MyAxiosRequestConfig = {}) {  
  return axiosInstance.put(url, data, options);  
}  
export async function deleteRequest(url: string, data: Record<string, any> = {}, options: MyAxiosRequestConfig = {}) {  
  return axiosInstance.delete(url, { params: data, ...options });  
}  
  
export { axiosInstance, MyAxiosRequestConfig };
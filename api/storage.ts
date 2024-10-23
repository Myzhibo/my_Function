// 二次封装localforage 用于处理缓存 支持设置过期时间
import localforage from 'localforage'

interface StoreValue {
  value: any;
  expire: number;
}

class Storage {
  // 默认过期时间为一天
  private expireTime: number = 1000 * 60 * 60 * 24;

  async set (key: string, value: any, expire?: number): Promise<void> {
    const storeValue: StoreValue = {
      value: value,
      expire: Date.now() + (expire === undefined ? this.expireTime : expire)
    }
    try {
      await localforage.setItem(key, JSON.stringify(storeValue))
    } catch (error) {
      console.log(`设置键为${key}的数据失败, 错误信息: ${error}`)
    }
  }

  async get (key: string): Promise<any | null> {
    try {
      const value = await localforage.getItem(key)
      if (value) {
        const storeValue = JSON.parse(value as string) as StoreValue
        if (storeValue.expire < Date.now()) {
          console.log(`数据${key}已过期,${storeValue.expire}。 当前：${Date.now()}`)
          this.remove(key)
          return null
        }
        return storeValue.value
      }
    } catch (error) {
      console.log(`获取键为${key}的数据失败, 错误信息: ${error}`)
      return null
    }
  }

  async remove (key: string): Promise<void> {
    try {
      await localforage.removeItem(key)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new Storage()

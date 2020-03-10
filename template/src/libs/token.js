import store from '@/store'
import { getStorage, setStorage, removeStorage, login } from './wx'
import { user } from '_api'

/**
 * 负责token的获取，三种途径：storage中、正在请求中的token、将要向服务器发起请求
 */
class Token {
  constructor() {
    this.tokenPromise = null
  }
  /**
   * 获取token
   */
  async getToken(force = false) {
    if (!force) {
      // 如果缓存中有就用缓存中的
      let cacheToken = getStorage('token')
      if (cacheToken) return cacheToken
    }
    // 如果已经在请求中，就等请求完后返回
    if (this.tokenPromise) {
      let token = await this._waitPromise()
      return token
    }
    // 都没有就去服务端请求
    this.tokenPromise = new Promise((resolve, reject) => {
      login()
        .then(({ code }) => {
          user.login({ code, noToken: true })
            .then(r => {
              resolve(r)
            })
            .catch(err => {
              reject(err)
            })
        })
        .catch(err => {
          console.log({ err })
          reject(err)
        })
    })
    return this._waitPromise()
  }
  /**
   * 统一处理返回数据，不对外公开
   */
  async _waitPromise() {
    try {
      let res = await this.tokenPromise
      let { token, ...others } = res
      setStorage('token', token)
      store.commit('setUserInfo', { ...others })
      this.tokenPromise = null
      return token
    } catch (err) {
      console.log(err)
      // toast('获取token失败')
      this.tokenPromise = null
      return false
    }
  }
  /**
   * 刷新token，先把缓存中的token移除再请求
   */
  async refreshToken() {
    removeStorage('token')
    let token = await this.getToken()
    return token
  }
}

export default new Token()

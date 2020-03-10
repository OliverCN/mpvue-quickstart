/* eslint-disable no-undef */
import { requestSync, showLoading, hideLoading, toast, wxPay } from './wx'
import config from '_config'
import token from './token'

/**
 * 发出http请求层，仅仅负责发出请求和统一处理返回数据结构
 * 402：token过期或无效
 */
class Http {
  constructor() {
    this.baseURL = config.apiUrl
    // 请求队列
    this.queueCount = 0
    this.errCount = 0
  }

  toggleLoading(sinlence = false, show = true, loadingTxt) {
    if (sinlence) return
    if (show) {
      this.queueCount++
      showLoading(loadingTxt || '加载中...')
    } else {
      this.queueCount--
      if (this.queueCount <= 0) {
        hideLoading()
      }
    }
  }

  // loginAgain：在token无效的时候是否自动重新获取token再次发出请求
  async request({ url, data = {}, method, options = {}, loginAgain = true }) {
    // console.log({ data })
    // options 可以直接只传一个布尔值表示是否静默
    if (typeof options === 'boolean') {
      options = { sinlence: options }
    }
    const { header = {}, sinlence = false } = options
    this.toggleLoading(sinlence, true, options.loadingTxt)
    let tk = ''
    if (!options.noToken) {
      tk = await token.getToken()
    }
    return new Promise((resolve, reject) => {
      let ps = {
        url: (options.baseURL || this.baseURL) + url,
        data,
        header: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tk}`,
          ...header
        },
        method
      }
      requestSync(ps)
        .then(async res => {
          this.toggleLoading(sinlence, false)
          wx.stopPullDownRefresh()
          // 对返回数据做统一处理
          // if (res.statusCode === 402) {
          //   if (!loginAgain) {
          //     reject(new Error('登录信息无效'))
          //     return
          //   }
          //   await token.refreshToken()
          //   resolve(this.request({ url, data, method, options, loginAgain: false }))
          //   return
          // }
          if (res.statusCode !== 200) {
            let msg = res.data.message || res.errMsg
            msg = msg === 'request:ok' ? '请求发生异常(user)' : msg
            toast(msg)
            reject(new Error(msg))
            return
          }
          let resData = res.data
          if (resData.code !== '200') {
            toast(resData.message)
            return
          }
          resolve(resData.data)
        })
        .catch(err => {
          this.toggleLoading(sinlence, false)
          if (!sinlence) {
            toast('请求发生异常')
          }
          reject(err)
        })
    })
  }
  // post请求
  post(url, data, options) {
    return this.request({url, data, method: 'POST', options})
  }
  // get请求
  get(url, data, options) {
    return this.request({url, data, method: 'GET', options})
  }
  // put请求
  put(url, data, options) {
    return this.request({url, data, method: 'PUT', options})
  }
  // delete请求
  delete(url, data, options) {
    return this.request({url, data, method: 'DELETE', options})
  }
}

const http = new Http()
export default http

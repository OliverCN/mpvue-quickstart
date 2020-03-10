import Vue from 'vue'
import * as wxPromise from '../../libs/wx'
// import store from '@/store'

Vue.prototype.$wx = wxPromise
// Vue.prototype.$store = store
Vue.prototype.$router = {
  goTo: (url, args, events = {}) => {
    wx.navigateTo({
      url,
      events,
      success: function(res) {
        if (!args) return
        res.eventChannel.emit('on-loaded', args)
      }
    })
  },
  redirectTo: (url) => {
    wx.redirectTo({ url })
  },
  switchTab: (url) => {
    wx.switchTab({ url })
  },
  reLaunch: (url) => {
    wx.reLaunch({ url })
  },
  goBack: () => {
    wx.navigateBack()
  },
  goMiniPrograme: (path, args = {}) => {
    wx.navigateToMiniProgram({
      appId: 'wxfcd5ffc1d91c93bd',
      // appId: 'wx7cbf750722e223a0',
      ...args,
      path
    })
  }
}

import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import app from "./global"

Vue.use(Vuex)
const store = new Vuex.Store({
  ...app,
  plugins: [createPersistedState({
    key: "vuex_storage",
    paths: ["userInfo", "toUserInfo", "sysInfo"],
    storage: {
      getItem: key => wx.getStorageSync(key),
      setItem: (key, value) => wx.setStorageSync(key, value),
      removeItem: key => wx.removeStorageSync(key)
    }
  })]
})

export default store

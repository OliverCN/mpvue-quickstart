import { user } from '_api'

export default {
  data() {
    return {
      showAuthorized: false,
      canIUseGetUserInfo: wx.canIUse('button.open-type.getUserInfo')
    }
  },
  props: {
    afterLogin: Function
  },
  methods: {
    async onGetMobileLogin(e) {
      try {
        let { encryptedData, iv } = e.target
        if (encryptedData && iv) {
          const r = await user.login({ encryptedData, iv })
          this.$wx.setStorage('token', r.Token)
          // this.$store.commit('setUserInfo', r)
          // getUserRoleInfo().then(r => {
          //   this.$store.commit('setRoleInfo', r)
          //   this.afterLogin && this.afterLogin()
          // })
          // console.log(r)
          // if (r.HasBind) {
          //   this.$store.commit('setUserInfo', r)
          //   return
          // }
          this._getUserInfo()
        }
      } catch (err) {
        console.log(err)
      }
    },
    _loginDone() {
      this.showAuthorized = false
      this.afterLogin && this.afterLogin()
    }
  }
}

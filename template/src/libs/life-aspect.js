/**
 * 面向切面式的拦截生命周期函数
 */

import bus from "_bus"

const init = App => {
  // 存储相同页面的页面栈，用于解决页面多次打开数据不正确的问题
  const $mpData = {
    list: [],
    setLast(val) {
      this.list[this.list.length - 1] = val
    },
    getLast() {
      return this.list[this.list.length - 1]
    }
  }
  // 提取原始onLoad函数，增加初始化方法绑定
  const lifes = {
    onLoad: async function() {
      let lastMp = $mpData.getLast()
      // 将老数据浅拷贝到数组中，防止跟着对象引用变化
      if (lastMp) {
        $mpData.setLast({
          ...lastMp
        })
      }
      return true
    },
    onShow: async function(...args) {
      // if (await goLogin.apply(this)) {
      //   let {
      //     page: { route },
      //     query
      //   } = this.$mp
      //   let qs = queryToString(query)
      //   let returnUrl = qs ? `/${route}?${qs}` : "/" + route
      //   wx.reLaunch({
      //     url: "/pages/login/index?returnUrl=" + encodeURIComponent(returnUrl)
      //   })
      //   return false
      // }
      if (this.__resetPageRootDataFlag) {
        // 防止每次onShow刷新
        this.__resetPageRootDataFlag = false
        // 恢复原来页面的数据
        Object.assign(this, $mpData.getLast())
        // 把this更新回到list中，需要的时候在保存
        $mpData.setLast(this)
        return true
      }
    },
    onUnload: function() {
      // 删除栈中最后一个
      $mpData.list.pop()
      // 如果卸载页面后，页面栈还大于0，就需要设置更新变量
      this.__resetPageRootDataFlag = $mpData.list.length > 0
      return true
    }
  }

  // 新的生命周期，用于单独处理和触发事件
  Object.entries(lifes).forEach(([life, baseLifeFn]) => {
    // 获取页面的生命周期
    let pageLifeFn = App[life]
    App[life] = function(...args) {
      // 调用基础公用的生命周期
      let res = baseLifeFn.apply(this, args)
      // 调用页面自身的生命周期
      if (pageLifeFn && res) {
        pageLifeFn.apply(this, args)
      }
      // 用于用户自定义的全局生命周期函数，用于页面跳转传递数据和方法调用
      bus.trigger(this, life)
      // 如果是销毁，初始化数据，清空观察者
      if (life === "onUnload") {
        // 初始化数据，避免下次进入页面出现数据还是老数据
        if (this.$options.data) {
          Object.assign(this.$data, this.$options.data())
        }
        // 清空观察者，防止递增观察页面数据
        this._watchers = []
        if (this._watcher && this._watcher.teardown) {
          this._watcher.teardown()
        }
      }
    }
  })
}
export { init as default }

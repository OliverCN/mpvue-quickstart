export default {
  onLoad: {
    fn: null,
    args: []
  },
  onShow: {
    fn: null,
    args: []
  },
  set(life, fn, args) {
    if (fn) {
      this[life] = {
        fn, args
      }
    }
  },
  trigger (app, life) {
    if (!this[life]) return
    let { fn, args } = this[life]
    if (app[fn]) {
      app[fn].apply(app, args)
    }
    // 清空事件
    this[life] = {
      fn: null,
      args: []
    }
  }
}

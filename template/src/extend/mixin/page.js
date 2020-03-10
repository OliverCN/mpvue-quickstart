export default {
  data() {
    return {
      // 是否正在请求中
      isLoading: false,
      // 是否已经加载完
      noMore: false,
      // 每页条数
      pageSize: 20,
      // 当前第几页
      pageIndex: 0,
      // 已经加载的数据，页面绑定时使用
      listData: []
    }
  },
  methods: {
    // 当查询条件改变或在其他情况下需要重新加载的时候
    reload() {
      this.isLoading = false
      this.noMore = false
      this.pageIndex = this.$options.data().pageIndex
      // this.listData = []
      this.preLoadMore()
    },
    // 绑给scroll-view的方法
    async preLoadMore() {
      if (this.isLoading || this.noMore) return
      if (!this.loadMore || typeof this.loadMore !== "function") return
      this.isLoading = true
      /*
       页面中定义一个名为loadMore的方法，该方法一定要返回当前页的数据列表，切为async-await
      */
      try {
        let pageData = await this.loadMore()
        this.isLoading = false
        // 如果返回数据比页大小少 说明加载完毕，否则页数加1
        if (pageData.length < this.pageSize) {
          this.noMore = true
        } else {
          this.pageIndex += 1
        }
        if (this.pageIndex === 0) {
          this.listData = [...pageData]
        } else {
          this.listData = [...this.listData, ...pageData]
        }
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
    }
  }
}

import { createOrder, unifiedOrder, pay } from '_api/pay'

export default {
  data() {
    return {
      orderNo: ''
    }
  },
  methods: {
    async goPay(boxCode, cellNumber, productId) {
      const { orderNo } = await createOrder({
        cellNumber,
        productId,
        boxCode
      })
      this.orderNo = orderNo
      const { prepayId } = await unifiedOrder({
        orderNo
      })
      const arg = await pay({ orderNo, prepayId })
      // console.log(pac)
      arg.package = arg.pac
      return this.$wx.wxPay(arg)
    }
  }
}

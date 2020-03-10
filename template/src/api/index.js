import http from '_libs/request'

export const user = {
  login: args => http.post('/user/login', args, {
    noToken: true
  }),
  saveUserInfo: args => http.post('/user/edit-wechat', args),
  getInfo: () => http.post('/user/single', {}),
  updateMp4: args => http.post('/user/edit-mp4', args),
  updateImage: args => http.post('/user/edit-imageUrl', args),
  updateName: args => http.post('/user/edit-name', args),
  updateMail: args => http.post('/user/edit-mail', args),
  updatePhone: args => http.post('/user/edit-phone', args),
  updateIntro: args => http.post('/user/edit-introduction', args),
  updateWechatNo: args => http.post('/user/edit-wechatno', args),
  updateRemark: args => http.post('/user/customer/edit-remark', args),
  updateJobTitle: args => http.post('/user/edit-job-title', args),
  updateHeadUrl: args => http.post('/user/edit-avatarUrl', args),
  decodePhone: args => http.post('/user/authorize', args),
  bind: args => http.post('/user/card/authorize', args),
  getQrcode: args => http.post('/user/qrcode', args, { sinlence: true }),
  exchange: args => http.post('/user/exchange', args)
}
export const customer = {
  page: args => http.post('/user/customer/page', args),
  single: args => http.post('/user/customer/single', args),
  updateType: args => http.post('/user/customer/edit-type', args)
}

export const card = {
  page: args => http.post('/user/card/page', args),
  single: args => http.post('/user/card/single', args),
  fold: args => http.post('/user/card/fold', args),
  unfold: args => http.post('/user/card/unfold', args),
  top: args => http.post('/user/card/top', args),
  untop: args => http.post('/user/card/untop', args),
  like: args => http.post('/user/card/like', args)
}

export const product = {
  page: args => http.post('/product/page', args),
  single: args => http.post('/product/single', args),
  getBanner: args => http.post('/product/banner', args)
}

export const news = {
  page: args => http.post('/news/page', args),
  single: args => http.post('/news/single', args),
  like: args => http.post('/news/like', args),
  share: args => http.post('/news/share', args),
  browse: args => http.post('/news/browse', args)
}

export const company = {
  web: args => http.post('/company/web', args)
}

export const oss = {
  getToken: args => http.post('/oss/token', args)
}

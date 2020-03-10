/**
 * 发起网络请求
 * @param {Object} options 参数
 */
export const requestSync = options => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...options,
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}
/**
 * 微信支付
 * @param {Object} args 支付参数
 */
export const wxPay = args => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...args,
      success: resolve,
      fail: reject
    })
  })
}
/**
 * 获取权限授权情况，true=同意授权  false=拒绝或未进行授权操作
 * @param {String} scopeName 要获取的权限名
 */
export const getSetting = scopeName => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        const auth = res.authSetting[`scope.${scopeName}`]
        // if (auth === undefined) {
        //   resolve(false)
        //   return
        // }
        resolve(!!auth)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

/**
 * 打开授权界面进行授权
 * @param {String} scopeName 要进行授权的权限名
 */
export const openSetting = scopeName => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success(res) {
        resolve(res.authSetting[`scope.${scopeName}`])
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

/**
 * 获取地理位置信息
 * @param {String} type wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
 * @param {Boolean} altitude 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
 */
export const getLocation = (type = "wgs84", altitude = false) => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      altitude,
      type,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

/**
 * 打开微信内置地图
 * @param {Object} param0 打开微信内置地图的参数
 */
export const openLocation = ({ latitude, longitude, ...others }) => {
  wx.openLocation({
    latitude,
    longitude,
    ...others
  })
}

/**
 * 调用接口获取登录凭证（code）
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject
    })
  })
}
/**
 * 检查登录状态，如果已经失效就再登录一次
 */
export const checkSession = () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: function() {
        resolve(true)
      },
      fail: function() {
        resolve(false)
      }
    })
  })
}
/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    checkSession().then(() => {
      wx.getUserInfo({
        withCredentials: true,
        lang: "zh_CN",
        success: resolve,
        fail: reject
      })
    })
  })
}

/**
 * 全屏预览图片
 * @param {Object} arg 预览参数
 */
export const previewImage = arg => {
  return wx.previewImage(arg)
}

/**
 * 从本地相册选择图片或使用相机拍照
 * @param {Object} param0 参数对象
 */
export const chooseImage = ({
  count = 1,
  sizeType = ["original", "compressed"],
  sourceType = ["album", "camera"]
}) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count,
      sizeType,
      sourceType,
      success: res => {
        resolve(res.tempFilePaths)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

/**
 * 拨打电话
 * @param {String} phone 电话号码
 */
export const makePhoneCall = phone => {
  return wx.makePhoneCall({
    phoneNumber: phone
  })
}

/**
 * 显示消息提示框
 * @param {Object} args 参数
 */
export const showToast = args => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      icon: "none",
      ...args,
      success: () => {
        let duration = args.duration || 1500
        setTimeout(resolve, duration)
      },
      fail: reject
    })
  })
}
/**
 * 隐藏吐司
 */
export const hideToast = () => {
  return new Promise((resolve, reject) => {
    wx.hideToast({
      success: resolve,
      fail: reject
    })
  })
}
/**
 * 信息提示
 * @param {String} msg 提示信息
 * @param {Number} duration 显示时间
 */
export const toast = (msg = "", duration = 1500) => {
  return showToast({ title: msg, duration })
}

/**
 * 成功信息提示
 * @param {String} msg 提示信息
 * @param {Number} duration 显示时间
 */
export const succss = (msg = "", duration = 1500) => {
  return showToast({ title: msg, icon: "success", duration })
}

export const alert = (msg, options = {}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...options,
      title: options.title || "",
      content: msg,
      showCancel: false,
      success(res) {
        if (res.confirm) {
          resolve("confirm")
        } else if (res.cancel) {
          resolve("cancel")
        }
      }
    })
  })
}
export const confirm = (msg, options = {}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      confirmColor: "#DF5858",
      ...options,
      title: options.title || "",
      content: msg,
      success(res) {
        resolve(res.confirm)
        // if (res.confirm) {
        //   resolve("confirm")
        // } else if (res.cancel) {
        //   resolve("cancel")
        // }
      }
    })
  })
}

/**
 * loading提示
 * @param {String} msg 提示信息
 * @param {Number} duration 显示时间
 */
export const showLoading = (msg = "加载中") => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: msg,
      mask: true,
      success: resolve,
      fail: reject
    })
  })
}
/**
 * 隐藏加载提示框
 */
export const hideLoading = () => {
  return new Promise((resolve, reject) => {
    wx.hideLoading({
      success: resolve,
      fail: reject
    })
  })
}
/**
 * 设置缓存
 * @param {String} key 键
 * @param {Any} value 缓存数据
 * @param {Number} expire 缓存时间，秒数,0表示一直存在，直到微信回收
 */
export const setStorage = (key, value, expire = 0) => {
  if (!isNaN(expire) && expire > 0) {
    expire += new Date() / 1000
  }
  wx.setStorageSync(key, {
    value,
    expiredAt: expire
  })
}
/**
 * 获取缓存数据
 * @param {String} key 键
 * @param {Boolean} remove 读取完后是否移除
 */
export const getStorage = (key, remove = false) => {
  try {
    let data = wx.getStorageSync(key)
    if (!data) return false
    const { value, expiredAt } = data
    if (value === undefined) return data
    if (expiredAt !== undefined) {
      if (remove) {
        wx.removeStorageSync(key)
      }
      // 如果过期时间为0 或没有过期就直接返回值
      if (expiredAt === 0 || expiredAt > new Date() / 1000) return value
      // 过期了就把这个缓存移除并返回false
      wx.removeStorageSync(key)
      return false
    } else {
      if (remove) {
        wx.removeStorageSync(key)
      }
      return data
    }
  } catch (e) {
    return false
  }
}
/**
 * 移除缓存
 * @param {String} key 键
 */
export const removeStorage = key => {
  wx.removeStorageSync(key)
}

export const getToday = () => {
  const now = new Date()
  const year = now.getFullYear()
  let month = now.getMonth() + 1
  month = month < 10 ? "0" + month : month
  let day = now.getDate()
  day = day < 10 ? "0" + day : day
  return `${year}-${month}-${day}`
}
/**
 * 设置以当日日期为key的缓存数据
 * @param {String} k key
 * @param {Any} v value
 */
export const setDayStorage = (k, v) => {
  const today = getToday()
  let storage = wx.getStorageSync(today)
  if (!storage) storage = {}
  storage[k] = v
  wx.setStorageSync(today, storage)
}
/**
 * 获取当日的缓存数据
 * @param {String} key key
 */
export const getDayStorage = key => {
  const today = getToday()
  let storage = wx.getStorageSync(today)
  if (!storage) return false
  return storage[key]
}
/**
 * 下载文件
 * @param {Object} options 参数
 */
export const downloadFile = options => {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      ...options,
      success: resolve,
      fail: reject
    })
  })
}

/**
 * 把流文件写入本地
 * @param {Object} options 参数
 */
export const base64Src = base64data => {
  const fsm = wx.getFileSystemManager()
  return new Promise((resolve, reject) => {
    const [, format, bodyData] =
      /data:image\/(\w+);base64,(.*)/.exec(base64data) || []
    if (!format) {
      reject(new Error("ERROR_BASE64SRC_PARSE"))
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${bodyData.substr(
      32,
      48
    )}.${format}`
    const buffer = wx.base64ToArrayBuffer(bodyData)
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: "binary",
      success() {
        resolve(filePath)
      },
      fail() {
        reject(new Error("ERROR_BASE64SRC_WRITE"))
      }
    })
  })
}

/**
 * 复制字符串到粘贴板
 * @param {String} data 要复制到粘贴板的字符串
 */
export const copyTxt = data => {
  return new Promise((resolve, reject) => {
    wx.setClipboardData({
      data,
      success: resolve,
      fail: reject
    })
  })
}

/**
 * 选取视频
 */
export const chooseVideo = options => {
  return new Promise((resolve, reject) => {
    wx.chooseVideo({
      ...options,
      success: resolve,
      fail: reject
    })
  })
}

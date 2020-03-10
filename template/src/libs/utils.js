import qs from "qs"
import shareBg from "@/assets/share.png"
/*
* 将对象转变为style字符串，对象属性的camel命名会转换为中划线命名
*/
export function styles(obj) {
  let stylesStr = ""
  for (let styleName in obj) {
    if (obj.hasOwnProperty(styleName)) {
      stylesStr += `${styleName.replace(/([A-Z])/g, "-$1").toLowerCase()}:${
        obj[styleName]
      };`
    }
  }
  return stylesStr
}

// 获取分享信息
export const getShareInfo = opt => {
  const { args = {}, ...others } = opt
  // eslint-disable-next-line no-undef
  const { route, options } = getCurrentPages()[0]
  const queryStr = qs.stringify(options)
  const argsStr = qs.stringify(args)
  let path = `/${route}${queryStr || argsStr ? "?" : ""}${queryStr}${
    argsStr ? "&" : ""
  }${argsStr}`
  return {
    path,
    ...others
  }
}

// 格式化日期，如月、日、时、分、秒保证为2位数
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : "0" + n
}
// 参数number为毫秒时间戳，format为需要转换成的日期格式
export const formatTime = (number, format) => {
  let time = new Date(number)
  let newArr = []
  let formatArr = ["Y", "M", "D", "h", "m", "s"]
  newArr.push(time.getFullYear())
  newArr.push(formatNumber(time.getMonth() + 1))
  newArr.push(formatNumber(time.getDate()))

  newArr.push(formatNumber(time.getHours()))
  newArr.push(formatNumber(time.getMinutes()))
  newArr.push(formatNumber(time.getSeconds()))

  for (let i in newArr) {
    format = format.replace(formatArr[i], newArr[i])
  }
  return format
}

export const getShareBgPath = () => {
  return new Promise((resolve, reject) => {
    const fsm = wx.getFileSystemManager()
    const filePath = `${wx.env.USER_DATA_PATH}/share_bg.png`

    const [, bodyData] =
      /data:image\/png;base64,(.*)/.exec(shareBg) || []
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

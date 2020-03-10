/* eslint-disable no-extend-native */
/**
 * 把对象序列化成字符串
 */
// Object.prototype.stringify = function() {
//   if (Object.prototype.toString(this) !== "[object Object]") return ""
//   let str = ""
//   for (let key in this) {
//     str += `${key}=${this[key]}&`
//   }
//   str = str.slice(0, str.length - 1)
//   return str
// }

/**
 * 深拷贝
 */
// Object.prototype.deepClone = function() {
//   if (this == null) return null
//   if (this instanceof Date) return new Date(this)
//   if (this instanceof RegExp) return new RegExp(this)
//   if (typeof this !== "object") return this
//   let t = new this.constructor()
//   for (let key in this) {
//     t[key] = this.deepClone(this[key])
//   }
//   return t
// }

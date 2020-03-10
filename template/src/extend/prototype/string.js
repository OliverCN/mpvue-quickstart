/* eslint-disable no-extend-native */
String.prototype.isMobile = function() {
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return myreg.test(this)
}

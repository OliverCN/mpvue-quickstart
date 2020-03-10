/* eslint-disable no-extend-native */

/**
 * 数组分组
 */
Array.prototype.groupBy = function(iteratee) {
  return this.reduce((data, item, key) => {
    key = iteratee(item)
    if (data.hasOwenProperty(key)) {
      data[key].push(item)
    } else {
      data[key] = [item]
    }
  }, {})
}

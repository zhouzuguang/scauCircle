/**
 * @author joe
 * @email 1047649886@qq.com
 * @create date 2018-11-06 22:04:29
 * @modify date 2018-11-06 22:04:29
 * @desc 封装 getter setter
*/

export const getStore = function (key) {
  let value = localStorage.getItem(key)
  value = JSON.parse(value)
  return value
}

export const saveStore = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

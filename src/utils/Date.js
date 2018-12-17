/**
 * @author joe
 * @email 1047649886@qq.com
 * @create date 2018-11-06 23:03:32
 * @modify date 2018-11-06 23:04:58
 * @desc 时间格式化
*/

function format (val) {
  let d = new Date(val.replace(/-/g, '/'))
  let year = d.getFullYear()
  let month = change(d.getMonth() + 1)
  let day = change(d.getDate())
  return year + '-' + month + '-' + day
}
// 不够两位的补成两位
function change (t) {
  if (t < 10) {
    return '0' + t
  } else {
    return t
  }
}

export default function (val) {
  // for safari !!!

  let time = new Date(val.replace(/-/g, '/'))
  let now = new Date()

  // 差距多少秒
  let t = (now - time) / 1000
  // 少于一分钟
  if (t < 60) {
    return '少于一分钟'
  }
  // 差距多少分钟
  t = (now - time) / 1000 / 60
  // 小于1小时
  if (t < 60) {
    return Math.round(t) + '分钟前'
  }
  t = (now - time) / 1000 / 60 / 60
  // 24小时内
  if (t < 24) {
    return Math.round(t) + '小时前'
  }

  // yy-mm-dd
  return format(val)
}

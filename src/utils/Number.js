/**
 * @author joe
 * @email 1047649886@qq.com
 * @create date 2018-11-06 23:04:02
 * @modify date 2018-11-06 23:05:11
 * @desc 数字格式化
*/

export default function (val) {
  if (val > 100000) {
    return '10W+'
  } else {
    return val
  }
}

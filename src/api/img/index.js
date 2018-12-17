/**
 * @author joe
 * @email 1047649886@qq.com
 * @create date 2018-11-21 09:07:09
 * @modify date 2018-11-21 09:07:09
 * @desc 图片相关API
*/
import { uploadImgUrl, delImgUrl } from './config'
import { post, del } from '../index'

export const uploadImg = function (data, config) {
  return post(uploadImgUrl, data, config)
}

export const delImg = function (id) {
  return del(delImgUrl + id)
}

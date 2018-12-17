/**
 * @author joe
 * @email 1047649886@qq.com
 * @create date 2018-11-06 20:03:49
 * @modify date 2018-11-06 20:28:56
 * @desc 消息相关接口
*/

import { get, post, del } from '@/api/index'
import { messageListUrl, getMessageUrl, postMessageUrl, delMessageUrl, favMessageUrl, likeMessageUrl } from './url'

/**
 * 获取消息列表
 * @param { Number } columnId 栏目ID
 * @param { Number } currentPage 页数
 * @param { String } keyWord 关键词 用于搜索
 */
export const messageList = function (columnId, currentPage, keyWord) {
  let url = `${messageListUrl}/${columnId}/${currentPage}`
  if (keyWord) {
    url = `${url}?keyword=${keyWord}`
  }
  return get(url)
}

/**
 * 获取具体消息
 * @param {Number} messageId 消息ID
 */
export const getMessage = function (messageId) {
  return get(`${getMessageUrl}/${messageId}`)
}

/**
 * 发布消息 需要登陆
 * @param {Object} data 发布的消息等信息
 */
export const postMessage = function (data) {
  return post(postMessageUrl, data)
}

/**
 * 删除消息 需要登陆
 * @param {Number} messageId 要删除的ID
 */
export const delMessage = function (messageId) {
  return del(`${delMessageUrl}?messageId=${messageId}`)
}

/**
 * 收藏/取消收藏消息 需要登陆
 * @param {Number} messageId 要收藏/取消收藏的ID
 */
export const favMessage = function (messageId) {
  return post(`${favMessageUrl}/${messageId}`)
}

/**
 * 点赞/取消点赞消息 需要登陆
 * @param {Number} messageId 要点赞/取消点赞的ID
 */
export const likeMessage = function (messageId) {
  return post(`${likeMessageUrl}/${messageId}`)
}

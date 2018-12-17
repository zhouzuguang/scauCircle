/**
 * @author joe
 * @email 1047649886@qq.com
 * @create date 2018-11-06 21:10:36
 * @modify date 2018-11-06 21:20:19
 * @desc 栏目相关接口
*/

import { get, post } from '@/api/index'
import { newsColumnListUrl, messageColumnListUrl, allColumnListUrl, userColumnListUrl, postNewsColumnUrl, postMessageColumnUrl } from './url'

/**
 * 获取新闻栏目
 */
export const newsColumnList = function () {
  return get(newsColumnListUrl)
}

/**
 * 获取消息栏目
 */
export const messageColumnList = function () {
  return get(messageColumnListUrl)
}

/**
 * 获取所有栏目
 */
export const allColumnList = function () {
  return get(allColumnListUrl)
}

/**
 * 获取用户订阅的栏目
 */
export const userColumnList = function () {
  return get(userColumnListUrl)
}

/**
 * 订阅/取消订阅 新闻栏目 需要登陆
 * @param {Number} newsColumnId 新闻栏目ID
 */
export const postNewsColumn = function (newsColumnId) {
  return post(`${postNewsColumnUrl}/${newsColumnId}`)
}

/**
 * 订阅/取消订阅 消息栏目 需要登陆
 * @param {Number} messageColumnId 消息栏目ID
 */
export const postMessageColumn = function (messageColumnId) {
  return post(`${postMessageColumnUrl}/${messageColumnId}`)
}

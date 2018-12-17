/**
 * @author joe
 * @email 1047649886@qq.com
 * @create date 2018-11-06 21:30:18
 * @modify date 2018-11-06 21:42:28
 * @desc 用户相关接口
*/

import { get, post } from '@/api/index'
import { getUserInfoByCodeUrl, getUserInfoUrl, favMessageListUrl, favNewsListUrl, publishListUrl, commentListUrl, likeListUrl } from './url'

/**
 * 根据易班返回的CODE 登陆
 * @param {Object} data 易班CODE 以及 REDIRECTURL
 */
export const login = function (data) {
  return post(getUserInfoByCodeUrl, data)
}

/**
 * 获取个人信息 需要登陆
 */
export const getUserInfo = function () {
  return get(getUserInfoUrl)
}

/**
 * 获取用户收藏的消息列表 需要登陆
 * @param {Number} currentPage 页数
 */
export const favMessageList = function (currentPage) {
  return get(`${favMessageListUrl}/${currentPage}`)
}

/**
 * 获取用户收藏的新闻列表 需要登陆
 * @param {Number} currentPage 页数
 */
export const favNewsList = function (currentPage) {
  return get(`${favNewsListUrl}/${currentPage}`)
}

/**
 * 获取用户发布的列表 需要登陆
 * @param {Number} currentPage 页数
 */
export const publishList = function (currentPage) {
  return get(`${publishListUrl}/${currentPage}`)
}

/**
 * 获取用户评论列表 需要登陆
 * @param {Number} currentPage 页数
 */
export const commentList = function (currentPage) {
  return get(`${commentListUrl}/${currentPage}`)
}

/**
 * 获取用户点赞列表  需要登陆
 * @param {Number} currentPage 页数
 */
export const likeList = function (currentPage) {
  return get(`${likeListUrl}/${currentPage}`)
}

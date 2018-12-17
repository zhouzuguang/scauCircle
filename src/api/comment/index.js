/**
 * @author joe
 * @email 1047649886@qq.com
 * @create date 2018-11-06 20:48:08
 * @modify date 2018-11-06 21:05:21
 * @desc 评论相关接口
*/

import { get, post, del } from '@/api/index'
import { commentListUrl, postCommentUrl, delCommentUrl, likeCommentUrl } from './url'

/**
 * 获取根据消息ID评论列表
 * @param {Number} messageId 消息ID
 * @param {Number} currentPage 页数
 */
export const commentList = function (messageId, currentPage) {
  return get(`${commentListUrl}/${currentPage}?messageId=${messageId}`)
}

/**
 * 发表评论 需要登陆
 * @param {Object} data 发布的相关内容
 */
export const postComment = function (data) {
  return post(postCommentUrl, data)
}

/**
 * 删除评论 需要登陆
 * @param {Number} commentId 评论ID
 */
export const delComment = function (commentId) {
  return del(`${delCommentUrl}?commentId=${commentId}`)
}

/**
 * 评论点赞/取消点赞 需要登陆
 * @param {Number} commentId 评论ID
 */
export const likeComment = function (commentId) {
  return post(`${likeCommentUrl}/${commentId}`)
}

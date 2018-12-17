/**
 * @author joe
 * @email 1047649886@qq.com
 * @create date 2018-11-06 20:35:35
 * @modify date 2018-11-06 20:44:25
 * @desc 新闻相关接口
*/
import { get, post } from '@/api/index'
import { newsListUrl, getNewsUrl, recentNewsUrl, favNewsUrl } from './url'
/**
 * 获取新闻列表
 * @param {Number} fromId 新闻来源ID
 * @param {Number} currentPage 页数
 * @param {String} keyword 关键词 用于搜索
 */
export const newsList = function (fromId, currentPage, keyword) {
  let url = `${newsListUrl}/${fromId}/${currentPage}`
  if (keyword) {
    url = `${keyword}?keyword=${keyword}`
  }
  return get(url)
}

/**
 * 获取具体新闻
 * @param {Number} newsId 新闻Id
 */
export const getNews = function (newsId) {
  return get(`${getNewsUrl}/${newsId}`)
}

/**
 * 获取最近新闻列表
 * @param {Number} currentPage 页数
 * @param {String} keyword 关键词 用于搜索
 */
export const recentNewsList = function (currentPage, keyword) {
  let url = `${recentNewsUrl}/${currentPage}`
  if (keyword) {
    url = `${keyword}?keyword=${keyword}`
  }
  return get(url)
}

/**
 * 收藏/取消收藏新闻 需要登陆
 * @param {Number} newsId 要收藏/取消收藏的ID
 */
export const favNews = function (newsId) {
  return post(`${favNewsUrl}/${newsId}`)
}

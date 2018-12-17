<template>
  <div class="mypublish">
    <my-back title="我的收藏"/>
    <mu-tabs :value.sync="active" center @change="change" color="primary" style="padding-top:40px">
      <mu-tab>首页</mu-tab>
      <mu-tab>广场</mu-tab>
    </mu-tabs>
     <vue-recyclist style="position:fixed;width:100%;top:90px;" class="my-collection-list"
         v-finger:swipe="swipe"
        v-if="active === 0"
        v-loading="spinner"
        ref="list"
        :list="list"
        :size="size"
        :loadmore="loadmore"
        :offset="offset"
        :spinner="spinner"
        :nomore="nomore"
      >
      <template slot="item"  slot-scope="props">
        <my-news
        :news="props.data"
        :key="props.index"
        @redirect="redirectNews(props.index)"
        :author="author"
        />
      </template>
      <template slot="nomore">
      <div style=" color: #1ABC9C;text-align:center">(*^_^*) 快去收藏新内容吧 (*^_^*)</div>
     </template>
    </vue-recyclist>

    <vue-recyclist style="height:600px;position:fixed;width:100%;top:90px;"
       v-if="active === 1"
      v-finger:swipe="swipe"
       v-loading="spinner"
       ref="list"
      :list="list"
      :size="size"
      :loadmore="loadmore"
      :offset="offset"
      :spinner="spinner"
      :nomore="nomore"
    >
    <template slot="item"  slot-scope="props">
       <my-message
       :message="props.data"
       :key="props.index"
       @redirect="redirectMsg(props.index)"
       @isFav="isFav(props.index)"
       />
    </template>
    <template slot="nomore">
      <div style=" color: #1ABC9C;text-align:center">(*^_^*) 快去收藏新内容吧 (*^_^*)</div>
    </template>
  </vue-recyclist>

  </div>
</template>

<script>
import Back from '@/components/other/Back'
import vueRecyclistVue from '@/components/other/vue-recyclist'
import News from '@/components/news/Thumbnail'
import Message from '@/components/message/Thumbnail'
import { favMessageList, favNewsList } from '@/api/user/index'
import { likeMessage } from '@/api/message/index'
export default {
  components: {
    'my-back': Back,
    'vue-recyclist': vueRecyclistVue,
    'my-message': Message,
    'my-news': News
  },
  data () {
    return {
      active: 0,
      author: true,
      size: 13,
      offset: 500,
      list: [],
      spinner: true,
      nomore: false,
      page: 0,
      pageInfo: null
    }
  },
  activated () {
    this.reset()
    this.loadmore()
  },
  methods: {
    /**
     * 左右滑
     */
    swipe (e) {
      const direction = e.direction
      if (direction === 'Left' || direction === 'Right') {
        this.active = this.active === 1 ? 0 : 1
        this.change()
      }
    },
    /**
     * 改变栏目
     */
    change (index) {
      this.reset()
      this.loadmore()
    },
    /**
     * 重置
     */
    reset () {
      this.spinner = false
      this.nomore = false
      this.page = 0
      this.pageInfo = null
      this.list = []
    },
    /**
     * 加载数据
     */
    loadmore () {
      // 如果正在加载 或 已经全部加载完，则返回
      if (this.spinner || this.nomore) {
        return ''
      }
      // 非初始情况 且 当前页为最后一页时
      if (this.pageInfo && this.page >= this.pageInfo.totalPage) {
        this.nomore = true
        return ''
      }

      this.page++
      this.spinner = true
      const _this = this
      // 新闻列表 或 消息列表
      let cb = favNewsList
      if (this.active === 1) {
        cb = favMessageList
      }
      cb(this.page).then(res => {
        // 列表加入 更新页数信息
        if (cb === favMessageList) {
          _this.list = _this.list.concat(res.messageList)
        } else {
          _this.list = _this.list.concat(res.newsList)
        }
        _this.pageInfo = res.page
        _this.spinner = false
        if (_this.page >= _this.pageInfo.totalPage || _this.list.length < 15) {
          _this.nomore = true
        }
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        _this.spinner = false
      })
    },
    /**
     *  跳转消息详情
     */
    redirectMsg (index) {
      const id = this.list[index].id
      this.$router.push({ name: 'MessageDetail', params: { id: id } })
    },
    /**
     * 跳转新闻详情
     */
    redirectNews (index) {
      const id = this.list[index].id
      this.$router.push({ name: 'NewsDetail', params: { id: id } })
    },
    /**
     * 是否点赞 需要登陆
     */
    isFav (index) {
      if (!this.$store.getters.checkLogin) {
        return ''
      }
      const _this = this
      const id = this.list[index].id
      likeMessage(id).then(res => {
        _this.$set(_this.list[index], 'like', !_this.list[index].like)
        if (_this.list[index].like) {
          _this.list[index].likeCount++
        } else {
          _this.list[index].likeCount--
        }
      })
    }

  }
}
</script>

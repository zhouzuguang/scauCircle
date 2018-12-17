<template>
    <div v-loading="loading" style="overflow-x:hidden;"
        v-finger:swipe="swipe"
    >
      <my-back />
      <my-message-detail style="padding-top:50px" v-if="message"
      :message="message"
      @isFav="isFav"
      @zoom="Zoom"
      />
      <div style="padding:0 6px;text-align:left">
        <p >&nbsp;评论( <span v-if="pageInfo">{{ pageInfo.totalNumber }}</span>)</p>
        <!--  eslint-disable-next-line vue/no-use-v-if-with-v-for -->
        <vue-recyclist style="height:460px;width:100%;"
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
              <my-comment v-if="list"
                :key="props.index"
                :comment="props.data"
                @isLike="isLike(props.index)"/>
            </template>
            <template slot="nomore"  >
              <div style="color:#1ABC9C;text-align:center">-- (●'◡'●) 没有评论了 (●'◡'●) --</div>
            </template>
          </vue-recyclist>
      </div>
    <my-review  style="position:fixed;bottom:0px;left:0;width:100%;z-index:999"
      ref="Review"
      @submit="submit"
    />
    <my-mask :src="src" v-show="open" @close="open =!open" />
    </div>
</template>

<script>
import Detail from '@/components/message/Detail'
import ZoomMask from '@/components/other/ZoomMask'
import Back from '@/components/other/Back'
import Comment from '@/components/other/Comment'
import Review from '@/components/other/Review'
import vueRecyclistVue from '@/components/other/vue-recyclist'
import { getMessage, favMessage } from '@/api/message/index'
import { commentList, likeComment, postComment } from '@/api/comment/index'
export default {
  components: {
    'my-message-detail': Detail,
    'my-back': Back,
    'my-comment': Comment,
    'vue-recyclist': vueRecyclistVue,
    'my-review': Review,
    'my-mask': ZoomMask
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  data () {
    return {
      src: null,
      open: false,
      loading: true,
      message: null,
      size: 13,
      offset: 500,
      list: [],
      spinner: false,
      nomore: false,
      page: 0,
      pageInfo: null
    }
  },
  created () {
    this.load()
  },
  watch: {
    '$route': function (to, from) {
      if (to.name === 'MessageDetail') {
        this.reset()
        this.load()
      }
    }
  },
  methods: {
    /**
     * 图片放大
     */
    Zoom (src) {
      this.src = src
      this.open = true
    },
    /**
     * 左滑 右滑 后退页面
     */
    swipe (e) {
      const direction = e.direction
      if (direction === 'Left' || direction === 'Right') {
        const pageX = e.changedTouches[0].pageX
        if (pageX < 50) {
          this.$router.go(-1)
        }
      }
    },
    reset () {
      this.list = []
      this.spinner = false
      this.nomore = false
      this.page = 0
      this.pageInfo = null
    },
    /**
     * 加载数据
     */
    load () {
      const _this = this
      const id = this.$route.params.id
      this.loading = true
      getMessage(id).then(res => {
        _this.loading = false
        _this.message = res.message
      })
      commentList(id, this.page).then(res => {
        _this.list = _this.list.concat(res.commentList)
        _this.pageInfo = res.page
        _this.spinner = false
      })
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
      if (this.pageInfo !== null && this.page >= this.pageInfo.totalPage) {
        this.nomore = true
        return ''
      }

      this.page++
      this.spinner = true
      const _this = this
      const id = this.$route.params.id
      commentList(id, this.page).then(res => {
        // 新闻列表加入 更新页数信息
        _this.list = _this.list.concat(res.newsList)
        _this.pageInfo = res.page
        _this.spinner = false
        if (_this.page >= _this.pageInfo.totalPage || _this.list.lengt < 15) {
          _this.nomore = true
        }
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        _this.spinner = false
      })
    },
    /**
     * 收藏消息 要先登陆
     */
    isFav () {
      if (!this.$store.getters.checkLogin) {
        return ''
      }
      const _this = this
      const id = this.$route.params.id
      favMessage(id).then(res => {
        _this.message.favorite = !_this.message.favorite
      })
    },
    /**
     * 点赞评论 要先登陆 TODO
     */
    isLike (index) {
      if (!this.$store.getters.checkLogin) {
        return ''
      }
      const _this = this
      const id = this.list[index].id
      likeComment(id).then(res => {
        _this.$set(_this.list[index], 'like', !_this.list[index].like)
        if (_this.list[index].like) {
          _this.list[index].likeCount++
        } else {
          _this.list[index].likeCount--
        }
      })
    },
    /**
     * 提交评论
     */
    submit (comment) {
      if (!this.$store.getters.checkLogin) {
        return ''
      }
      const _this = this
      const data = {}
      data.messageId = this.$route.params.id
      data.content = comment
      postComment(data).then(res => {
        _this.list.push(res.comment)
        _this.$refs.list.push(res.comment)
        _this.pageInfo.totalNumber++
        _this.$refs.Review.clear()
      })
    }
  }
}
</script>

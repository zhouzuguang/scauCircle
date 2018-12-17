<template>
  <div class="mypublish">
    <my-back title="我的评论"/>
     <vue-recyclist style="position:fixed;width:100%;top:50px;" class="my-comment-list"
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
       <my-comment
       :comment="props.data.comment"
       :key="props.index"
       :show="show"
       @del="del(props.index)"
       >
       <template slot="message">
         <my-message
         :message="props.data.message"
          @redirect="redirect(props.index)"
          :show="show"
         />
       </template>
       </my-comment>
    </template>
  </vue-recyclist>
  </div>
</template>

<script>
import Back from '@/components/other/Back'
import vueRecyclistVue from '@/components/other/vue-recyclist'
import Comment from '@/components/other/Comment'
import Thumbnail from '@/components/message/Thumbnail'
import { commentList } from '@/api/user/index'
import { delComment } from '@/api/comment/index'
export default {
  components: {
    'my-back': Back,
    'vue-recyclist': vueRecyclistVue,
    'my-comment': Comment,
    'my-message': Thumbnail
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  data () {
    return {
      show: false,
      size: 13,
      offset: 500,
      list: [],
      spinner: true,
      nomore: false,
      page: 0,
      pageInfo: null,
      author: true
    }
  },
  activated () {
    this.reset()
    this.loadmore()
  },
  methods: {
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
      commentList(this.page).then(res => {
        const list = res.messageList
        for (let i = 0, length = list.length; i < length; i++) {
          list[i].comment.ybUser = _this.user.ybUser
        }
        // 列表加入 更新页数信息
        _this.list = _this.list.concat(list)
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
     * 删除评论
     */
    del (index) {
      const id = this.list[index].comment.id
      const _this = this
      delComment(id).then(res => {
        _this.$refs.list.sub(index)
        _this.list.splice(index, 1)
      })
    },
    /**
     *  跳转消息详情
     */
    redirect (index) {
      const id = this.list[index].message.id
      this.$router.push({ name: 'MessageDetail', params: { id: id } })
    }

  }
}
</script>

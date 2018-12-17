<template>
  <div class="mypublish">
    <my-back title="我的发布"/>
     <vue-recyclist style="position:fixed;width:100%;top:50px;" class="my-publish-list"
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
       @redirect="redirect(props.index)"
       @isFav="isFav(props.index)"
       @del="del(props.index)"
       :author="author"
       />
    </template>
  </vue-recyclist>
  </div>
</template>

<script>
import Back from '@/components/other/Back'
import vueRecyclistVue from '@/components/other/vue-recyclist'
import Thumbnail from '@/components/message/Thumbnail'
import { publishList } from '@/api/user/index'
import { delMessage } from '@/api/message/index'
export default {
  components: {
    'my-back': Back,
    'vue-recyclist': vueRecyclistVue,
    'my-message': Thumbnail
  },
  data () {
    return {
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
      publishList(this.page).then(res => {
        // 新闻列表加入 更新页数信息
        _this.list = _this.list.concat(res.messageList)
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
     * 删除消息
     */
    del (index) {
      const id = this.list[index].id
      const _this = this
      delMessage(id).then(res => {
        _this.$refs.list.sub(index)
        _this.list.splice(index, 1)
      })
    },
    /**
     *  跳转消息详情
     */
    redirect (index) {
      const id = this.list[index].id
      this.$router.push({ name: 'MessageDetail', params: { id: id } })
    }

  }
}
</script>

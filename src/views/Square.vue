<template>
  <div class="mainPage square">
     <my-scroll-header
      ref = 'nav'
      :Index.sync="index"
      :navItems="navItems"
     ></my-scroll-header>
     <vue-recyclist style="position:fixed;width:100%;top:50px;" class="specialHeight"
      v-finger:swipe="swipe"
      v-loading="spinner"
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
       @zoom="Zoom"
       />
    </template>
  </vue-recyclist>
    <my-mask :src="src" v-show="open" @close="open =!open" />
    <my-bottom value="Square"/>
  </div>
</template>

<script>
import BottomNav from '@/components/other/BottomNav'
import ScrollHeader from '@/components/other/ScrollHeader'
import vueRecyclistVue from '@/components/other/vue-recyclist'
import ZoomMask from '@/components/other/ZoomMask'
import Thumbnail from '@/components/message/Thumbnail'
import { messageColumnList } from '@/api/column/index'
import { messageList, likeMessage } from '@/api/message/index'
export default {
  components: {
    'my-bottom': BottomNav,
    'my-scroll-header': ScrollHeader,
    'vue-recyclist': vueRecyclistVue,
    'my-message': Thumbnail,
    'my-mask': ZoomMask
  },
  data () {
    return {
      src: null,
      open: false,
      // 导航数据
      index: 0,
      navItems: [],
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
    const _this = this
    // 获取导航数据 以及 初始化
    messageColumnList().then(res => {
      const items = res.squareColumnList
      for (let i = 0, length = items.length; i < length; i++) {
        items[i].shortName = items[i].chineseName
      }
      _this.navItems = items
      _this.loadmore()
    })
  },
  watch: {
    // 切换栏目时 nomore 为  false
    index () {
      this.reset()
      this.loadmore()
    }
  },
  computed: {
    // 当前栏目ID
    id () {
      return this.navItems[this.index].id
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
     * 左滑 右滑
     */
    swipe (e) {
      const direction = e.direction
      if (direction === 'Left') {
        this.$refs.nav.swipeLeft()
      } else if (direction === 'Right') {
        this.$refs.nav.swipeRight()
      }
    },
    /**
     * 切换栏目时 重置数据
     */
    reset () {
      this.nomore = false
      this.spinner = false
      this.page = 0
      this.pageInfo = null
      this.list = []
    },
    /**
     * 加载数据
     */
    loadmore () {
      // 如果正在加载 或 已经全部加载完，则返回
      if (this.spinner || this.nomore || this.navItems.length < 1) {
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
      messageList(this.id, this.page).then(res => {
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
     *  跳转消息详情
     */
    redirect (index) {
      const id = this.list[index].id
      this.$router.push({ name: 'MessageDetail', params: { id: id } })
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

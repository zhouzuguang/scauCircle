<template>
  <div class="mainPage preference">
     <my-scroll-header
      ref = 'nav'
      :Index.sync="index"
      :navItems="navItems"
      v-if="navItems.length > 0"
     ></my-scroll-header>
     <vue-recyclist v-if="type && type === 'news'"
      style="position:fixed;width:100%;top:50px" class="specialHeight"
        v-finger:swipe="swipe"
        v-loading="spinner"
        :list="list"
        :size="size"
        :loadmore="loadmore"
        :offset="offset"
        :spinner="spinner"
        :nomore="nomore"
      >
      <template slot="item"  slot-scope="props" >
        <my-news  :news="props.data" :key="props.index" @redirect="redirectNews(props.index)"/>
      </template>
    </vue-recyclist>
    <vue-recyclist v-if="type && type === 'message'"
      style="position:fixed;width:100%;top:50px" class="specialHeight"
        v-finger:swipe="swipe"
        v-loading="spinner"
        :list="list"
        :size="size"
        :loadmore="loadmore"
        :offset="offset"
        :spinner="spinner"
        :nomore="nomore"
      >
      <template slot="item"  slot-scope="props" >
        <my-message
          @zoom="Zoom"
          :message="props.data" :key="props.index"
          @redirect="redirectMsg(props.index)"
          @isFav="isFav(props.index)"
          />
      </template>
    </vue-recyclist>
    <div style="position:fixed;right:6%;bottom:12%;z-index:998;background:#1ABC9C;border-radius:50%">
      <mu-button color="#fff" icon @click="addColumn" >
        <mu-icon value=":fa fa fa-edit" style="font-size:13px"></mu-icon>
      </mu-button>
    </div>

    <div v-if="navItems.length <= 0" style="text-align:center;margin-top:300px;">
         <!-- eslint-disable-next-line vue/no-parsing-error -->
        <router-link to="/addCol" style="color:#1ABC9C;text-decoration:underline;font-size:16px" >还没有关注，快去关注吧！Go!</router-link>
    </div>
    <my-mask :src="src" v-show="open" @close="open =!open" />
    <my-bottom value="Preference"/>
  </div>
</template>

<script>
import BottomNav from '@/components/other/BottomNav'
import ZoomMask from '@/components/other/ZoomMask'
import ScrollHeader from '@/components/other/ScrollHeader'
import vueRecyclistVue from '@/components/other/vue-recyclist'
import News from '@/components/news/Thumbnail'
import Message from '@/components/message/Thumbnail'
import { userColumnList } from '@/api/column/index'
import { newsList } from '@/api/news/index'
import { messageList, likeMessage } from '@/api/message/index'
export default {
  components: {
    'my-bottom': BottomNav,
    'my-scroll-header': ScrollHeader,
    'vue-recyclist': vueRecyclistVue,
    'my-news': News,
    'my-message': Message,
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
    // 获取导航数据 以及 初始化
    this.init()
  },
  watch: {
    // 切换栏目时 nomore 为  false
    index () {
      this.reset()
      this.loadmore()
    },
    // 如果修改过栏目
    '$route': function (to, from) {
      if (from.name === 'AddCol') {
        this.init()
      }
    }

  },
  computed: {
    // 当前栏目ID
    id () {
      return this.navItems[this.index].id
    },
    type () {
      if (this.navItems.length > 0) {
        return this.navItems[this.index].type
      } else {
        return ''
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
     * 初始化
     */
    init () {
      const _this = this
      userColumnList().then(res => {
        const newsList = res.newsColumnList
        const messageList = res.squareColumnList
        for (let i = 0, length = messageList.length; i < length; i++) {
          messageList[i].shortName = messageList[i].chineseName
          messageList[i].type = 'message'
        }
        for (let i = 0, length = newsList.length; i < length; i++) {
          newsList[i].type = 'news'
        }
        _this.navItems = [].concat(newsList, messageList)
        _this.reset()
        _this.loadmore()
      })
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
      if (this.pageInfo !== null && this.page >= this.pageInfo.totalPage) {
        this.nomore = true
        return ''
      }

      this.page++
      this.spinner = true
      const _this = this
      let cb = newsList
      if (this.type === 'message') {
        cb = messageList
      }
      cb(this.id, this.page).then(res => {
        // 列表加入 更新页数信息
        if (res.newsList) {
          _this.list = _this.list.concat(res.newsList)
        } else {
          _this.list = _this.list.concat(res.messageList)
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
     * 添加栏目
     */
    addColumn () {
      this.$router.push({ name: 'AddCol' })
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

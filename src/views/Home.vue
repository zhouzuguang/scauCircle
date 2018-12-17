<template>
  <div class="mainPage home">
     <my-scroll-header
      ref = 'nav'
      :Index.sync="index"
      :navItems="navItems"
     ></my-scroll-header>
      <vue-recyclist style="position:fixed;width:100%;top:50px" class="specialHeight"
        v-loading="spinner"
        ref="list"
        v-finger:swipe="swipe"
        :list="list"
        :size="size"
        :loadmore="loadmore"
        :offset="offset"
        :spinner="spinner"
        :nomore="nomore"
      >
      <template slot="item"  slot-scope="props">
        <my-news  :news="props.data" :key="props.index" @redirect="redirect(props.index)"/>
      </template>
    </vue-recyclist>
    <my-bottom value="Home"/>
  </div>
</template>

<script>
import BottomNav from '@/components/other/BottomNav'
import ScrollHeader from '@/components/other/ScrollHeader'
import vueRecyclistVue from '@/components/other/vue-recyclist'
import Thumbnail from '@/components/news/Thumbnail'
import { newsColumnList } from '@/api/column/index'
import { newsList, recentNewsList } from '@/api/news/index'
export default {
  components: {
    'my-bottom': BottomNav,
    'my-scroll-header': ScrollHeader,
    'vue-recyclist': vueRecyclistVue,
    'my-news': Thumbnail
  },
  data () {
    return {
      show: true,
      // 导航数据
      index: 0,
      navItems: [
        {
          id: -1,
          shortName: '最新'
        }
      ],
      size: 13,
      offset: 100,
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
    newsColumnList().then(res => {
      _this.navItems = _this.navItems.concat(res.newsColumnList)
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
    // TODO 新闻跳转回来 scroll问题
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
      // 最新列表
      if (this.id === -1) {
        recentNewsList(this.page).then(res => {
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

        return ''
      }
      newsList(this.id, this.page).then(res => {
        // 新闻列表加入 更新页数信息
        _this.list = _this.list.concat(res.newsList)
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
     *  跳转新闻详情
     */
    redirect (index) {
      const id = this.list[index].id
      this.$router.push({ name: 'NewsDetail', params: { id: id } })
    }
  }
}
</script>

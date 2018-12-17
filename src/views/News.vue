<template>
    <div v-loading="loading" style="overflow-x:hidden;"
        v-finger:swipe="swipe"
    >
      <my-back :title="news.title" />
      <my-news-detail
      v-if="news"
      style="padding-top:46px"
      :news="news"
      @isFav="isFav"
      />
    </div>
</template>

<script>
import Detail from '@/components/news/Detail'
import Back from '@/components/other/Back'
import { getNews, favNews } from '@/api/news/index'
export default {
  components: {
    'my-news-detail': Detail,
    'my-back': Back
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  data () {
    return {
      loading: true,
      news: { }
    }
  },
  created () {
    this.load()
  },
  activated () {
    this.load()
  },
  methods: {
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
    /**
     * 加载数据
     */
    load () {
      const _this = this
      const id = this.$route.params.id
      this.loading = true
      getNews(id).then(res => {
        _this.loading = false
        _this.news = res.news
      })
    },
    /**
     * 收藏新闻 要先登陆
     */
    isFav () {
      if (!this.$store.getters.checkLogin) {
        return ''
      }
      const id = this.$route.params.id
      const _this = this
      favNews(id).then(res => {
        _this.news.favorite = !_this.news.favorite
      })
    }
  }
}
</script>

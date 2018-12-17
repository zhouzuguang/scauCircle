<template lang="html">
  <div class="detailPage">
    <div class="detail-title">
      {{news.title}}
    </div>
    <mu-row style="padding:0 2px;margin-top:10px;">
      <mu-col span="2" >
        <img :src="news.logoPath" style="width:40px;height:40px" alt="logo"/>
      </mu-col>
      <mu-col span="7" style="font-weight:bold;font-size:14px">
        {{news.newsFrom}}&nbsp;{{news.clickTimes|NumberFormat}}阅读
        <br/>
        <span style="font-size:14px;font-weight:light;color:gray">{{news.pubDate}} </span>
        <a :href="news.url"  target="_blank" style="display:inline;padding-left:10px" class="primary">阅读原文</a>
      </mu-col>
      <mu-col span="3" >
        <mu-button color="primary" v-if="!news.favorite" @click="fav" style="box-shadow:none">
          收藏
        </mu-button>
        <mu-button color="error" v-else @click="fav" style="box-shadow:none">
          取消收藏
        </mu-button>
      </mu-col>
    </mu-row>
    <div v-html="news.content" class="detail-content"></div>
  </div>
</template>

<script>
import NumberFormat from '@/utils/Number.js'
export default {
  props: {
    news: {
      type: Object
    }
  },
  filters: {
    NumberFormat (val) {
      return NumberFormat(val)
    }
  },
  methods: {
    fav () {
      this.$emit('isFav')
    }
  }
}
</script>

<style lang="css">
.detailPage{
  text-align: left;
  padding:10px 0px;
  background: #fff;
}
.detail-title{
  font-size: 18px;
  font-weight: bold;
  padding:0 6px;
}
.detail-content{
  text-align:left;
  padding:4px 8px;
}
.detail-content  p, .detail-content span{
  font-size:18px
}
.detail-content a{
  font-size: 18px;
  color:#1ABC9C
}
.detail-content p>img{
  display: inline;

}
.detail-content p>img[src$=".gif"]{
  width:16px;
  height:16px;
}
.detail-content p>img[src$=".jpg"]{
  width:100%
}
.detail-content p>img[src$=".png"]{
  width:100%
}
.detail-content p> span >img[src$=".png"]{
  width:100%
}
.detail-content p> span >img[src$=".jng"]{
  width:100%
}
.detail-content p>a{
  display: inline;
  text-decoration: underline;
}

.detail-content img[src$=".jpg"] {
  width: 100%;
  height: auto
}
.detail-content img[src$="png"] {
  width: 100%;
  height: auto
}
</style>

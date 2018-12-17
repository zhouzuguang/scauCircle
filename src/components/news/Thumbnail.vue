<template lang="html">
  <div class="news-thumbnail-Component" v-if="news">
    <div class="news-thumbnail-body" @click="click">
      <mu-row >
        <mu-col span="8"><p class="news-thumbnail-title">{{ news.title }}</p></mu-col>
        <mu-col span="4"><img :src="news.thumbImgPath" alt="图片" class="news-thumbnail-img" /></mu-col>
      </mu-row>
      <mu-row class="news-thumbnail-label">
        <mu-col span="3"><span>{{news.label}}</span></mu-col>
        <mu-col span="3"><span>{{news.pubDate}}</span></mu-col>
        <mu-col span="3"><span>{{news.clickTimes}}阅读</span></mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Object
    }
  },
  methods: {
    click () {
      this.$emit('redirect')
    }
  }
}
</script>

<style lang="css">
.news-thumbnail-title{
  font-weight: bold;
  font-size:15px;
  text-align: left;
  font-family: Arial, sans-serif;
  margin:0;
  overflow: hidden;
  color:#000
}
.news-thumbnail-body{
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
.news-thumbnail-content{
  word-break:break-all;
  text-align: left;
  margin:0;
}
.news-thumbnail-img{
  width: 100%;
  height:100px;
}
.news-thumbnail-Component{
  padding:6px 8px;
  background: #fff;
  margin: 6px 10px;
  box-shadow: 2px 2px 6px #b6c3c1;
  border-radius: 8px;

}
.news-thumbnail-label{
  text-align: left
}
.news-thumbnail-label span{
  font-size:14px;
  color:gray;
  overflow: hidden;
}
</style>

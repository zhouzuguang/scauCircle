<template lang="html">
  <div class="squareComplex" >
    <mu-row>
      <mu-col span="2" > <img  :src="message.ybUser.ybUserHead" alt="头像" style="width:40px;height:auto;border-radius:50%;" v-if="message.ybUser"></mu-col>
      <mu-col span="7" style="color:#1ABC9C;text-align:left" v-if="message.ybUser">
        {{message.ybUser.ybUserNick}}<br/>
        <span style="font-size:12px;color:gray">{{message.pubTime|timeFormat}}  {{message.clickTimes  }}阅读</span>
      </mu-col>
      <mu-col span="1">
        <mu-button color="primary" @click="isFav" v-if="!message.favorite" style="box-shadow:none">
          <mu-icon left value=":fa fa fa-heart"></mu-icon>
          收藏
        </mu-button>
        <mu-button color="error" @click="isFav" v-else style="box-shadow:none">
          取消收藏
        </mu-button>
      </mu-col>
    </mu-row>
    <mu-row>
      <mu-col span="10" offset="1" >
        <!-- <p class="square-title">【{{message.title}}】</p> -->
        {{message.content}}
      </mu-col>
    </mu-row >
    <mu-row style="margin-top:10px">
    <mu-col span="10" offset="1" style="display: flex;flex-wrap: wrap;" v-if="message.imageList">
          <img :src="$img.webPath" alt="图片" style="width:30%;height:100px" v-for="($img,$index) in message.imageList" :key=" 'img-'+$index"  @click.stop="Zoom($img.webPath)" />
        </mu-col>
    </mu-row>
  </div>
</template>

<script>
import timeFormat from '@/utils/Date.js'
export default {
  props: {
    message: {
      type: Object
    }
  },
  filters: {
    timeFormat (val) {
      return timeFormat(val)
    }
  },
  methods: {
    isFav () {
      this.$emit('isFav', this.message)
    },
    Zoom (src) {
      this.$emit('zoom', src)
    }
  }

}
</script>

<style lang="css">
.squareComplex-img{
  margin:8px auto;
}
.squareComplex{
  padding:10px 8px;
  text-align: left;
  background: #fff
}
</style>

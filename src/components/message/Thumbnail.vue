<template lang="html">
  <div class="squareComponent" >
    <div @click.stop="redirect">
      <mu-row v-if="message.ybUser">
        <mu-col span="2" ><img :src="message.ybUser.ybUserHead" alt="头像" class="square-icon"></mu-col>
        <mu-col span="7" style="color:#1ABC9C;text-align:left;font-size:12px">
          {{message.ybUser.ybUserNick}}<br/>
          <span style="font-size:12px;color:gray">{{message.pubTime|timeFormat}}  {{message.clickTimes |NumberFormat }} 阅读 &nbsp;{{message.commentCount | NumberFormat}} 评论</span>
        </mu-col>
        <mu-col span="3"  style="position:relative;z-index:99;padding-right:4px" v-if="author">
          <mu-button color="error" @click.stop="del" small style="box-shadow:none;">
            删除
          </mu-button>
        </mu-col>
        <mu-col span="1"  v-if="!author&&show" style="position:relative;z-index:88;" @click.stop="isFav">
          <vue-star color="#1ABC9C" :like="message.like" style="top:-40px;" >
            <mu-icon slot="icon" value=":fa fa fa-thumbs-up"   ></mu-icon>
          </vue-star>
        </mu-col>
        <mu-col span="2" v-if="!author&&show" style="text-align:left;position;relative;left:30px;font-size:12px;top:2px">{{ message.likeCount|NumberFormat }}</mu-col>
      </mu-row>

      <mu-row>
        <mu-col span="10" offset="1" >
          <p class="square-content">&nbsp;{{message.content}}</p>
        </mu-col>
      </mu-row>

      <mu-row style="margin-top:10px">
        <mu-col span="11" offset="1" style="display: flex;flex-wrap: wrap;" v-if="message.imageList">
          <img   :src="$img.webPath" alt="图片" class="square-img" v-for="($img,$index) in message.imageList" :key=" 'img-'+$index" @click.stop="Zoom($img.webPath)"/>
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script>
import timeFormat from '@/utils/Date.js'
import NumberFormat from '@/utils/Number.js'
import VueStar from '@/components/other/VueStar'
export default {
  components: {
    VueStar
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    author: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  filters: {
    timeFormat (val) {
      return timeFormat(val)
    },
    NumberFormat (val) {
      return NumberFormat(val)
    }
  },
  computed: {
    colorValue () {
      return this.message.like ? '#1ABC9C' : '#808080'
    }
  },
  methods: {
    share (e) {

    },
    del () {
      this.$emit('del')
    },
    isFav () {
      this.$emit('isFav')
    },
    commentClick () {
      this.$emit('commentClick')
    },
    Zoom (src) {
      this.$emit('zoom', src)
    },
    redirect () {
      this.$emit('redirect')
    }
  }
}
</script>

<style lang="css">
.squareComponent{
  margin:6px;
  padding: 14px 4px;
  border-radius: 10px;
  box-shadow: 1px 1px 2px #b6c3c1;
  background: #fff;
}
.square-icon{
  margin-left:10px;
  width:30px;
  height:auto;
  border-radius:50%;
}
.my-divider{
  background:#1ABC9C;
  margin:6px auto;
  height:1px;
  border: none;
  width:90%;
}
.square-title{
  font-size:18px;
  font-weight: bold;
  margin:4px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  color:#000
}
.square-content{
  text-align: left;
  margin:0;
  padding:0;
  color:#000;
  letter-spacing:1px;
  font-size: 12px;
}
.square-footer{
  font-size:14px;
  font-weight: light;
  color:'#dfdfd'
}
.square-img{
  width:30%;
  height:100px;
  margin:0;
}
</style>

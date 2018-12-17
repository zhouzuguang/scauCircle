<template >
  <div style="margin-bottom:8px;text-align:left;background:#fff;padding:10px 0;border-radius:2px solid #fff" >
    <mu-row v-if="comment.ybUser" >
      <mu-col span="2" style="text-align:center"> <img :src="comment.ybUser.ybUserHead" alt="头像" style="width:30px;height:auto;border-radius:50%;"></mu-col>
      <mu-col span="6" style="color:#1ABC9C;font-size:12px">
        {{comment.ybUser.ybUserNick}}
        <p class="time" v-if="comment.pubTime">{{comment.pubTime|timeFormat}}</p>
      </mu-col>
      <mu-col span="3" style="text-align:right" v-if="show">{{comment.likeCount|NumberFormat}}</mu-col>
      <mu-col span="1" style=";position:relative;top:-41px;right:38px" v-if="show"  @click="isLike">
        <vue-star color="#1ABC9C" :like="comment.like">
            <mu-icon slot="icon" value=":fa fa fa-thumbs-up"   ></mu-icon>
        </vue-star>
      </mu-col>
      <mu-col v-if="!show" offset="1" span="3">
        <mu-button color="error" @click="del" small style="box-shadow:none">
         删除
       </mu-button>
      </mu-col>
    </mu-row>
      <mu-row style="font-size:12px">
        <mu-col span="8" offset="2">{{comment.content}}</mu-col>
      </mu-row>
      <mu-row>
        <mu-col span="10" offset="1">
          <slot name="message"></slot>
        </mu-col>
      </mu-row>
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
    comment: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        ybUser: {

        }
      }
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
  methods: {
    isLike () {
      this.$emit('isLike')
    },
    del () {
      this.$emit('del')
    }
  }
}
</script>

<style lang="css">
.time{
  margin:0;
  font-size:10px;
}

</style>

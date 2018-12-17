<template lang="html">
  <mu-appbar style="box-shadow:none;width: 100%;height:40px;position:fixed;z-index:1000;background:#1ABC9C;color:#fff">
    <div  slot="left">
      <mu-button icon  @click="back">
        <mu-icon value=":fa fa fa-angle-left"></mu-icon>
      </mu-button>
    </div>
    <div slot="default">
      <p class="myanimate">
        {{ title }}
      </p>
    </div>
  </mu-appbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="css">
.myanimate {
  padding-left: 20px;
  font-size: 16px;
  color: #fff;
  white-space: nowrap;
  display: inline-block;
  animation: 8s wordsLoop linear infinite normal;
  margin:0
}

@keyframes wordsLoop {
    0% {
        transform: translateX(0px);
        -webkit-transform: translateX(0px);
    }
    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}

@-webkit-keyframes wordsLoop {
    0% {
        transform: translateX(0px);
        -webkit-transform: translateX(0px);
    }
    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}
</style>

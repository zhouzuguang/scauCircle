<template>
    <div class="img-mask" v-if="src" @click.stop="close">
      <img :src="src" style="width:300px;height:auto;">
    </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style >
/*遮罩层样式*/
.img-mask {
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
    justify-content:center;
    align-items:Center;
}

</style>

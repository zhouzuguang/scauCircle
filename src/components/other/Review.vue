<template lang="html">
  <div >
    <mu-row ref="review" style="width:100%;padding:0 2px">
      <mu-col span="9" >
         <textarea name="name" style="min-width:100%;height:30px" v-model="content" prop="content" placeholder="您要评论点什么？"></textarea>
      </mu-col>
      <mu-col span="3">
          <mu-button   small color="primary" style="box-shadow:none;height:32px" @click.stop="submit">
            <mu-icon left value=":fa fa fa-edit"></mu-icon>
            评论</mu-button>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    submit () {
      if (this.content) {
        this.$emit('submit', this.content)
      }
    },
    clear () {
      this.content = ''
    }
  }
}
</script>

<style lang="css">
textarea{
  border:1px solid #1ABC9C;
}
textarea:focus{
  outline: none;
  box-shadow: 0 0 2px #1ABC9C;
}
</style>

<template>
  <div class="publish" >
    <my-back title="你要写点什么?"/>
    <mu-form ref="form" :model="validateForm" class="my-form"  v-loading = 'pageLoading' style="padding-top:60px">
     <mu-form-item label="" prop="content"  :rules="contentRules">
       <mu-text-field v-model="validateForm.content" solo prop="content" multi-line :rows="5" placeholder="你想要说点什么"  underline-color="primary" style="height:100px"></mu-text-field>
     </mu-form-item>
     <my-img ref="myImg" @submit="imgSubmit" />
     <mu-form-item  label-position="left" label="栏目" :rules="optionRules" prop="columnId" >
       <mu-select v-model="validateForm.columnId"  prop="columnId">
          <mu-option :label="$item.chineseName" :value="$item.id" v-for="($item,$index) in items" :key="$index"></mu-option>
       </mu-select>
     </mu-form-item>
       <mu-button color="primary" @click="submit" class="my-button"><mu-icon value=":fa fa fa-pen"></mu-icon>&nbsp;&nbsp;提交</mu-button>
   </mu-form>
  </div>
</template>

<script>
import { messageColumnList } from '@/api/column/index'
import { postMessage } from '@/api/message/index'
import { uploadImg } from '@/api/img/index'
import back from '@/components/other/Back.vue'
import img from '@/components/other/Img.vue'
export default {
  components: {
    'my-back': back,
    'my-img': img
  },
  created () {
    const _this = this
    messageColumnList().then(res => {
      _this.items = res.squareColumnList
      _this.validateForm.columnId = _this.items[0].id
    })
  },
  data () {
    return {
      contentRules: [
        { validate: (val) => !!val, message: '不能为空' },
        { validate: (val) => val.length >= 3 && val.length <= 200, message: '内容长度大于3小于200' }
      ],
      optionRules: [
        { validate: (val) => !!val, message: '不能为空' }
      ],
      validateForm: {
        title: '',
        content: '',
        columnId: '',
        imageIdList: []
      },
      items: [],
      pageLoading: false
    }
  },
  methods: {
    /**
     * 发布信息
     */
    submit () {
      if (!this.$store.getters.checkLogin) {
        return ''
      }
      const _this = this
      this.pageLoading = true
      this.$refs.form.validate().then(result => {
        if (result) {
          _this.$refs.myImg.submit()
        }
      })
    },
    /**
     * 图片上传完 再统一上传发布信息
     */
    imgSubmit (files) {
      const _this = this
      let promise = []
      for (let i = 0; i < files.length; i++) {
        let formdata = new FormData()
        formdata.append('image', files[i].file)
        promise.push(uploadImg(formdata, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }))
      }
      Promise.all(promise).then(res => {
        for (let i = 0, length = res.length; i < length; i++) {
          _this.validateForm.imageIdList.push(res[i].image.id)
        }
        postMessage(this.validateForm).then(res => {
          _this.validateForm = {
            title: '',
            content: '',
            columnId: '',
            imageIdList: []
          }
          _this.pageLoading = false
          _this.$toast.message({
            color: '#1ABC9C',
            message: '发布成功'
          })
          setTimeout(() => {
            _this.$router.push('/square')
          }, 500)
        // eslint-disable-next-line handle-callback-err
        }).catch(err => {
          _this.pageLoading = false
        })
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        _this.pageLoading = false
      })
    }
  }

}
</script>

<style >
.publish{
  text-align:left;
  background: #fff;
}
.my-form{
  padding:10px 8px
}
.my-button{
  width:100%;
  margin-bottom:10px
}
textarea{
  padding: 6px;
  margin-bottom: 6px
}
textarea:focus{
  border:1px solid #1ABC9C
}

</style>

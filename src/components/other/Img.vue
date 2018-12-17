<template>
    <div class="vue-uploader">
        <div class="file-list">

            <div v-for="(file, index) of files" class="file-box" :key="index">
                <img :src="file.src" class="file-img">
                <span class="file-remove" @click="remove(index)">x</span>
            </div>

            <div class="file-box">
                <div @click="add" class="add"  v-show="files.length<maxLength">
                    <span>+</span>
                </div>
                <div class="add" v-show="files.length>=maxLength" >
                <span style="font-size:14px">最多{{maxLength}}张</span>
                </div>
            </div>

        </div>
        <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
    </div>
</template>
<script>
export default {
  props: {
    // 最大数量,默认为 9 张
    maxLength: {
      type: Number,
      default: 9
    }
  },
  data () {
    return {
      files: []
    }
  },
  methods: {
    add () {
      this.$refs.file.click()
    },
    remove (index) {
      this.files.splice(index, 1)
    },
    fileChanged () {
      let list = this.$refs.file.files
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          if (this.files.length + 1 > this.maxLength) {
            return false
          }
          const item = {
            file: list[i],
            name: list[i].name,
            size: list[i].size
          }
          this.html5Reader(list[i], item)
          this.files.push(item)
        }
      }
    },
    // 将图片文件转成BASE64格式
    html5Reader (file, item) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.$set(item, 'src', e.target.result)
      }
    },
    isContain (file) {
      return this.files.find((item) => item.name === file.name && item.size === file.size)
    },
    submit () {
      this.$emit('submit', this.files)
    }
  }
}
</script>
<style>
.vue-uploader {
    background: #fff;
}

.vue-uploader .file-list {
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.vue-uploader .file-box {
  position: relative;
  width: 32%;
  height: 100px;
  margin: 2px;
  border: 1px solid #efefef
}

.vue-uploader .file-img {
  width:100%;
  height:100%;
}

.vue-uploader .file-list .file-box .file-remove {
    position: absolute;
    right: 0%;
    top: 0px;
    padding:2px 4px;
    color: white;
    cursor: pointer;
    border-radius: 50%;
    background: rgb(110, 114, 121);
    font-size:8px;
    line-height: 13px;
    display: inline-block;
}

.vue-uploader .file-list .file-item:hover .file-remove {
    display: inline;
}

.vue-uploader .file-box .add,.vue-uploader .file-box .mask{
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    font-size: 30px;
    cursor: pointer;
    border:1px dashed #000;
}

.vue-uploader > input[type="file"] {
    display: none;
}

</style>

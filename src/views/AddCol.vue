<template lang="html">
  <div class="addCol" v-loading="loading">
      <mu-row style="width: 100%;height:40px;position:fixed;z-index:1000;background:#1ABC9C;color:#fff;box-shadow:none">
        <mu-col  span="2">
          <mu-button icon  @click="$router.go(-1)" style="position:relative;color:#fff;top:-4px">
            <mu-icon value=":fa fa fa-angle-left"></mu-icon>
          </mu-button>
        </mu-col>
        <mu-col span="9" style="position:relative;top:8px">
           <input name="name"   prop="content" placeholder="搜索" class="input" v-model="search" />
        </mu-col>
      </mu-row>
    <mu-paper  class="mycontainer" :z-depth="1">
      <p class="title" style="margin-top:40px">广场</p>
      <mu-list>
        <mu-list-item :ripple="false" v-for="($item,$index) in $square" :key="'square-'+$index" >
          <mu-list-item-action ><span class="fontWeight">#</span></mu-list-item-action>
          <mu-list-item-title class="fontWeight">{{$item.chineseName}}</mu-list-item-title>
          <mu-list-item-action>
            <mu-button color="error"  v-if="$item.like" @click="add('message',$item)" >
              取消关注
            </mu-button>
            <mu-button color="primary"   v-else @click="add('message',$item)">
              <mu-icon left value=":fa fa fa-list-alt"></mu-icon>
              关注
            </mu-button>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </mu-paper>
    <mu-paper  class="mycontainer" :z-depth="1">
      <p class="title">主页</p>
      <mu-list>
        <mu-list-item :ripple="false" v-for="($item,$index) in $news" :key="'index-'+$index">
          <mu-list-item-action ><span class="fontWeight">#</span></mu-list-item-action>
          <mu-list-item-title class="fontWeight">{{$item.chineseName | elli }}</mu-list-item-title>
          <mu-list-item-action >
            <mu-button color="error"   v-if="$item.like" @click="add('news',$item)" >
              取消关注
            </mu-button>
            <mu-button color="primary"   v-else @click="add('news',$item)">
              <mu-icon left value=":fa fa fa-list-alt"></mu-icon>
              关注
            </mu-button>
          </mu-list-item-action>

        </mu-list-item>
      </mu-list>
    </mu-paper>
  </div>
</template>

<script>
import { allColumnList, postNewsColumn, postMessageColumn, userColumnList } from '@/api/column'
export default {
  data () {
    return {
      square: [],
      news: [],
      search: '',
      loading: false
    }
  },
  computed: {
    $square () {
      const search = this.search
      if (search) {
        return this.square.filter(item => {
          return item.chineseName.includes(search)
        })
      } else {
        return this.square
      }
    },
    $news () {
      const search = this.search
      if (search) {
        return this.news.filter(item => {
          return item.chineseName.includes(search)
        })
      } else {
        return this.news
      }
    }
  },
  filters: {
    elli (val) {
      if (val.length < 10) {
        return val
      } else {
        val = val.substring(0, 10) + '...'
        return val
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      const _this = this
      this.loading = true
      // 获取所有栏目目录
      allColumnList().then(res => {
        const newsList = res.newsColumnList
        const messageList = res.squareColumnList
        for (let i = 0, length = messageList.length; i < length; i++) {
          messageList[i].shortName = messageList[i].chineseName
          messageList[i].index = i
        }
        for (let i = 0, length = newsList.length; i < length; i++) {
          newsList[i].index = i
        }
        // 获取用户关注目录 比对
        userColumnList().then(res2 => {
          for (let i = 0, length = newsList.length; i < length; i++) {
            newsList[i].like = false
            for (let j = 0, length2 = res2.newsColumnList.length; j < length2; j++) {
              if (newsList[i].id === res2.newsColumnList[j].id) {
                newsList[i].like = true
                break
              }
            }
          }

          for (let i = 0, length = messageList.length; i < length; i++) {
            messageList[i].like = false
            for (let j = 0, length2 = res2.squareColumnList.length; j < length2; j++) {
              if (messageList[i].id === res2.squareColumnList[j].id) {
                messageList[i].like = true
                break
              }
            }
          }

          _this.square = messageList
          _this.news = newsList
          _this.loading = false
        })
      })
    },
    /**
     * 关注栏目
     */
    add (type, item) {
      const _this = this
      const id = item.id
      const index = item.index
      if (type === 'news') {
        postNewsColumn(id).then(res => {
          const tm = _this.news[index]
          tm.like = !tm.like
          _this.$set(_this.news, index, tm)
        })
      } else if (type === 'message') {
        postMessageColumn(id).then(res => {
          const tm = _this.square[index]
          tm.like = !tm.like
          _this.$set(_this.square, index, tm)
        })
      }
    }
  }
}
</script>

<style lang="css">
.addCol{
  background: #fff
}
.title{
  font-size:20px;
  font-weight: bolder;
  margin:0;
}
.mycontainer{
  text-align:left;
  padding:6px 8px;
}
.fontWeight{
  font-weight: bolder;
  font: Arial;
  color:#000;
}
.input{
  -webkit-appearance: none;
  width: 100%;
  height: 30px;
  font-size:13px;
  position: relative;
  top: -3px;
  border: 1px solid #1abc9c;
  outline: none;
  color: #1abc9c;
  padding: 0 4px;
}
.input:focus, .input:active{
  box-shadow: 0px 0px 2px #1abc9c;
}

</style>

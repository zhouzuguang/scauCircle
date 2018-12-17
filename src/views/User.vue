<template>
  <div class="user ">
    <div v-if="user" >
      <mu-paper :z-depth="1" v-if="user && user.ybUser" style="padding-bottom:14px">
        <p style="font-size:20px;font-weight:bold;padding-top:6px">{{ user.ybUser.ybUserNick}}</p>
        <img :src="user.ybUser.ybUserHead" alt=""  style="width:100px;height:auto;border-radius:50%;margin-top:10px">
      </mu-paper>
        <mu-paper :z-depth="1" >
          <mu-list>
            <mu-list-item button @click="redirect('/mypublish')">
              <mu-list-item-action >
                <mu-icon value=":fa fa fa-pen" class="primary" ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>我的发布</mu-list-item-title>
              <mu-list-item-action>
                 <mu-badge :content="''+user.publishCount"  color="primary"></mu-badge>
              </mu-list-item-action>
            </mu-list-item>
            <mu-list-item button @click="redirect('/mycollection')">
              <mu-list-item-action >
                <mu-icon value=":fa fa fa-heart" class="primary"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>我的收藏</mu-list-item-title>
              <mu-list-item-action>
                 <mu-badge :content="''+user.favoriteCount"  color="primary"></mu-badge>
              </mu-list-item-action>
            </mu-list-item>
            <mu-list-item button @click="redirect('/mycomment')">
              <mu-list-item-action>
                <mu-icon value=":fa fa fa-comments" class="primary"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>我的评论</mu-list-item-title>
              <mu-list-item-action>
                 <mu-badge :content="''+user.commentCount"  color="primary"></mu-badge>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </mu-paper>
        <mu-button color="primary" style="width:100%;" @click="logout">退出登陆</mu-button>
    </div>
    <div v-else class="user-login">
      <div style="margin:0 auto;width:200px;padding: 100px 0">
        <img :src="logo" alt="logo">
      </div>
      <div style="padding: 20px 0 100px 0;">
          <mu-button color="primary" style="width:80%" @click="login">
            <img src="http://www.yiban.cn/favicon.ico" alt="易班"/>&nbsp;&nbsp;
            <span style="font-size:20px">易班授权登陆</span>
          </mu-button>

          <!-- <mu-button color="primary" style="width:80%;margin-top:10px" @click="test">
            <span style="font-size:20px">测试登陆</span>
          </mu-button> -->
      </div>
    </div>
    <my-bottom :value='"User"'/>
  </div>
</template>
<script>
import BottomNav from '@/components/other/BottomNav'
import { loginUrl } from '@/api/config'
import { getUserInfo } from '@/api/user/index'
import logo from '@/assets/icon-192x192.png'
export default {
  components: {
    'my-bottom': BottomNav
  },
  data () {
    return {
      logo
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  activated () {
    if (this.user) {
      this.getUserInfo()
    }
  },
  methods: {
    /**
     * 更新用户信息
     */
    getUserInfo () {
      getUserInfo().then(res => {
        const token = this.user.token
        res.token = token
        this.$store.commit('storeUser', res)
      })
    },
    /**
     * 登陆
     */
    login () {
      document.location.href = loginUrl
    },
    /**
     * 测试
     */
    test () {
      const data = {
        commentCount: 7,
        favoriteCount: 2,
        likeCount: 2,
        publishCount: 2,
        token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJleHAiOjE2MTI0NjgzNjgsInVzZXJJZCI6ODM0MTEwMywiaWF0IjoxNTQwNDY4MzY4LCJqdGkiOiJqd3QifQ.1tybJ2CfyT6m_lJQgW7QL7VFWP_1bOc1g71kl2ocrG0',
        ybUser: {
          ybSchoolId: 18006,
          ybSchoolName: '华南农业大学',
          ybSex: '男',
          ybUserHead: 'http://img02.fs.yiban.cn/8341103/avatar/user/200',
          ybUserId: 8341103,
          ybUserName: '天天向上',
          ybUserNick: '天天向上'
        }
      }
      this.$store.commit('storeUser', data)
    },
    redirect (url) {
      this.$router.push(url)
    },
    logout () {
      this.$store.commit('deleteUser')
    }
  }
}
</script>
<style>
  .user {
    background: #fff
  }
</style>

<template>
  <div v-loading="loading"></div>
</template>

<script>
import { login } from '@/api/user/index'
import { redirectUrl } from '@/api/config'
export default {
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.login()
  },
  methods: {
    login () {
      const code = this.$route.query.code
      const url = redirectUrl
      const _this = this
      this.loading = true
      login({ 'code': code, 'redirectUrl': url }).then(res => {
        if (res) {
          _this.$store.commit('storeUser', res)
        }
        _this.loading = false
        _this.$router.push({ name: 'Home' })
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        _this.$router.push({ name: 'User' })
      })
    }
  }
}
</script>

<style>

</style>

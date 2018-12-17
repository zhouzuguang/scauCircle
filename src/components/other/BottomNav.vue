<template>
  <div style="position: fixed;bottom:0;left:0;width:100%">
      <mu-bottom-nav color="primary" :value="value" shift ref="bottonNav">
        <mu-bottom-nav-item value="Home" title="首页" icon=":fa fa fa-home" to="/"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="Square" title="广场" icon=":fa fa fa-list" to="/square"></mu-bottom-nav-item>
        <mu-button fab color="primary" small to="/publish">
          <mu-icon value=":fa fa fa-plus"></mu-icon>
        </mu-button>
        <mu-bottom-nav-item value="Preference" title="关注" icon=":fa fa fa-list-alt" to='/preference'></mu-bottom-nav-item>
        <mu-bottom-nav-item value="User" title="我的" icon=":fa fa fa-user" to="/user"></mu-bottom-nav-item>
      </mu-bottom-nav>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  activated () {
    this.$refs.bottonNav.activeValue = this.value
  }
}
</script>

<style>
/*
 * 改变底部图标大小
 */
.mu-bottom-item-icon {
  font-size: 20px
}
</style>

<template>
  <div id="app">
  <transition name="fade">
    <keep-alive >
      <router-view  v-if="$route.meta.alive" />
    </keep-alive>
  </transition>
  <transition name="fade">
    <router-view  v-if="!$route.meta.alive" />
  </transition>
  </div>
</template>

<style lang="scss">
html,body,div,ul,li,p,a,img{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}

.mainPage{
  padding-bottom: 60px;
}
.primary {
  color: #1ABC9C
}

.fade-enter-active, .fade-leave-active{
  transition:all 1s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.specialHeight {
 height:calc(100% - 110px)
}
.my-publish-list, .my-comment-list{
  height: calc(100% - 55px)
}
.my-collection-list {
  height: calc(100% - 96px)
}
.user-login {
  height: calc(100% - 40px);
  width:100%;
  position: absolute;
  left:0;
  top:0;
  background: #fff
}
</style>

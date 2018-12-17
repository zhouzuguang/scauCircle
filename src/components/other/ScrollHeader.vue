<template>
    <div >
        <header>
            <nav class="scroll-nav" ref="nav">
                <div  v-for="(item,$index) in navItems "
                    :key="$index"
                    @click="navClick($index)"
                    :class="['scroll-nav-item',{'scroll-nav-item-active':$index === index }]"
                    >
                    {{ item.shortName }}
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
export default {
  props: {
    Index: {
      type: Number,
      default: 0
    },
    navItems: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      index: this.Index,
      left: 0
    }
  },
  watch: {
    index (val) {
      this.$emit('update:Index', val)
    }
  },
  methods: {
    /**
     * 点击 导航项目
     */
    navClick ($index) {
      const nav = document.querySelector('.scroll-nav')
      const length = this.navItems.length
      if ($index > 2 || $index < length - 3) {
        nav.scrollLeft = ($index - 2) * 92
      }
      this.index = $index
    },
    /**
     * 带动导航左滑
     */
    swipeLeft () {
      const length = this.navItems.length
      const nav = document.querySelector('.scroll-nav')
      if (this.index < length - 1) {
        this.index++
      }
      if (this.index > 2) {
        nav.scrollLeft += 88
      }
    },
    /**
     * 带动导航右滑
     */
    swipeRight () {
      const length = this.navItems.length
      const nav = document.querySelector('.scroll-nav')
      if (this.index > 0) {
        this.index--
      }
      if (this.index < length - 3) {
        nav.scrollLeft -= 88
      }
      if (this.index === 0) {
        nav.scrollLeft = 0
      }
    }

  },
  activated () {
    this.$refs.nav.scrollLeft = this.left
  },
  deactivated () {
    this.left = this.$refs.nav.scrollLeft
  }
}
</script>

<style>
.scroll-header{
  position: relative;
}
.scroll-nav {
  margin:0;
  padding:0;
  height:40px;
  font-size:20px;
  display: flex;
  width: 100%;
  overflow-x:scroll;
  overflow-y: hidden;
  position: fixed;
  z-index:999;
  background: #fff;
  text-align: center;
}
.scroll-nav::-webkit-scrollbar{
  display: none
}
.scroll-nav-item{
  display: inline-block;
  min-width: 80px;
  padding:0px;
  text-align:center;
  margin:4px 8px 0px 8px;
  word-break: keep-all;
  white-space:nowrap;
  overflow: hidden;
  font-weight: bold;
  box-sizing: border-box;
  transition: all 0.2s linear;
}
.scroll-nav-item:nth-child(1){
  margin-left:2px;
}
.scroll-nav-item-active{
  border-bottom: 2px solid #1ABC9C;
  color:#1ABC9C;
  opacity: 0.7;
}

</style>

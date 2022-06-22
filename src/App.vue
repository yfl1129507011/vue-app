<template>
  <div>
    <Header />
    <!-- 路由组件显示标记 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 派发一个action || 获取商品分类的三级列表数据
    // 放入主组件执行，减少请求
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
</style>

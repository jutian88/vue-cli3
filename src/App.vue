<template>
  <div id="app">
    <div id="nav">
      <headerNav />
      <leftMenu></leftMenu>
      <div class="rightWrap">
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import headerNav from './components/header'
import leftMenu from './components/leftMenu'
export default {
  name: 'app',
  components: { headerNav, leftMenu }
}
</script>

<style lang="stylus">

</style>

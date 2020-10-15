<template>
  <main class="main">
<!--    <left-table class="left-wrap" />-->
    <right-table class="right-wrap" />
  </main>
</template>

<script>
import leftTable from './left-table'
import rightTable from './right-table'
export default {
  components: { leftTable, rightTable },
  data() {
    return {
      list: []
    }
  },
  methods: {}
}
</script>

<style scoped>
.main {
  display: flex;
  flex-wrap: nowrap;
}
.left-wrap,
.right-wrap {
  width: 100%;
}
</style>

<template>
  <div>111</div>
</template>

<script>
  import {api} from '../../api/api'
  api.getLoginUserInfo().then(data=> console.log(data))
  export default {
    name: 'home'
  }
</script>

<style scoped>

</style>
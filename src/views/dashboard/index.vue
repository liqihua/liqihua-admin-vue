<template>
  <div class="dashboard-container">
    <div class="dashboard-text">username:{{ userInfo.username }}</div>
    <div class="dashboard-text">realName:{{ userInfo.realName }}</div>
    <div class="dashboard-text">nickname:{{ userInfo.nickname }}</div>
    <div class="dashboard-text">mobile:{{ userInfo.mobile }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

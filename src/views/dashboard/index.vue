<template>
  <div class="dashboard-container">
    <div class="dashboard-text">username:{{ user.username }}</div>
    <div class="dashboard-text">realName:{{ user.realName }}</div>
    <div class="dashboard-text">nickname:{{ user.nickname }}</div>
    <div class="dashboard-text">mobile:{{ user.mobile }}</div>
    <div class="dashboard-text">avatar:{{ user.avatar }}</div>
    <!--<div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getUser } from '@/utils/auth.js'

export default {
  name: 'home',
  data() {
    return {
      user: null
    }
  },
  created() {
    this.user = getUser()
  }
  /*computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }*/
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

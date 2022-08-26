<template>
  <div class="navbar">
    <el-dropdown size="mini" class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <div class="name__container">
          <img src="../../assets/head.png" class="user-avatar" />{{
            userInfo.userName
          }}
        </div>
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item @click.native="goUser">个人信息</el-dropdown-item>
        <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import store from '@/store'
import { logOut } from '@/utils'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    goUser() {
      let title = '个人信息'
      let url = '/#/userInfo'
      let code ='UserInfo'
     store.state.activeTag = { title, url, code }
      let codes = store.state.tags.map((ele) => ele.code)
      if (!codes.includes(code)) {
        store.state.tags.push({
          title,
          code,
          url
        })
      }
      this.$router.push('/userInfo')
    },
    logout() {
      logOut()
    }
  },
  computed: {
    state() {
      return store.state
    }
  },
  mounted() {
    let userInfo = this.state.userInfo || {}
    if (!userInfo.userName) {
      userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    }
    this.userInfo = userInfo
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 30px;
  margin-right: 10px;
  .avatar-wrapper {
    display: flex;
    align-items: center;
    color: #fff;
    cursor: pointer;
    .name__container {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #FFF;
      img {
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }
  }
}
.user-dropdown{
    text-align: center;
  }
</style>

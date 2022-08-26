<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
  box-sizing: border-box;
}
body {
  font-size: 12px;
  color: #4a4a4a;
  height: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: 'Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif';
  margin: 0;
  background-color: #f5f7f9;
}
#app {
  height: 100%;
}
.el-menu.el-menu--popup.el-menu--popup-right-start {
  li {
    font-size: 12px;
    height: 24px;
    line-height: 24px;
  }
}
</style>

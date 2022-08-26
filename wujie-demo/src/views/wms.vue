<template>
  <!--单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由 -->
  <WujieVue width="100%" height="100%" :name="name" :url="url" :sync="true" :beforeLoad="beforeLoad"
  :beforeMount="beforeMount"
  :afterMount="afterMount"
></WujieVue>
</template>

<script>
import microApp from "../micro-app"

export default {
  data() {
    return {
      name: '',
      url: '',
    };
  },
  created () {
    this.getUrl()
  },
  methods: {
    getUrl () {
      let source = microApp.find(item => item.name === 'wms')
      let {name, url} = source
      this.name = name
      this.url = url + (this.$route.params.path ? `#/${this.$route.params.path}` : "")
    },
    jump(name) {
      this.$router.push({ name });
    },
    beforeLoad () {
      debugger
    },
    beforeMount () {
      debugger
    },
    afterMount () {
      debugger
    }
  },
};
</script>

<style lang="scss" scoped></style>
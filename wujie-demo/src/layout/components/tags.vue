<template>
  <div class="tags-cnt">
    <ul>
      <li
        v-for="(item, index) in state.tags"
        @click="goSub(item)"
        @contextmenu.prevent="openMenu(item, $event)"
        :class="{ active: item.code === state.activeTag.code }"
      >
        {{ item.title }}
        <i
          class="el-icon-close"
          v-show="state.tags.length > 1 || index !== 0"
          @click.stop="close(item)"
        ></i>
      </li>
    </ul>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="copySelectedTag">复制</li>
      <li @click="closeSelectedTag">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭全部</li>
    </ul>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data() {
    return {
      left: '',
      top: '',
      visible: false,
      selectedTag: ''
    }
  },
  computed: {
    state() {
      return store.state
    }
  },
  watch: {
    visible(value) {
			if (value) {
				document.body.addEventListener('click', this.closeMenu)
			} else {
				document.body.removeEventListener('click', this.closeMenu)
			}
		}
  },
  methods: {
    goSub(item) {
      this.state.activeTag = item
      this.$router.push(item.url)
    },
    close(item) {
      this.selectedTag = item
      this.closeSelectedTag()
    },
    openMenu(tag, e) {
      this.selectedTag = tag
      this.left = e.clientX
      this.top = e.clientY
      this.visible = true
    },
    copySelectedTag() {
      let { url } = this.selectedTag
      let orign = location.origin
      window.open(`${orign}${url}`, '_black')
    },
    closeAllTags () {
      let tags = [{title:'首页', code: 'Dashboard', url: '/#/home'}]
      let activeTag = {title:'首页', code: 'Dashboard', url: '/#/home'}
      this.state.activeTag = activeTag
      this.state.tags = tags
      return this.$oputer.push('/home')
    },
    closeSelectedTag() {
      let len =  this.state.tags.length
      if (len < 2) {
        return this.closeAllTags()
      }
      let tags = this.state.tags.filter(
        (item) => item.code !== this.selectedTag.code
      )
      this.state.tags = tags
      // 关闭是当前
      if (this.selectedTag.code === this.state.activeTag.code) {
        let active = tags.slice(-1)[0]
        this.state.activeTag = active
      }
      this.$oputer.push(this.state.activeTag.url)
    },
    closeOthersTags() {
      this.activeTag = this.selectedTag
      this.tags = [this.selectedTag]
      this.state.activeTag = this.activeTag
      this.state.tags = this.tags
      this.$oputer.push(this.state.activeTag.url)
    },
    closeMenu() {
			this.visible = false
		},
  },
}
</script>

<style lang="scss" scoped>
.tags-cnt {
  width: 100%;
  overflow: auto;
  ul {
    display: flex;
    padding-top: 4px;
    li {
      list-style: none;
      color: #fff;
      height: 26px;
      line-height: 26px;
      cursor: pointer;
      margin-left: 15px;
      padding: 0 10px;
      flex-shrink: 0;
      i {
        width: 16px;
        height: 16px;
        line-height: 16px;
        border-radius: 50%;
        text-align: center;
      }
      i:hover {
        background-color: #b4bccc;
        color: #fff;
      }
      &.active {
        background-color: #f5f7f9;
        color: #333;
      }
    }
  }
  .contextmenu{
    display: flex;
    flex-direction: column;
    margin: 0;
    background: #fff;
    position: fixed;
    z-index: 3;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    -webkit-box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);
    box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);
    width: 80px;
    li{
      color: #333;
      cursor: pointer;
      margin: 0;
      &:hover{
        background-color: #eee;
      }
    }
  }
}
</style>

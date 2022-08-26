<template>
  <div class="menu-box" v-loading="loading">
    <div wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="state.activeTag.code"
        mode="vertical"
        :collapse="state.isCollapse"
        :collapse-transition="false"
      >
        <div v-for="(item, index) in allMenu" :key="index">
          <el-submenu v-if="item.subResource.length" :index="item.resourceCode">
            <template slot="title">
              <i :class="icons[item.resourceCode]"></i>
              <span>{{ item.resourceName }}</span>
            </template>
            <el-menu-item
              v-for="(ele, i) in item.subResource"
              :index="ele.resourceCode"
              :key="i"
              @click="goSub(ele)"
              >{{ ele.resourceName }}</el-menu-item
            >
          </el-submenu>
          <el-menu-item :index="item.resourceCode" v-else @click="goSub(item)">
            <i :class="icons[item.resourceCode]"></i>
            <span>{{ item.resourceName }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { getMenu } from '@/api'
export default {
  data() {
    return {
      loading: false,
      token: '',
      icons: {
        Dashboard: 'el-icon-dashboard',
        Plan: 'el-icon-plan',
        ManagementDuty: 'el-icon-duty-manager',
        SeaShipping: 'el-icon-sea-shipping',
        AirTransport: 'el-icon-air-transport',
        Railway: 'el-icon-railway',
        CustomsDeclaration: 'el-icon-sea-shipping',
        Take: 'el-icon-take',
        Put: 'el-icon-put',
        Finance: 'el-icon-finance',
        WorkException: 'el-icon-work-exception',
        WarehouseIndex: 'el-icon-warehouse-index',
        SwCms: 'el-icon-swcms',
        CRM: 'el-icon-crm',
        AuditIndex: 'el-icon-audit-index',
        Cosco: 'el-icon-online-rob-tank',
        BKG: 'el-icon-predict-manage',
        CompanyResource: 'el-icon-company-source',
        Permission: 'el-icon-permission',
        BaseData: 'el-icon-data-base',
        Wms: 'el-icon-wms'
      },
      allMenu: [],
      activeIndex: 'Dashboard'
    }
  },
  created() {
    this.token = this.state.token || localStorage.getItem('token')
    this.getAllMenu()
  },
  computed: {
    state() {
      return store.state
    }
  },
  methods: {
    goSub(item) {
      let { resourceName: title, resourceUrl: url, resourceCode: code, sysCode } = item
      this.state.activeTag = { title, url, code }
      let codes = this.state.tags.map((ele) => ele.code)
      if (!codes.includes(code)) {
        this.state.tags.push({
          title,
          code,
          url
        })
      }
      this.$router.push('/wms/#/wms/basic/yard')
    },
    getAllMenu() {
      this.loading = true
      getMenu({ token: this.token, sysCode: 'wms' })
        .then((res) => {
          if (res.code === 0) {
            let allMenu = res.data
            allMenu.unshift({
              resourceCode: 'Dashboard',
              resourceName: '首页',
              resourceUrl: '/home',
              subResource: []
            })
            this.allMenu = allMenu
            localStorage.setItem('allMenu', JSON.stringify(allMenu))
            let tags = [{ title: '首页', code: 'Dashboard', url: '/home' }]
            let activeTag = { title: '首页', code: 'Dashboard', url: '/home' }
            this.$store.dispatch('setGlobalState', {
              allMenu,
              activeTag,
              tags
            })
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/icon.css';
.menu-box {
  height: 100%;
  transition: width 0.28s;
  width: 144px;
  background-color: #fff;
  position: relative;
  :deep(.el-menu) {
    .el-submenu__title,
    .el-menu-item {
      font-size: 12px;
      height: 32px;
      line-height: 32px;
      margin: 0 -10px;
      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .el-menu-item {
      padding: 0;
      min-width: none;
    }
    i {
      width: 14px;
      height: 14px;
      font-size: 14px;
      margin-right: 4px;
      margin-left: -2px;
      &.el-submenu__icon-arrow {
        font-size: 12px;
      }
    }
    .el-scrollbar {
      height: 100%;
    }
    .is-horizontal {
      display: none;
    }
  }
}
</style>

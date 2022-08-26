import store from "@/store"
import router from '@/router'
export function getToken() {
  let token = store.state.token
  if (!token) {
    token = localStorage.getItem('token')
  }
  return token
}

export function validUsername(str) {
	const valid_map = ['admin', 'editor', 'sunny']
	return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

export function logOut () {
  localStorage.removeItem('token')
  Object.assign(store.state, {
    userInfo: {},
    token: '',
    expireTimes: 30 * 60 * 1000,   // token有效期30分钟
    allMenu: [],
    tags: [{title:'首页', code: 'Dashboard', url: '/#/home'}],
    activeTag: {title:'首页', code: 'Dashboard', url: '/#/home'},
    isCollapse: false,
    dictAll: []
  })
  router.push('/login')
}

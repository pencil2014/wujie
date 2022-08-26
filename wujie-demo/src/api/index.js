import request from './request.js'

export function login(data) {
  return request({
    url: '/base/common/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/base/webapi/sysUser/info',
    method: 'post',
    data: {} // { token }
  })
}

export function logout(data) {
  return request({
    url: '/base/common/logout',
    method: 'post',
    data
  })
}

export function getMenu(data) {
  return request({
    url: '/base/webapi/menu/allMenuCheckAuthV2',
    method: 'post',
    data
  })
}

//批量已读
export function noticeWebsiteRead(data) {
  return request({
    url: '/msg/notice/website/read',
    method: 'post',
    data
  })
}
//批量删除
export function noticeWebsiteDelete(data) {
  return request({
    url: '/msg/notice/website/delete',
    method: 'post',
    data
  })
}
export function noticeWebsiteList(data) {
  return request({
    url: '/msg/notice/website/list',
    method: 'post',
    data
  })
}

export function noticeMsgUpgrade(data) {
  return request({
    url: '/msg/notice/website/msgUpgrade',
    method: 'post',
    data
  })
}

export function getDictList(data) {
	return request({
		url: '/base/webapi/dict/list',
		method: 'post',
		data
	})
}
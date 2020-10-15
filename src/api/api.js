'use strict'
import {post} from './http'
import { getEnv } from '../util/util'
export const baseUrl = '/dcdm-admin'


export const logout = () => {
  const env = getEnv()
  window.location.replace(
    `http://datacloud${env}.cnsuning.com/bigdata-portal-web/console.html#/portal`
  )
}

export const api = {
  // 获取登录的用户信息
  getLoginUserInfo: params => post( baseUrl +'/user/getLoginUserInfo.htm', params),
  // 退出系统
  getLogOut: params => post( baseUrl +'/user/getLogOut.htm', params),
  // 获取用户信息列表
  getUserList: params => post( baseUrl +'/user/getUserList.htm', params),

  // 概览：获取数据源新增和授权列表信息
  getDataSourceAddAndAuthorized: params => post( baseUrl +'/dataResource/getDataSourceAddAndAuthorized.htm', params),
  // 概览：获取数据源的概览列表信息
  getDataSourceOverview: params => post( baseUrl +'/dataResource/getDataSourceOverview.htm', params),

  // 获取全部的数据源后台展示列表
  searchDataResList: params => post( baseUrl +'/dataResource/searchDataResList.htm', params),
  // 查询数据源名是否存在
  getDatasourceName: params => post( baseUrl +'/dataResource/getDatasourceName.htm', params),
  // 根据数据源信息创建、修改数据源
  submitDataResource: params => post( baseUrl +'/dataResource/submitDataResource.htm', params),
  // 根据数据源Id获取信息
  getDataResourceDetail: params => post( baseUrl +'/dataResource/getDataResourceDetail.htm', params),
  // 根据输入参数模糊匹配门户系统列表信息
  getSystemInfo: params => post( baseUrl +'/system/getSystemInfoByFuzzyMatch.htm', params),
  // 根据数据源Ids判断是否有数据源集引用
  deleteDataResourcesPre: params => post( baseUrl +'/dataResource/deleteDataResourcesPre.htm', params),
  // 根据数据源Ids删除数据源
  deleteDataResources: params => post( baseUrl +'/dataResource/deleteDataResources.htm', params),
  // 下载导入数据源文件模板信息
  downLoadDateSourceTemplate: params => post( baseUrl +'/dataResource/downLoadDateSourceTemplate.htm', params, fileConfig),
  // 导入文件创建数据源信息
  uploadDateSource: params => post( baseUrl +'/dataResource/uploadDateSource.htm', params, fileConfig),

  // 根据数据源Id获取已授权的系统列表信息
  getAuthoritySystems: params => post( baseUrl +'/dataResource/getAuthoritySystems.htm', params),
  // 根据系统Id和数据源Id删除授权信息
  deleteDataResourceAuthority: params =>post( baseUrl +'/dataResource/deleteDataResourceAuthority.htm', params),
  // 给系统授权数据源的访问权限
  addDataResourceAuthority: params => post( baseUrl +'/dataResource/addDataResourceAuthority.htm', params),
  // 根据输入参数获取已注册的系统列表信息
  getEnableSystemByMatch: params => post( baseUrl +'/dataResource/getEnableSystemByMatch.htm', params),

  // 数据源的引用列表信息
  getJobInfoList: params => post( baseUrl +'/dataResource/getJobInfoListByDataSourceId.htm', params),
  // 下载数据源引用列表
  downLoadJobList: params => post( baseUrl +'/dataResource/downLoadJobListByDataSourceId.htm', params, fileConfig),

  // 根据数据源的信息测试数据源的连通性
  testWorkConnectivity: params => post( baseUrl +'/dataResource/testWorkConnectivity.htm', params, testConnectConfig),

  // 根据数据源Id测试数据源的连通性
  workConnectivityFront: params => post( baseUrl +'/dataResource/workConnectivityFront.htm', params, testConnectConfig),
  // 下载IDE的worker机器的IP列表
  downWorkConnectivity: params => post( baseUrl +'/dataResource/downWorkConnectivity.htm', params, fileConfig)
}

export function receiveFile(response) {
  const disposition = response.headers['content-disposition']
  const type = response.headers['content-type']
  let filename = 'download'
  if (disposition && disposition.indexOf('attachment') !== -1) {
    const filenameRegex = /file[nN]ame[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    const matches = filenameRegex.exec(disposition)
    if (matches != null && matches[1])
      filename = decodeURIComponent(matches[1].replace(/['"]/g, ''))
  }
  downloadFile(response.data, filename, type)
}

function downloadFile(data, filename, type) {
  var blob =
    typeof File === 'function'
      ? new File([data], filename, { type: type })
      : new Blob([data], { type: type })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were revoked
    // by closing the blob for which they were created. These URLs will
    // no longer resolve as the data backing the URL has been freed."
    window.navigator.msSaveBlob(blob, filename)
  } else {
    var URL = window.URL || window.webkitURL
    var downloadUrl = URL.createObjectURL(blob)

    if (filename) {
      // use HTML5 a[download] attribute to specify filename
      var a = document.createElement('a')
      // safari doesn't support this yet
      if (typeof a.download === 'undefined') {
        window.location = downloadUrl
      } else {
        a.href = downloadUrl
        a.download = filename
        document.body.appendChild(a)
        a.click()
      }
    } else {
      window.location = downloadUrl
    }

    setTimeout(function() {
      URL.revokeObjectURL(downloadUrl)
    }, 100) // cleanup
  }
}
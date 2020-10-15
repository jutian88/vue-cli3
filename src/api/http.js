/**
 * HTTP数据通信模块
 */

import 'whatwg-fetch'
import qs from 'qs'
/**
 * 接口调用服务
 * @param {String} url 接口API（必填）
 * @param {Object} options 请求参数（选填）{headers, body, query, ...options}
 * @return {Object} Promise
 * @throws {Error}
 */
const callService = (url, options = {}) => {
  return window.fetch(...mutate(url, options))
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      throw error
    })
}

const callDocService = (url, options = {}) => {
  return window.fetch(...mutate(url, options))
    .then(checkStatus)
    .then(parseBlob)
    .catch(error => {
      throw error
    })
}

// 缺省请求头
const defaultHeaders = {
  // 'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded', // application/x-www-form-urlencoded
  'X-Requested-With': 'XMLHttpRequest'
}
// 请求参数加工
function mutate (url, { headers, body, query, ...options }) {
  headers = { ...defaultHeaders, ...headers }
  options.headers = headers

  if (body) {
    if (typeof body === 'object') {
      body = JSON.stringify(body)
    }
    options.body = body
  }

  if (query) {
    if (typeof query === 'object') {
      query = qs.stringify(query || {}, { indices: false })
    }
    url += (url.indexOf('?') !== -1) ? '&' : '?'
    url += query
  }

  options.credentials = 'include' // omit,same-origin,include
  options.mode = 'same-origin' // "same-origin", "cors", "no-cors", "navigate", or "websocket"

  return [url, options]
}

function checkStatus (response) {
  if (response.headers.login_state && response.headers.login_state === 'logout') {
    logout()
    return
  }
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
}

// 请求 json
function parseJSON (response) {
  return response.json()
}

// 请求 文档
function parseBlob (response) {
  return response.blob()
}

// 请求结果验证
function httpResultProxy (resultPromise) {
  // console.log(resultPromise);
  return new Promise((resolve, reject) => {
    resultPromise
      .then(res => {
        if (res) {
          if (res.success) {
            resolve(res.result)
          } else {
            reject(new Error(res.errorMessage))
          }
        } else {
          reject(new Error('服务器返回数据异常'))
        }
      })
  })
}

const request = (method , url, params, options = {}) => {
  options.method = method  // 'GET' || 'POST'
  options.body = params
  let promise = callService(url, options)
  return httpResultProxy(promise)
}

export const get = (url, params, options) => request('GET', url, params, options)
export const post = (url, params, options) => request('POST', url, params, options)
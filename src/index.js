/**
 * 基于Promise封装的jsonp请求工具
 */

import 'babel-polyfill'
import options from './options'
import {
  joinParams
} from './utils/param'
import {
  deepMerge,
  type
} from './utils/object'

export default jsonp

function jsonp({url, data, opts = {}}) {

  // 传入的选项与默认选项合并
  opts = deepMerge(options, opts)

  // 确定jsonp回调名称
  let jsonpCallbackName = type(opts.callbackName) === 'function' ?
    opts.callbackName() :
    opts.callbackName

  // 拼接url与参数
  url += url.indexOf('?') < 0 ? '?' : '&'
  url += joinParams(data, {
    [opts.callbackParamKey]: jsonpCallbackName
  })

  return new Promise((resolve, reject) => {
    // 注册全局回调函数
    const oldFn = window[jsonpCallbackName]
    window[jsonpCallbackName] = res => {
      resolve(res)
    }
    // 超时定时器
    let timeoutTimerID
    // 创建jsonp请求
    createJsonpScript(url)
      .catch(e => {
        reject(e)
      })
      .finally(() => {
        clearTimeout(timeoutTimerID)
        if (oldFn) window[jsonpCallbackName] = oldFn
      })
    timeoutTimerID = setTimeout(() => {
      reject('Jsonp request timeout')
    }, opts.timeout)
  })
}

/**
 * 创建jsonp script
 * 
 * @param {String} url 
 */
export function createJsonpScript(url) {
  const headEle = document.head
  const scriptEle = document.createElement('script')
  scriptEle.src = url
  scriptEle.async = true
  return new Promise((resolve, reject) => {
    scriptEle.onload = e => {
      resolve(e)
    }
    scriptEle.onerror = e => {
      console.log(e)
      reject(e)
    }
    headEle.insertBefore(scriptEle, headEle.children[0])
  }).finally(() => {
    headEle.removeChild(scriptEle)
  })
}
/**
 * 请求选项对象
 */
export default {
  cache: false, // 是否允许GET缓存，如果为false会在请求后加入随机数防止缓存
  callbackName: callbackNameGenerator('s_jsonp'), // callback name
  callbackParamKey: 'callback',
  timeout: 10000
}

function callbackNameGenerator(prefix) {
  let id = 1
  return () => {
    const timestamp = +new Date()
    return prefix + `_${timestamp}_${id++}`
  }
}
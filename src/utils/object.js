/**
 * 深度合并对象
 * 这里是一个简单的实现，不对Date、Regexp、DOM元素等对象进行处理
 * 
 * @param {Object} originObj 
 * @param {Object} targetObj 
 */
export function deepMerge(originObj, targetObj) {
  for (let k in targetObj) {
    let v = targetObj[k]
    switch (type(v)) {
      case 'object':
        originObj[k] = {}
        deepMerge(originObj[k], v)
        break
      case 'array':
        originObj[k] = []
        deepMerge(originObj[k], v)
        break
      default:
        originObj[k] = v
    }
  }
  return originObj
}

/**
 * 检查变量类型
 * 
 * @param {any} v 
 */
export function type(v) {
  const s = Object.prototype.toString.call(v)
  return s.split(' ')[1].slice(0, -1).toLowerCase()
}
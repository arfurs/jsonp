import { type } from './object'

/**
 * 格式化参数对象
 * 
 * @param {Object} paramObj 
 */
export function formatParams(paramObj) {
  const paramType = type(paramObj)
  if (paramType === 'object') {
    return Object.keys(paramObj)
      .map(key => {
        key = encodeURIComponent(key)
        let val = paramObj[key] != null ? encodeURIComponent(paramObj[key]) : ''
        return `${key}=${val}`
      })
      .join('&')
  } else if (paramType === 'array') {
    return paramObj
      .map((val, key) => {
        key = encodeURIComponent(key)
        val = val != null ? encodeURIComponent(val) : ''
        return `${key}=${val}` 
      })
      .join('&')
  } else {
    throw new Error('参数必须为Object、Array类型')
  }
}

/**
 * 拼接参数
 * 
 * @param {any} params 
 */
export function joinParams(...params) {
  let paramsArr = params.map(param => {
    const paramType = type(param)
    switch (paramType) {
      case 'array':
      case 'object':
        return formatParams(param)
        break
      case 'string':
        if (! validParams(param)) {
          throw new Error(param + ' 是不合理的')
        }
        return param
        break
      default:
        throw new Error('拼接的参数类型必须为Object、Array、String类型')
    }
  })
  return paramsArr.filter(Boolean).join('&')
}

/**
 * 简单检测URL参数有效性
 * 
 * @param {String} params 
 */
export function validParams(params) {
  const paramsType = type(params)
  if (paramsType !== 'string') {
    return false
  }
  try {
    params.split('&').map(item => {
      const [key, val] = item.split('=')
      if (!key) throw new Error
    })
  } catch (err) {
    return false
  }
  return params
}
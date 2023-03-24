export function getType(obj: any): String {
  const [, type] = toString.apply(obj).match(/^\[object (\w*)\]$/) || []
  return type
}

export function isObject(obj: any): Boolean {
  return obj && getType(obj) === 'Object'
}

export function isArray(obj: any): Boolean {
  return obj && getType(obj) === 'Array'
}

export function isString(obj: any): Boolean {
  return obj && getType(obj) === 'String'
}

export function isNumber(obj: any): Boolean {
  return obj && getType(obj) === 'Number'
}

export function isFunction(obj: any): Boolean {
  return obj && getType(obj) === 'Function'
}

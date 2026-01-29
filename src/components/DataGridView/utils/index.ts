// VTable 相关工具函数
export * from './vtable-builder'
export * from './style-utils'

export function copy<T extends object>(obj: T) {
  if (!obj) return obj
  return JSON.parse(JSON.stringify(obj))
}

import type { VTable } from "@visactor/vue-vtable"
import type { RowInitializer, RowInitializerUtils } from '../types/dataGridView'
import dayjs from 'dayjs'
import type { ComputedRef } from "vue"

export interface DataGridViewExposeOptions {
  table: ComputedRef<VTable.ListTable | undefined> | undefined
  rowInitializer?: RowInitializer
}

function copy<T extends object>(obj: T) {
  if (!obj) return obj
  return JSON.parse(JSON.stringify(obj))
}

export class DataGridViewExpose {
  table: VTable.ListTable | undefined
  rowInitializer: RowInitializer | undefined

  constructor(options: DataGridViewExposeOptions) {
    this.table = options.table as unknown as VTable.ListTable
    this.rowInitializer = options.rowInitializer
  }

  getTable() {
    return this.table
  }

  getTableData() {
    const table = this.getTable()
    // 过滤后的全部数据
    const visibleData = copy(table?.records || [])
    // 全量数据
    const fullData = copy(table?.dataSource.dataSourceObj.records || [])

    return {
      visibleData,
      fullData
    }
  }

  addRow<T extends object>(rowOrRows: T | T[], index?: number) {
    const table = this.getTable()
    if (!table) throw new Error('table is not ready')
    const newRecords = rowOrRows instanceof Array ? rowOrRows : [rowOrRows]
    const utils = this.getUtils()
    const initializer = this.rowInitializer || ((row: T, _utils: RowInitializerUtils) => row);

    for (let record of newRecords) {
      const row = initializer(record, utils)
      table.addRecord(row, index)
    }
  }

  removeRow<T extends object>(recordIndexs: number[] | number[][] | T[]) {
    if (!this.table) throw new Error('table is not ready')

    let deleteIndexs: number[] | number[][] = []
    // 目前使用行数据只兼容删除第一层
    if (recordIndexs && typeof recordIndexs[0] === 'object') {
      const visibleData = this.getTableData().visibleData
      recordIndexs.forEach((record, i) => {
        visibleData.some((v, i) => {
          if (v.__row_key__ === record.__row_key__) {
            deleteIndexs.push(i)
            return true
          }
        })
      })
    } else {
      deleteIndexs = recordIndexs as number[] | number[][]
    }

    this.table.deleteRecords(deleteIndexs)
  }

  getUtils() {
    const utils = {
      getMaxByField: <T>(field: keyof T) => {
        const { visibleData } = this.getTableData()
        const max = visibleData.reduce((prev, next) => {
          if (prev < Number(next[field])) return Number(next[field])
          return prev
        }, 0)
        return max
      },
      now: dayjs
    }
    return utils
  }
}

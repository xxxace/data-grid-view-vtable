import type { VTable } from "@visactor/vue-vtable"
import type { DataGridViewProps, RowInitializer, RowInitializerUtils } from '../types/dataGridView'
import dayjs from 'dayjs'
import type { ComputedRef } from "vue"
import { ModuleBinder } from "../utils/ModuleBinder"
import { DataManagerModule, AccessorModule, MutatorModule } from "../modules"
import { copy } from "../utils"
import { DATA_GRID_VIEW_CHECKBOX_FIELD, DATA_GRID_VIEW_RADIO_FIELD } from "../constant"


export interface DataGridViewDecoratorOptions {
  table: ComputedRef<VTable.ListTable | undefined> | undefined
  rowInitializer?: RowInitializer
  rowKeyField?: string
  columns: VTable.ColumnsDefine
}

class DataGridViewDecorator extends ModuleBinder {
  table: VTable.ListTable | undefined
  rowInitializer: RowInitializer | undefined
  rowKeyField: string | undefined
  columns: VTable.ColumnsDefine

  constructor(options: DataGridViewDecoratorOptions) {
    super()
    this.table = options.table as unknown as VTable.ListTable
    this.rowInitializer = options.rowInitializer
    this.rowKeyField = options?.rowKeyField
    this.columns = options.columns
    this.bindModules()
  }

  getTable() {
    return this.table
  }

  getVisibleData() {
    console.log(this.table!.records)
    // this.table!.records[0].__row_key__ = 'xxx'
    return copy(this.table?.records || [])
  }

  getFullData() {
    return copy(this.table?.dataSource.dataSourceObj.records || [])
  }

  getTableData() {
    return {
      // 过滤后的全部数据
      visibleData: this.getVisibleData(),
      // 全量数据
      fullData: this.getFullData()
    }
  }

  loadData(data: any[]) {
    this.modules.dataManager!.loadData(data)
    return this.modules.dataManager!.cacheData
  }

  addRow<T extends object>(rowOrRows: T | T[], index?: number) {
    const table = this.getTable()
    if (!table) throw new Error('table is not ready')
    const newRecords = rowOrRows instanceof Array ? rowOrRows : [rowOrRows]
    const utils = this.getUtils()
    const initializer = this.rowInitializer || ((row: T, _utils: RowInitializerUtils) => row);

    for (let record of newRecords) {
      const copyRecord = copy(record)
      if (!this.rowKeyField) this.modules.dataManager?.setRowid(copyRecord)
      const row = initializer(copyRecord, utils)
      table.addRecord(row, index)
    }
  }

  removeRow<T extends object>(recordIndexs: number[] | number[][] | T[]) {
    if (!this.table) throw new Error('table is not ready')

    let deleteIndexs: number[] | number[][] = []
    // 目前使用行数据只兼容删除第一层
    if (recordIndexs && typeof recordIndexs[0] === 'object') {
      const visibleData = this.getTableData().visibleData
      // 优化：构建row_key到索引的映射表，减少重复查找
      const rowKeyMap = new Map<string, number>()
      visibleData.forEach((row, index) => {
        if (row.__row_key__) {
          rowKeyMap.set(row.__row_key__, index)
        }
      })

      // 利用映射表快速查找索引
      recordIndexs.forEach((record: any) => {
        const index = rowKeyMap.get(record.__row_key__)
        if (index !== undefined) {
          deleteIndexs.push(index as any)
        }
      })
    } else {
      deleteIndexs = recordIndexs as number[] | number[][]
    }
    // console.log(deleteIndexs)
    this.table.deleteRecords(deleteIndexs)
    // unsafe hack！！！
    this.table.setRecords(this.getTableData().fullData)
  }

  getUtils() {
    const utils = {
      getMaxByField: <T>(field: keyof T) => {
        const visibleData = this.getVisibleData()
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

  filter(filterFunc: VTable.TYPES.FilterFuncRule['filterFunc']) {
    this.table?.updateFilterRules([{ filterFunc }])
  }
  clearFilterRules() {
    this.table?.updateFilterRules([])
  }

  updateRecords() { }

  changeCellValue() { }

  changeCellValues() { }

  getAggregateValuesByField() { }

  getCheckboxRecords<T extends object>(isFull?: boolean) {
    const getCheckboxStateStart = window.performance.now()
    const records = this.table?.getCheckboxState(DATA_GRID_VIEW_CHECKBOX_FIELD)
    console.log('getCheckboxState', window.performance.now() - getCheckboxStateStart)

    const dataSourceStart = window.performance.now()
    const dataSource = isFull ? this.getFullData() : this.getVisibleData()
    console.log('getDataSource', window.performance.now() - dataSourceStart)

    const checkedRecords: T[] = []

    records?.forEach((isChecked, i) => {
      if (isChecked) {
        const row = dataSource[i]
        row && checkedRecords.push(row)
      }
    })
    return checkedRecords
  }

  getRadioRecords<T extends object>(isFull?: boolean) {
    const records = this.table?.getCheckboxState(DATA_GRID_VIEW_RADIO_FIELD)
    const tableData = this.getTableData()
    const dataSource = isFull ? tableData.fullData : tableData.visibleData
    let checkedRecord: T | null = null

    records?.some((isChecked, i) => {
      if (isChecked) {
        const row = dataSource[i] as T
        if (row) {
          checkedRecord = row
        }
        return true
      }
    })

    return checkedRecord as T | null
  }
}

DataGridViewDecorator.registerModule(DataManagerModule)
DataGridViewDecorator.registerModule(AccessorModule)
DataGridViewDecorator.registerModule(MutatorModule)

export { DataGridViewDecorator }

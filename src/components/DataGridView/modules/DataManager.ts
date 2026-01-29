import Module from './Module'
import { copy } from '../utils'

const DEFAULT_ROW_KEY_FIELD = '__row_key__'

export class DataManagerModule extends Module {
  static name = 'dataManager'
  static count = 0
  // 唯一索引字段，默认 '__row_key__'
  rowKeyField: string = DEFAULT_ROW_KEY_FIELD
  // 源数据
  dataSource: any[] = []
  // 缓存数据，用于删除操作
  cacheData: any[] = []

  loadData(data: any[]) {
    this.dataSource = data
    this.cacheData = this.processData(data)
  }

  processData(data: any[]) {
    const dataSource = copy(data)

    if (this.rowKeyField === DEFAULT_ROW_KEY_FIELD) {
      dataSource.forEach((item, index) => {
        this.setRowid(item)
      })
    }

    return dataSource
  }

  getRowId() {
    return `Row_${++DataManagerModule.count}`
  }

  setRowid(row: object) {
    row[this.rowKeyField] = this.getRowId()
  }

  initialize() {
    if (this.table.rowKeyField) {
      this.rowKeyField = this.table.rowKeyField
    }
  }
}

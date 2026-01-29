import type { VTable } from '@visactor/vue-vtable'
import type dayjs from 'dayjs'

// 数据变更信息接口
export interface ChangeInfo {
  type: 'add' | 'update' | 'delete'
  rowIndex?: number
  field?: string
  oldValue?: any
  newValue?: any
  // 批量删除操作的扩展字段
  affectedRows?: number[]
  affectedData?: any[]
}

export interface RowInitializerUtils {
  getMaxByField<T extends object>(field: keyof T): number,
  now: typeof dayjs
}

export type RowInitializer = <T extends object>(row: T, utils: RowInitializerUtils) => T

// 主组件 Props 接口
export interface DataGridViewProps {
  data: Array<Record<string, any>>
  columns: DataGridViewColumnsDefine
  height?: number | string  // 默认使用 VTable 的 heightMode: 'autoHeight'
  width?: number | string
  loading?: boolean
  disable?: boolean
  rowInitializer?: RowInitializer
  // VTable 原生配置透传
  options?: VTable.ListTableConstructorOptions & {
    rowKeyField?: string
  }
}

export type Either<X, Y> = ({
  [KX in keyof X]: X[KX];
} & {
  [KY in Exclude<keyof Y, keyof X>]?: never;
}) | ({
  [KY in keyof Y]: Y[KY];
} & {
  [KX in Exclude<keyof X, keyof Y>]?: never;
});

export type DataGridViewBuilinColumnType = 'index' | 'checkbox' | 'radio'
export type DataGridViewBuilinBasicColumnDefine = Omit<VTable.ColumnDefine, 'field' | 'cellType' | 'editor'> & {
  type: DataGridViewBuilinColumnType
}

export type IndexColumnDefine = DataGridViewBuilinBasicColumnDefine & {
  type: 'index'
}

export type CheckBoxColumnDefine = DataGridViewBuilinBasicColumnDefine & {
  type: 'checkbox',
  checked?: boolean | ((args: VTable.TYPES.StylePropertyFunctionArg) => boolean);
  disable?: boolean | ((args: VTable.TYPES.StylePropertyFunctionArg) => boolean);
}
export type RadioColumnDefine = DataGridViewBuilinBasicColumnDefine & {
  type: 'radio',
  checked?: boolean | ((args: VTable.TYPES.StylePropertyFunctionArg) => boolean);
  disable?: boolean | ((args: VTable.TYPES.StylePropertyFunctionArg) => boolean);
}

export type FixedColumnDefine = {
  fixed?: 'left' | 'right'
}

export type DataGridViewBuilinColumnDefine = (IndexColumnDefine | CheckBoxColumnDefine | RadioColumnDefine) & FixedColumnDefine

export type DataGridViewColumnDefine = Either<VTable.ColumnDefine & FixedColumnDefine, DataGridViewBuilinColumnDefine>
export type DataGridViewColumnsDefine = DataGridViewColumnDefine[]
// 向后兼容的接口（保持原有的 EditableTableProps）
export interface EditableTableProps extends DataGridViewProps { }

export type { VTable } from '@visactor/vue-vtable'

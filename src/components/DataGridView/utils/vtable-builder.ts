import { VTable } from '@visactor/vue-vtable'
import { getTheme } from './themes'
import type { DataGridViewColumnsDefine } from '../types/dataGridView'
import { parseColumns } from './columns'
import { HighlightHeaderWhenSelectCellPlugin } from '@visactor/vtable-plugins'
/**
 * 构建 VTable 配置选项
 */
export function buildVTableOptions(config: {
  theme?: any
  columns: DataGridViewColumnsDefine
  records: any[]
  height?: string | number
  options?: VTable.ListTableConstructorOptions
}): VTable.ListTableConstructorOptions {
  // 基础配置，使用 VTable 官方类型
  const columnConfig = parseColumns(config.columns)
  const baseOptions: VTable.ListTableConstructorOptions = {
    theme: getTheme(config.theme),
    columns: columnConfig.columns, // 直接使用，不做额外处理
    records: config.records || [],
    defaultRowHeight: 30,
    frozenColCount: columnConfig.frozenColCount,
    rightFrozenColCount: columnConfig.rightFrozenColCount,
    bottomFrozenRowCount: columnConfig.bottomFrozenRowCount,
    showAggregationWhenEmpty: false,
    heightMode: config.height === 'auto' ? 'autoHeight' : 'standard',
    containerFit: {
      width: true,
      height: true
    },
    resize: {
      columnResizeMode: 'header'
    },
    hover: {
      highlightMode: 'row',
    },
    select: {
      highlightMode: 'row',
      headerSelectMode: 'body',
      cornerHeaderSelectMode: 'body',
      // disableSelect(col, row, table) {
      //   console.log(col, row, table)
      //   if (row > 50) return true
      //   return false
      // },
      outsideClickDeselect: false,
      blankAreaClickDeselect: false
    },
    tooltip: {
      isShowOverflowTextTooltip: true
    },
    keyboardOptions: {
      copySelected: true,
      // showCopyCellBorder: true
    },
    rowSeriesNumber: {
      width: 16,
      field: 'rowHeader',
      style: {
        textAlign: 'center',
        color: 'transparent',
        padding: 0,
      },
      // headerStyle: {
      //   textAlign: 'center'
      // },
      disableColumnResize: true,
      // 自定义三角形布局 - 使用正确的 CustomRenderFunctionArg 接口
      customLayout: (args: any) => {
        return {
          rootContainer: null,
          renderDefault: false
        };
      }
    },
    plugins: [
      new HighlightHeaderWhenSelectCellPlugin({
        colHighlight: false,
        rowHighlight: true,
        rowHighlightBGColor: '#1a42e8',
        colHighlightBGColor: '#1a42e8'
      })
    ]
  }
  // 直接透传用户配置，让 VTable 原生配置生效
  return {
    ...baseOptions,
    ...config.options
  }
}

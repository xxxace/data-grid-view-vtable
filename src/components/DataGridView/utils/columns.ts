import type { DataGridViewColumnsDefine, DataGridViewColumnDefine, VTable } from '../types/dataGridView'
import { DATA_GRID_VIEW_CHECKBOX_FIELD, DATA_GRID_VIEW_INDEX_FIELD, DATA_GRID_VIEW_RADIO_FIELD } from '../constant'

export function parseColumns(columns: DataGridViewColumnsDefine) {
  if (!columns || columns.length === 0) {
    return {
      frozenColCount: 0,
      rightFrozenColCount: 0,
      columns: [] as VTable.ColumnsDefine
    }
  }

  const finalColumns: VTable.ColumnsDefine = []
  const fixedLeftColumns: DataGridViewColumnsDefine = []
  const fixedRightColumns: DataGridViewColumnsDefine = []

  const aggregationColumns: DataGridViewColumnsDefine = columns.filter(col => col.aggregation)
  const aggregationTypes = collectAggregationTypes(aggregationColumns)
  const hasAggregation = aggregationTypes.length > 0

  for (const column of columns) {
    let col = Object.assign({}, column)
    if (col.type) {
      col = toBuilinColumn(col, hasAggregation)
    }

    if (col.fixed) {
      if (col.fixed === 'left') {
        fixedLeftColumns.push(col)
      } else if (col.fixed === 'right') {
        fixedRightColumns.push(col)
      }
    } else {
      finalColumns.push(col)
    }
  }

  return {
    frozenColCount: fixedLeftColumns.length,
    rightFrozenColCount: fixedRightColumns.length,
    bottomFrozenRowCount: aggregationTypes.length,
    columns: [...fixedLeftColumns, ...finalColumns, ...fixedRightColumns] as VTable.ColumnsDefine,
  }
}

function collectAggregationTypes(aggregationColumns: DataGridViewColumnsDefine) {
  const aggregationTypes: string[] = []
  aggregationColumns.forEach(col => {
    if (col.aggregation instanceof Array) {
      col.aggregation.forEach(aggregation => {
        if (!aggregationTypes.includes(aggregation.aggregationType)) {
          aggregationTypes.push(aggregation.aggregationType)
        }
      })
    } else {
      if (!aggregationTypes.includes(col.aggregation!.aggregationType)) {
        aggregationTypes.push(col.aggregation!.aggregationType)
      }
    }
  })
  return aggregationTypes
}

function mergeColumnDefine(col1: DataGridViewColumnDefine, col2: DataGridViewColumnDefine, exludes: Array<keyof DataGridViewColumnDefine>) {
  return Object.keys(col2).reduce((acc, key: any) => {
    if (!exludes.includes(key)) {
      if (typeof col2[key] === 'object') {
        acc[key] = mergeColumnDefine(col1[key] || {}, col2[key], [])
      } else {
        acc[key] = col2[key]
      }
    }
    return acc
  }, col1)
}


function toBuilinColumn(column: DataGridViewColumnDefine, hasAggregation: boolean): VTable.ColumnDefine | never {
  const col = Object.assign({}, column)
  if (col.type === 'index') {
    return mergeColumnDefine({
      field: DATA_GRID_VIEW_INDEX_FIELD,
      title: '#',
      width: 50,
      style: {
        textAlign: 'center',
      },
      headerStyle: {
        textAlign: 'center',
      },
      fixed: 'left',
      fieldFormat(_row, _colIndex, rowIndex) {
        return rowIndex
      }
    }, col, ['type']) as VTable.ColumnDefine
  } else if (col.type === 'checkbox') {
    return mergeColumnDefine({
      field: DATA_GRID_VIEW_CHECKBOX_FIELD,
      cellType: 'checkbox',
      headerType: 'checkbox',
      width: 28,
      style: {
        textAlign: 'center',
        checkboxStyle: {
          defaultStroke: '#a1a1a1',
        },
      },
      headerStyle: {
        textAlign: 'center',
        checkboxStyle: {
          defaultStroke: '#a1a1a1',
        },
      },
      fixed: 'left',
      // disable(args) {
      //   if (args.row && hasAggregation) return !args.table.getCellRawRecord(args.col, args.row)
      //   return false
      // }
    }, col, ['type']) as VTable.ColumnDefine
  } else if (col.type === 'radio') {
    return mergeColumnDefine({
      field: DATA_GRID_VIEW_RADIO_FIELD,
      cellType: 'radio',
      width: 28,
      style: {
        textAlign: 'center',
        radioStyle: {
          defaultStroke: '#a1a1a1',
        },
      },
      fixed: 'left',
      // disable(args) {
      //   if (args.row && hasAggregation) return !args.table.getCellRawRecord(args.col, args.row)
      //   return false
      // }
    }, col, ['type']) as VTable.ColumnDefine
  } else {
    throw new Error('Invalid column type')
  }
}

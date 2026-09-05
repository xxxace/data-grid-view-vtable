<template>
  <div class="data-grid-view" :style="containerStyle">
    <!-- 加载掩罩 -->
    <div v-if="loading" class="data-grid-view__loading">
      <div class="loading-spinner"></div>
      <span>加载中...</span>
    </div>

    <!-- 主表格 -->
    <ListTable
      ref="vtableRef"
      class="vtable-border"
      :options="optionsWithRecords"
      v-bind="attrs"
      @ready="onTableReady"
      @cell_edit_end="onCellEditEnd"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted, onUnmounted, useAttrs } from 'vue'
import { ListTable, register } from '@visactor/vue-vtable'
import { InputEditor, DateInputEditor } from '@visactor/vtable-editors'
import type { CSSProperties } from 'vue'
import type { DataGridViewProps, ChangeInfo } from './types/dataGridView'
import type { VTable } from '@visactor/vue-vtable'
import { buildVTableOptions, getDimensionValue } from './utils'
import { DataGridViewDecorator } from './core/DataGridViewDecorator'

defineOptions({
  name: 'DataGridView',
})

// 注册基础编辑器
register.editor('input-editor', new InputEditor())
register.editor('date-input-editor', new DateInputEditor())

const attrs = useAttrs()
// Props 定义 - 简化后的 Props
const props = withDefaults(defineProps<DataGridViewProps>(), {
  data: () => [],
  columns: () => [],
  height: 'auto',
  width: '100%',
  options: () => ({}),
})

// 事件定义 - 简化后的事件
const emit = defineEmits<{
  'cell-edit': [rowIndex: number, field: string, newValue: any, oldValue: any]
  'data-change': [newData: any[], changeType: string, changeInfo: ChangeInfo]
}>()

// 组件引用
const vtableRef = ref<
  (InstanceType<typeof ListTable> & { vTableInstance: VTable.ListTable }) | null
>(null)
const vTableInstance = computed(() => vtableRef.value?.vTableInstance)
// 响应式数据状态
const tableData = ref<any[]>([])

// 计算属性
const containerStyle = computed(
  (): CSSProperties => ({
    position: 'relative',
    height: getDimensionValue(props.height),
    width: getDimensionValue(props.width),
  }),
)

// 处理列配置 - 简化版本，直接使用 VTable 官方类型
const processedColumns = computed(() => {
  return props.columns // 直接使用，不做额外处理
})

// vTable 配置选项 - 简化版本
const options = computed(() => {
  return buildVTableOptions({
    columns: processedColumns.value,
    // records: tableData.value,
    height: props.height,
    options: props.options,
  })
})

const optionsWithRecords = computed(() => {
  return {
    ...options.value,
    records: tableData.value || [],
  }
})

const dateGridView = new DataGridViewDecorator({
  table: vTableInstance,
  rowInitializer: props.rowInitializer,
  rowKeyField: props.options ? props.options.rowKeyField : undefined,
  columns: options.value.columns!,
})

// 事件处理函数 - 简化版本
function onTableReady() {
  console.log('DataGridView is ready', vtableRef.value?.vTableInstance)
}

function onCellEditEnd(event: any) {
  const { row, col, value, oldValue } = event
  const column = processedColumns.value[col]
  const field = String(column?.field || '')

  if (!field || value === oldValue) {
    return
  }

  // 直接更新数据，不做复杂验证
  if (row >= 0 && row < tableData.value.length) {
    const oldCellValue = tableData.value[row][field]
    tableData.value[row][field] = value

    // 创建简化的变更信息
    const changeInfo: ChangeInfo = {
      type: 'update',
      rowIndex: row,
      field,
      oldValue: oldCellValue,
      newValue: value,
    }

    emit('cell-edit', row, field, value, oldCellValue)
    emit('data-change', tableData.value, 'update', changeInfo)
  }
}

function onSelectCell(event: any) {
  console.log('Cell selected:', event)
  // 简化版本，不再维护复杂的选择状态
}

function onSortClick(event: any) {
  console.log('Sort clicked:', event)
  // 简化版本，直接使用 VTable 原生排序功能
}

// 右键菜单处理（简化版本）
function handleContextMenu(event: MouseEvent) {
  event.preventDefault()
  console.log('Context menu requested')
}

// 监听 props 变化 - 简化版本
watch(
  () => props.data,
  (newData) => {
    tableData.value = dateGridView.loadData(newData)
    console.log('loadData', tableData.value)
  },
  { deep: true, immediate: true },
)

// 暴露组件方法
defineExpose(dateGridView as DataGridViewDecorator)

// 生命周期钩子
onMounted(() => {
  console.log('DataGridView mounted')
})

onUnmounted(() => {
  console.log('DataGridView unmounted')
})
</script>

<style>
/* .vtable__bubble-tooltip-element {
  background-color: #000 !important;
} */

.vtable__bubble-tooltip-element__content {
  background-color: #000 !important;
  color: #fff !important;
  font-size: 14px !important;
}
</style>

<style lang="scss" scoped>
.data-grid-view {
  position: relative;
  border: 1px solid #cfcfcf;
  box-sizing: border-box;

  .vtable__bubble-tooltip-element__content {
    background-color: #000 !important;
    color: #fff !important;
    font-size: 14px !important;
  }

  &__loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #f0f0f0;
      border-top: 3px solid #165dff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 8px;
    }

    span {
      color: #666;
      font-size: 14px;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

<style>
.vtable-border {
  .vtable {
    position: absolute !important;
    box-sizing: border-box;

    input {
      outline: none;
      border: none;
      padding: 0 2px;
    }
  }
}
</style>

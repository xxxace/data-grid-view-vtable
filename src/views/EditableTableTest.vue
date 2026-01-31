<template>
  <div class="test-page">
    <h1>DataGridView 组件综合测试</h1>

    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="control-group">
        <label>高度:</label>
        <select v-model="tableHeight">
          <option value="auto">自动</option>
          <option value="400">400px</option>
          <option value="600">600px</option>
        </select>
      </div>

      <div class="control-group">
        <label>
          <input type="checkbox" v-model="editable" /> 允许编辑
        </label>
      </div>

      <div class="control-group">
        <label>
          <input type="checkbox" v-model="selectable" /> 允许选择
        </label>
      </div>

      <div class="control-group">
        <label>
          <input type="checkbox" v-model="loading" /> 加载状态
        </label>
      </div>

      <div>
        <input type="text" @input="handleFilter" placeholder="输入关键字进行过滤">
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-panel">
      <button @click="addRandomRow" class="btn btn-primary">添加随机行</button>
      <button @click="removeSelectedRows" class="btn btn-danger">删除选中行</button>
      <button @click="clearSelection" class="btn btn-secondary">清空选择</button>
      <button @click="getCheckboxState" class="btn btn-primary">获取checkbox选中行</button>
      <button @click="exportData" class="btn btn-info">导出数据</button>
      <button @click="refreshTable" class="btn btn-success">刷新表格</button>
      <button @click="generateLargeData" class="btn btn-warning">生成大数据</button>
    </div>

    <!-- 数据网格视图 -->
    <div class="table-container">
      <DataGridView ref="gridRef" :columns="columns" :data="tableData" :height="tableHeight" :loading="loading"
        @cell-edit="onCellEdit" @on-dbl-click-cell="onDblClickCell" @data-change="onDataChange"
        @on-click-cell="onDblClickCell" />
    </div>

    <!-- 事件日志 -->
    <div class="event-log">
      <h3>事件日志</h3>
      <div class="log-content">
        <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-type" :class="`log-${log.type}`">{{ log.type }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { faker } from '@faker-js/faker'
import DataGridView from '@/components/DataGridView/index.vue'
import { VTable } from '@visactor/vue-vtable'
import type { DataGridViewColumnsDefine, ChangeInfo } from '@/components/DataGridView/types/dataGridView'

// 响应式数据
const tableHeight = ref<string | number>('auto')
const editable = ref(true)
const selectable = ref(true)
const loading = ref(false)
const gridRef = ref<InstanceType<typeof DataGridView>>()

// 事件日志
const eventLogs = ref<Array<{ time: string; type: string; message: string }>>([])

// removed pagination config

// 列配置 - 扩展至26列，基于 VTable 官方类型
const columns: DataGridViewColumnsDefine = [
  // {
  //   type: 'radio'
  // },
  {
    type: 'checkbox'
  },
  {
    type: 'index'
  },
  // 基础信息列 (A-F)
  {
    field: 'id',
    title: 'ID',
    width: 50,
    sort: true,
    cellType: 'text',
    fixed: 'left'
  },
  {
    field: 'name',
    title: '姓名',
    width: 120,
    editor: 'input-editor',
    fixed: 'left'
  },
  {
    field: 'code',
    title: '员工编号',
    width: 100,
    editor: 'input-editor',
    fixed: 'right'
  },
  {
    field: 'avatar',
    title: '头像',
    width: 80,
    // cellType: 'image'
  },
  {
    field: 'gender',
    title: '性别',
    width: 80,
    cellType: 'text'
  },
  {
    field: 'age',
    title: '年龄',
    width: 80,
    editor: 'input-editor',
    aggregation: [
      {
        aggregationType: VTable.TYPES.AggregationType.SUM,
        formatFun(value) {
          return Math.round(value);
        }
      }, {
        aggregationType: VTable.TYPES.AggregationType.AVG,
        formatFun(value) {
          return Math.round(value);
        }
      }
    ]
  },

  // 联系方式列 (G-J)
  {
    field: 'email',
    title: '邮箱',
    width: 180,
    editor: 'input-editor'
  },
  {
    field: 'phone',
    title: '电话',
    width: 130,
    editor: 'input-editor'
  },
  {
    field: 'website',
    title: '网站',
    width: 150,
    editor: 'input-editor'
  },
  {
    field: 'address',
    title: '地址',
    width: 200,
    editor: 'input-editor'
  },

  // 工作信息列 (K-P)
  {
    field: 'department',
    title: '部门',
    width: 100,
    cellType: 'text'
  },
  {
    field: 'position',
    title: '职位',
    width: 120,
    cellType: 'text'
  },
  {
    field: 'level',
    title: '级别',
    width: 80,
    cellType: 'text'
  },
  {
    field: 'joinDate',
    title: '入职日期',
    width: 120,
    editor: 'date-input-editor'
  },
  {
    field: 'workYears',
    title: '工作年限',
    width: 100,
    editor: 'input-editor'
  },
  {
    field: 'manager',
    title: '直属经理',
    width: 120,
    editor: 'input-editor'
  },

  // 薪资绩效列 (Q-T)
  {
    field: 'salary',
    title: '薪资',
    width: 100,
    editor: 'input-editor',
  },
  {
    field: 'bonus',
    title: '奖金',
    width: 100,
    editor: 'input-editor'
  },
  {
    field: 'performance',
    title: '绩效',
    width: 80,
    editor: 'input-editor'
  },
  {
    field: 'progress',
    title: '进度',
    width: 80,
    editor: 'input-editor'
  },

  // 状态控制列 (U-X)
  {
    field: 'status',
    title: '状态',
    width: 80,
    cellType: 'text'
  },
  {
    field: 'isActive',
    title: '激活',
    width: 80,
    cellType: 'checkbox'
  },
  {
    field: 'priority',
    title: '优先级',
    width: 80,
    cellType: 'text'
  },

  // 时间记录列 (Y-Z)
  {
    field: 'createTime',
    title: '创建时间',
    width: 150,
    sort: true
  },
  {
    field: 'updateTime',
    title: '更新时间',
    width: 150,
    sort: true
  },
  {
    field: 'actions',
    title: '操作',
    width: 100,
    cellType: 'link',
    fixed: 'right'
  }
]

// 表格数据
const tableData = ref<Array<Record<string, any>>>([])

const handleFilter = (e) => {
  gridRef.value?.filter((row) => {
    return row.name.indexOf(e.target.value) > -1
  })
}

// 生成测试数据 - 扩展至26列
function generateTestData(count: number = 50): Array<Record<string, any>> {
  const data: Array<Record<string, any>> = []
  const departments = ['tech', 'product', 'operation', 'marketing', 'hr', 'finance', 'sales']
  const positions = ['前端开发', '后端开发', '产品经理', '运营专员', 'UI设计师', '数据分析师', '项目经理']
  const levels = ['junior', 'middle', 'senior', 'expert', 'architect']
  const statuses = ['active', 'inactive', 'trial', 'leave']
  const genders = ['male', 'female', 'other']
  const priorities = ['low', 'medium', 'high', 'urgent']

  for (let i = 1; i <= count; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const fullName = `${lastName}${firstName}`
    const joinDate = faker.date.between({ from: '2020-01-01', to: new Date() })
    const createTime = faker.date.between({ from: '2023-01-01', to: new Date() })
    const updateTime = faker.date.between({ from: createTime, to: new Date() })

    data.push({
      // 基础信息列 (A-F)
      id: i,
      name: fullName,
      code: `EMP${String(i).padStart(4, '0')}`,
      avatar: faker.image.avatar(),
      gender: faker.helpers.arrayElement(genders),
      age: faker.number.int({ min: 22, max: 65 }),

      // 联系方式列 (G-J)
      email: faker.internet.email(),
      phone: `1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      website: faker.internet.url(),
      address: faker.location.streetAddress(),

      // 工作信息列 (K-P)
      department: faker.helpers.arrayElement(departments),
      position: faker.helpers.arrayElement(positions),
      level: faker.helpers.arrayElement(levels),
      joinDate: joinDate.toISOString().split('T')[0],
      workYears: Math.round(Math.random() * 20 * 2) / 2,
      manager: faker.person.fullName(),

      // 薪资绩效列 (Q-T)
      salary: faker.number.int({ min: 5000, max: 80000 }),
      bonus: faker.number.int({ min: 0, max: 20000 }),
      performance: Math.round((Math.random() * 4 + 1) * 10) / 10,
      progress: faker.number.int({ min: 0, max: 100 }),

      // 状态控制列 (U-X)
      status: faker.helpers.arrayElement(statuses),
      isActive: faker.datatype.boolean(),
      priority: faker.helpers.arrayElement(priorities),
      actions: '操作',

      // 时间记录列 (Y-Z)
      createTime: createTime.toISOString(),
      updateTime: updateTime.toISOString()
    })
  }

  return data
}

// 添加日志
function addLog(type: string, message: string) {
  eventLogs.value.unshift({
    time: new Date().toLocaleTimeString(),
    type,
    message
  })

  // 限制日志条数
  if (eventLogs.value.length > 50) {
    eventLogs.value = eventLogs.value.slice(0, 50)
  }
}

function onDblClickCell(row) {
  console.log('dblclick', row)
}

// 事件处理函数
function onCellEdit(rowIndex: number, field: string, newValue: any, oldValue: any) {
  addLog('edit', `编辑第 ${rowIndex + 1} 行的 ${field} 字段: ${oldValue} → ${newValue}`)
}

function onRowSelect(selectedRows: number[], selectedRowData: any[]) {
  addLog('select', `选中了 ${selectedRows.length} 行: [${selectedRows.join(', ')}]`)
}

function onSortChange(field: string, direction: 'asc' | 'desc') {
  addLog('sort', `按 ${field} 字段${direction === 'asc' ? '升序' : '降序'}排序`)
}

function onDataChange(newData: any[], changeType: string, changeInfo: ChangeInfo) {
  addLog('data', `数据${changeType}操作: ${JSON.stringify(changeInfo, null, 2)}`)
}

// 操作函数
function addRandomRow() {
  const newRow: any = generateTestData(1)[0]
  const maxId = Math.max(...gridRef.value?.getTableData()?.fullData.map((row: any) => row.id), 0)
  newRow.id = maxId + 1
  newRow.createTime = new Date().toISOString()
  newRow.updateTime = new Date().toISOString()
  gridRef.value?.addRow(newRow, 0)
  addLog('action', '添加了一行新数据')
}

function removeSelectedRows() {
  if (!gridRef.value) return

  // 为getCheckboxRecords添加计时
  let startTime = performance.now()
  const selectedRows = gridRef.value?.getCheckboxRecords()
  let endTime = performance.now()
  const getCheckboxTime = endTime - startTime

  if (selectedRows.length > 0) {
    // 获取选中行的索引
    // 为removeRow添加计时
    startTime = performance.now()
    gridRef.value?.removeRow(selectedRows)
    endTime = performance.now()
    const removeRowTime = endTime - startTime

    addLog('action', `删除了 ${selectedRows.length} 行数据`)
    addLog('performance', `getCheckboxRecords耗时: ${getCheckboxTime.toFixed(2)}ms, removeRow耗时: ${removeRowTime.toFixed(2)}ms`)
  } else {
    addLog('warning', '没有选中任何行')
    addLog('performance', `getCheckboxRecords耗时: ${getCheckboxTime.toFixed(2)}ms`)
  }
}

function getCheckboxState() {
  console.log(gridRef.value?.getCheckboxRecords())
  console.log(gridRef.value?.getRadioRecords())
  // console.log(gridRef.value?.vTableInstance?.getCheckboxState('DATA_GRID_VIEW_CHECKBOX_FIELD'))
}

function clearSelection() {
  // gridRef.value?.clearSelection()
  addLog('action', '清空了选择')
}

function exportData() {
  // const data = gridRef.value?.exportData('json')
  // if (data) {
  //   const blob = new Blob([data], { type: 'application/json' })
  //   const url = URL.createObjectURL(blob)
  //   const a = document.createElement('a')
  //   a.href = url
  //   a.download = 'table-data.json'
  //   a.click()
  //   URL.revokeObjectURL(url)
  //   addLog('action', '导出数据成功')
  // }
}

function refreshTable() {
  // gridRef.value?.refresh()
  addLog('action', '刷新了表格')
}

function generateLargeData() {
  loading.value = true
  let startTime = performance.now()
  setTimeout(() => {
    tableData.value = generateTestData(10000)
    let endTime = performance.now()
    const generateTime = endTime - startTime
    loading.value = false
    addLog('action', `生成了 10000 条测试数据，耗时: ${generateTime.toFixed(2)}ms`)
  }, 0)
}

// 初始化数据
onMounted(() => {
  // tableData.value = generateTestData(50)
  addLog('info', '页面初始化完成，生成了 50 条测试数据')
})
</script>

<style scoped>
.test-page {
  padding: 0;
  max-width: 1800px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.control-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f7f8fa;
  border-radius: 6px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-group label {
  font-weight: 500;
  color: #333;
}

.control-group select {
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  min-width: 100px;
}

.action-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-primary {
  background: #165dff;
  color: white;
}

.btn-primary:hover {
  background: #4080ff;
}

.btn-danger {
  background: #f53f3f;
  color: white;
}

.btn-danger:hover {
  background: #f76965;
}

.btn-secondary {
  background: #86909c;
  color: white;
}

.btn-secondary:hover {
  background: #a2a8b0;
}

.btn-info {
  background: #00b42a;
  color: white;
}

.btn-info:hover {
  background: #23c343;
}

.btn-success {
  background: #722ed1;
  color: white;
}

.btn-success:hover {
  background: #9254de;
}

.btn-warning {
  background: #ff7d00;
  color: white;
}

.btn-warning:hover {
  background: #ff9a2e;
}

.table-container {
  height: 600px;
  padding: 6px;
  margin-bottom: 30px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.event-log {
  margin-top: 30px;
}

.event-log h3 {
  color: #333;
  margin-bottom: 16px;
}

.log-content {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e5e6eb;
  border-radius: 6px;
  background: #fafafa;
}

.log-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: #86909c;
  min-width: 80px;
  font-family: monospace;
}

.log-type {
  min-width: 60px;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
}

.log-edit {
  background: #e7f4ff;
  color: #165dff;
}

.log-select {
  background: #fff7e6;
  color: #ff7d00;
}

.log-sort {
  background: #f6ffed;
  color: #00b42a;
}

.log-page {
  background: #f9f0ff;
  color: #722ed1;
}

.log-data {
  background: #fff1f0;
  color: #f53f3f;
}

.log-action {
  background: #e6f7ff;
  color: #1890ff;
}

.log-info {
  background: #f0f0f0;
  color: #666;
}

.log-warning {
  background: #fffbe6;
  color: #fa8c16;
}

.log-message {
  flex: 1;
  color: #333;
  word-break: break-all;
}
</style>

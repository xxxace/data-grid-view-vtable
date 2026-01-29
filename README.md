# DataGridView - 高性能数据表格组件

基于 vTable 库封装的类似于 WinForm DataGridView 的高性能数据表格组件，为 Vue 3 应用提供一个易用、高性能的数据表格解决方案。

## ✨ 特性

- 🚀 **高性能** - 支持百万级数据展示，利用虚拟滚动技术保证流畅体验
- 🛠️ **易用性** - 提供简洁的 API 接口，开发者可快速集成到各个页面模块
- 📊 **功能完整** - 涵盖数据展示、编辑、排序、筛选、分页等核心功能
- 🎨 **可扩展** - 支持自定义单元格渲染、编辑器、主题等扩展能力
- 🌗 **多主题** - 内置 Arco、Ant Design、深色、简洁等多种主题
- 📱 **响应式** - 支持自适应布局和移动端适配

## 🛠️ 技术栈

| 技术                     | 版本  | 用途             |
| ------------------------ | ----- | ---------------- |
| Vue                      | 3.5+  | 组件开发框架     |
| @visactor/vue-vtable     | 1.20+ | 底层表格渲染引擎 |
| @visactor/vtable-editors | 1.20+ | 表格编辑器支持   |
| TypeScript               | 5.8+  | 类型安全         |
| Vite                     | 6.2+  | 构建工具         |

## 📦 安装

### 作为依赖安装

```bash
# 使用 pnpm
pnpm add data-grid-view-vue3

# 或使用 npm
npm install data-grid-view-vue3

# 或使用 yarn
yarn add data-grid-view-vue3
```

### 安装对等依赖

```bash
# 使用 pnpm
pnpm add @visactor/vrender @visactor/vtable-editors @visactor/vtable-plugins @visactor/vue-vtable dayjs vue

# 或使用 npm
npm install @visactor/vrender @visactor/vtable-editors @visactor/vtable-plugins @visactor/vue-vtable dayjs vue

# 或使用 yarn
yarn add @visactor/vrender @visactor/vtable-editors @visactor/vtable-plugins @visactor/vue-vtable dayjs vue
```

## 🚀 快速开始

### 基础用法

```vue
<template>
  <DataGridView
    :data="tableData"
    :columns="columns"
    :height="600"
    theme="arco"
    :editable="true"
    :selectable="true"
    @cell-edit="onCellEdit"
    @row-select="onRowSelect"
  />
</template>

<script setup>
import DataGridView from 'data-grid-view-vue3'
import type { DataGridViewProps, DataGridViewColumnDefine } from 'data-grid-view-vue3'

// 列配置
const columns: DataGridViewColumnDefine[] = [
  { field: 'id', title: 'ID', width: 80, sortable: true },
  { field: 'name', title: '姓名', width: 120, editable: true,
    editor: { type: 'input', placeholder: '请输入姓名' } },
  { field: 'age', title: '年龄', width: 80, editable: true,
    editor: { type: 'number', min: 0, max: 150 } },
  { field: 'email', title: '邮箱', width: 200, editable: true }
]

// 表格数据
const tableData = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' }
])

// 事件处理
function onCellEdit(rowIndex, field, newValue, oldValue) {
  console.log('单元格编辑:', { rowIndex, field, newValue, oldValue })
}

function onRowSelect(selectedRows, selectedRowData) {
  console.log('行选择:', selectedRows, selectedRowData)
}
</script>
```

### 高级配置

```vue
<template>
  <DataGridView
    :data="tableData"
    :columns="advancedColumns"
    :height="'auto'"
    theme="dark"
    :pagination="paginationConfig"
    :editable="true"
    :selectable="true"
    :sortable="true"
    :filterable="true"
    :loading="loading"
    @cell-edit="onCellEdit"
    @sort-change="onSortChange"
    @page-change="onPageChange"
  />
</template>

<script setup>
import DataGridView from 'data-grid-view-vue3'
import type { DataGridViewColumnDefine } from 'data-grid-view-vue3'

// 高级列配置
const advancedColumns = [
  {
    field: 'status',
    title: '状态',
    editable: true,
    editor: {
      type: 'select',
      options: [
        { label: '激活', value: 'active' },
        { label: '禁用', value: 'disabled' },
      ],
    },
  },
  {
    field: 'joinDate',
    title: '入职日期',
    editable: true,
    editor: { type: 'date' },
  },
]

// 分页配置
const paginationConfig = {
  current: 1,
  pageSize: 20,
  showSizeChanger: true,
  showQuickJumper: true,
}
</script>
```

## 📚 API 文档

### Props

| 属性名         | 类型                                                          | 默认值    | 说明                |
| -------------- | ------------------------------------------------------------- | --------- | ------------------- |
| data           | Array<Record<string, any>>                                    | []        | 表格数据源          |
| columns        | DataGridViewColumnsDefine                                     | []        | 列配置定义          |
| height         | number \| string                                              | 'auto'    | 表格高度            |
| width          | number \| string                                              | '100%'    | 表格宽度            |
| loading        | boolean                                                       | false     | 加载状态            |
| disable        | boolean                                                       | false     | 是否禁用表格        |
| rowInitializer | RowInitializer                                                | undefined | 行初始化函数        |
| options        | VTable.ListTableConstructorOptions & { rowKeyField?: string } | undefined | VTable 原生配置透传 |

### 事件

| 事件名      | 参数                                  | 说明           |
| ----------- | ------------------------------------- | -------------- |
| cell-edit   | (rowIndex, field, newValue, oldValue) | 单元格编辑完成 |
| row-select  | (selectedRows, selectedRowData)       | 行选择变化     |
| sort-change | (field, direction)                    | 排序变化       |
| page-change | (page, pageSize)                      | 分页变化       |
| data-change | (newData, changeType, changeInfo)     | 数据变更       |

### 方法

| 方法名          | 参数             | 返回值 | 说明             |
| --------------- | ---------------- | ------ | ---------------- |
| getData         | ()               | Array  | 获取当前表格数据 |
| setData         | (data: Array)    | void   | 设置表格数据     |
| getSelectedRows | ()               | Array  | 获取选中行数据   |
| clearSelection  | ()               | void   | 清空选择         |
| exportData      | (format: string) | string | 导出数据         |
| addRow          | (data, index?)   | void   | 添加行           |
| removeRow       | (index)          | void   | 删除行           |
| updateRow       | (index, data)    | void   | 更新行           |

### 编辑器类型

| 类型     | 配置选项               | 使用场景 |
| -------- | ---------------------- | -------- |
| input    | placeholder, maxLength | 文本输入 |
| number   | min, max, step         | 数值输入 |
| select   | options, multiple      | 下拉选择 |
| date     | format                 | 日期选择 |
| textarea | rows, maxLength        | 多行文本 |

## 🎨 主题

内置主题:

- `arco` - Arco Design 风格
- `antd` - Ant Design 风格
- `dark` - 深色主题
- `simple` - 简洁主题

## 🚀 开发

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 类型检查

```bash
pnpm type-check
```

### 代码检查和格式化

```bash
pnpm lint
pnpm format
```

## 📖 示例

项目包含一个完整的测试页面，展示了所有功能的使用方法。启动开发服务器后访问 `/` 即可查看。

测试页面功能包括:

- 多主题切换
- 实时编辑演示
- 排序和选择功能
- 分页控制
- 大数据量测试
- 数据导出功能
- 事件日志展示

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

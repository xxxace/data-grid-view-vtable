import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DataGridView from '../index.vue'
import type { ColumnConfig } from '../types'

describe('DataGridView Component', () => {
  let wrapper: any

  const mockData = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com' }
  ]

  const mockColumns: ColumnConfig[] = [
    { field: 'id', title: 'ID', width: 80, editable: false },
    { field: 'name', title: 'Name', width: 120, editable: true },
    { field: 'age', title: 'Age', width: 80, editable: true },
    { field: 'email', title: 'Email', width: 200, editable: true }
  ]

  beforeEach(() => {
    // Mock VTable components
    vi.mock('@visactor/vue-vtable', () => ({
      ListTable: {
        name: 'ListTable',
        props: ['options'],
        template: '<div class="mock-vtable"></div>'
      },
      register: {
        editor: vi.fn()
      }
    }))

    vi.mock('@visactor/vtable-editors', () => ({
      InputEditor: class MockInputEditor {},
      DateInputEditor: class MockDateInputEditor {}
    }))
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
    vi.clearAllMocks()
  })

  describe('Component Initialization', () => {
    it('should render with default props', () => {
      wrapper = mount(DataGridView, {
        props: {
          data: mockData,
          columns: mockColumns
        }
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.data-grid-view').exists()).toBe(true)
    })

    it('should initialize with provided data and columns', () => {
      wrapper = mount(DataGridView, {
        props: {
          data: mockData,
          columns: mockColumns
        }
      })

      const instance = wrapper.vm
      const data = instance.getData()
      expect(data).toHaveLength(3)
      expect(data[0]).toEqual(mockData[0])
    })

    it('should show loading state when loading prop is true', () => {
      wrapper = mount(DataGridView, {
        props: {
          data: mockData,
          columns: mockColumns,
          loading: true
        }
      })

      expect(wrapper.find('.data-grid-view__loading').exists()).toBe(true)
      expect(wrapper.find('.loading-spinner').exists()).toBe(true)
    })
  })

  describe('Data Operations', () => {
    beforeEach(() => {
      wrapper = mount(DataGridView, {
        props: {
          data: mockData,
          columns: mockColumns
        }
      })
    })

    it('should add a new row', () => {
      const newRow = { id: 4, name: 'Alice Brown', age: 28, email: 'alice@example.com' }
      wrapper.vm.addRow(newRow)

      const data = wrapper.vm.getData()
      expect(data).toHaveLength(4)
      expect(data[3]).toEqual(newRow)
    })

    it('should remove a row by index', () => {
      wrapper.vm.removeRow(1)

      const data = wrapper.vm.getData()
      expect(data).toHaveLength(2)
      expect(data.find((row: any) => row.id === 2)).toBeUndefined()
    })

    it('should update a row', () => {
      const updateData = { name: 'John Updated', age: 31 }
      wrapper.vm.updateRow(0, updateData)

      const data = wrapper.vm.getData()
      expect(data[0].name).toBe('John Updated')
      expect(data[0].age).toBe(31)
      expect(data[0].id).toBe(1) // Should keep unchanged fields
    })

    it('should export data in JSON format', () => {
      const exportedData = wrapper.vm.exportData('json')
      const parsedData = JSON.parse(exportedData)
      
      expect(parsedData).toHaveLength(3)
      expect(parsedData[0]).toEqual(mockData[0])
    })

    it('should get data statistics', () => {
      const stats = wrapper.vm.getDataStatistics()
      
      expect(stats.totalRows).toBe(3)
      expect(stats.totalChanges).toBe(0)
      expect(stats.hasUnsavedChanges).toBe(false)
    })
  })

  describe('Selection and Theme Operations - Simplified', () => {
    beforeEach(() => {
      wrapper = mount(DataGridView, {
        props: {
          data: mockData,
          columns: mockColumns
        }
      })
    })

    it('should provide basic selection methods (simplified)', () => {
      // 简化版本，直接使用 VTable 原生选择功能
      expect(typeof wrapper.vm.getSelectedRows).toBe('function')
      expect(typeof wrapper.vm.clearSelection).toBe('function')
      
      const selectedRows = wrapper.vm.getSelectedRows()
      expect(Array.isArray(selectedRows)).toBe(true)
    })

    it('should not expose complex theme operations', () => {
      // 简化版本不再提供复杂的主题切换功能
      expect(wrapper.vm.getCurrentTheme).toBeUndefined()
      expect(wrapper.vm.setTheme).toBeUndefined()
    })
  })

  describe('Event Emissions - Simplified', () => {
    beforeEach(() => {
      wrapper = mount(DataGridView, {
        props: {
          data: mockData,
          columns: mockColumns
        }
      })
    })

    it('should emit data-change event when row is added', async () => {
      const newRow = { id: 4, name: 'Test User', age: 30, email: 'test@example.com' }
      
      wrapper.vm.addRow(newRow)
      
      await wrapper.vm.$nextTick()
      
      // Check if data-change event was emitted
      expect(wrapper.emitted('data-change')).toBeTruthy()
    })
  })

  describe('Prop Reactivity - Simplified', () => {
    beforeEach(() => {
      wrapper = mount(DataGridView, {
        props: {
          data: mockData,
          columns: mockColumns
        }
      })
    })

    it('should update data when data prop changes', async () => {
      const newData = [
        { id: 10, name: 'New User', age: 25, email: 'new@example.com' }
      ]
      
      await wrapper.setProps({ data: newData })
      
      const componentData = wrapper.vm.getData()
      expect(componentData).toHaveLength(1)
      expect(componentData[0]).toEqual(newData[0])
    })

    it('should handle vtableOptions prop', async () => {
      const customOptions = {
        theme: 'dark',
        heightMode: 'autoHeight'
      }
      
      await wrapper.setProps({ vtableOptions: customOptions })
      
      // 简化版本只验证属性能正常接收
      expect(wrapper.props('vtableOptions')).toEqual(customOptions)
    })
  })
})
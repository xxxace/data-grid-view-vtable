<template>
  <ListTable class="vtable-border" :options="optionsComputed" />
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { ListTable, register, type VTable } from '@visactor/vue-vtable'
import themes from './themes'
import { InputEditor, DateInputEditor } from '@visactor/vtable-editors'
import type { EditableTableProps } from './types'

register.editor('input-editor', new InputEditor())
register.editor('date-input-editor', new DateInputEditor())

const props = withDefaults(defineProps<EditableTableProps>(), {})

const tableOptions: VTable.ListTableConstructorOptions = {
  theme: themes.ARCO,
  enableLineBreak: true,
  autoWrapText: true,
  limitMaxAutoWidth: 500,
  limitMinHeight: 100,
  heightMode: 'autoHeight',
  editCellTrigger: ['doubleclick', 'keydown'],
  keyboardOptions: {
    copySelected: true,
    pasteValueToCell: true,
    selectAllOnCtrlA: true
  }
}

const optionsComputed = computed<VTable.ListTableConstructorOptions>(() => {
  return {
    columns: props.columns,
    records: props.data,
    ...tableOptions
  }
})
</script>

<style lang="scss">
.vtable-border {
  .vtable {
    //position: absolute;
    box-sizing: border-box;
    border: 1px solid #c0c0c0;

    input {
      outline: none;
      border: none;
      padding: 0 2px;
    }
  }
}
</style>

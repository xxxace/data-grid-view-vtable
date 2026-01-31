import { VTable as VueVTable } from '@visactor/vue-vtable';
import type { VTable } from '@visactor/vue-vtable';

export type EventCallback<Params> = (params: Params) => void;

const EVENT_TYPE = {
  ...VueVTable.ListTable.EVENT_TYPE,
  ...VueVTable.PivotTable.EVENT_TYPE,
  ...VueVTable.PivotChart.EVENT_TYPE
};

export interface EventsProps {
  onClickCell?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['click_cell']>;
  onDblClickCell?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['dblclick_cell']>;
  onMouseDownCell?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['mousedown_cell']>;
  onMouseUpCell?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['mouseup_cell']>;
  onSelectedCell?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['selected_cell']>;
  onKeyDown?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['keydown']>;
  onMouseEnterTable?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['mouseenter_table']>;
  onMouseLeaveTable?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['mouseleave_table']>;
  onMouseDownTable?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['mousedown_table']>;
  onMouseMoveCell?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['mousemove_cell']>;
  onMouseEnterCell?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['mouseenter_cell']>;
  onMouseLeaveCell?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['mouseleave_cell']>;
  onContextMenuCell?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['contextmenu_cell']>;
  onContextMenuCanvas?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['contextmenu_canvas']>;
  onResizeColumn?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['resize_column']>;
  onResizeColumnEnd?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['resize_column_end']>;
  onChangeHeaderPosition?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['change_header_position']>;
  onChangeHeaderPositionStart?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['change_header_position_start']>;
  onChangeHeaderPositionFail?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['change_header_position_fail']>;
  onSortClick?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['sort_click']>;
  onFreezeClick?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['freeze_click']>;
  onScroll?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['scroll']>;
  onDropdownMenuClick?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['dropdown_menu_click']>;
  onMouseOverChartSymbol?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['mouseover_chart_symbol']>;
  onDragSelectEnd?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['drag_select_end']>;

  onDropdownIconClick?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['dropdown_icon_click']>;
  onDropdownMenuClear?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['dropdown_menu_clear']>;

  onTreeHierarchyStateChange?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['tree_hierarchy_state_change']>;

  onShowMenu?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['show_menu']>;
  onHideMenu?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['hide_menu']>;

  onIconClick?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['icon_click']>;

  onLegendItemClick?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['legend_item_click']>;
  onLegendItemHover?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['legend_item_hover']>;
  onLegendItemUnHover?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['legend_item_unHover']>;
  onLegendChange?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['legend_change']>;

  onMouseEnterAxis?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['mouseenter_axis']>;
  onMouseLeaveAxis?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['mouseleave_axis']>;

  onCheckboxStateChange?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['checkbox_state_change']>;
  onRadioStateChange?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['radio_state_change']>;
  onAfterRender?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['after_render']>;
  onInitialized?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['initialized']>;

  // pivot table only
  onPivotSortClick?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['pivot_sort_click']>;
  onDrillMenuClick?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['drillmenu_click']>;

  // pivot chart only
  onVChartEventType?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['vchart_event_type']>;

  onChangeCellValue?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['change_cell_value']>;

  onMousedownFillHandle?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['mousedown_fill_handle']>;
  onDragFillHandleEnd?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['drag_fill_handle_end']>;
  onDblclickFillHandle?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['dblclick_fill_handle']>;

  onScrollVerticalEnd?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['scroll_vertical_end']>;
  onScrollHorizontalEnd?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['scroll_horizontal_end']>;

  onChangCellValue?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['change_cell_value']>;
  onEmptyTipClick?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['empty_tip_click']>;
  onEmptyTipDblClick?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['empty_tip_dblclick']>;
  onButtonClick?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['button_click']>;
  onBeforeCacheChartImage?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['before_cache_chart_image']>;
  onPastedData?: EventCallback<VTable.TYPES.TableEventHandlersEventArgumentMap['pasted_data']>;
}

export const TABLE_EVENTS = {
  onClickCell: EVENT_TYPE.CLICK_CELL,
  onDblClickCell: EVENT_TYPE.DBLCLICK_CELL,
  onMouseDownCell: EVENT_TYPE.MOUSEDOWN_CELL,
  onMouseUpCell: EVENT_TYPE.MOUSEUP_CELL,
  onSelectedCell: EVENT_TYPE.SELECTED_CELL,
  onKeyDown: EVENT_TYPE.KEYDOWN,
  onMouseEnterTable: EVENT_TYPE.MOUSEENTER_TABLE,
  onMouseLeaveTable: EVENT_TYPE.MOUSELEAVE_TABLE,
  onMouseDownTable: EVENT_TYPE.MOUSEDOWN_TABLE,
  onMouseMoveCell: EVENT_TYPE.MOUSEMOVE_CELL,
  onMouseEnterCell: EVENT_TYPE.MOUSEENTER_CELL,
  onMouseLeaveCell: EVENT_TYPE.MOUSELEAVE_CELL,
  onContextMenuCell: EVENT_TYPE.CONTEXTMENU_CELL,
  onContextMenuCanvas: EVENT_TYPE.CONTEXTMENU_CANVAS,
  onResizeColumn: EVENT_TYPE.RESIZE_COLUMN,
  onResizeColumnEnd: EVENT_TYPE.RESIZE_COLUMN_END,
  onChangeHeaderPosition: EVENT_TYPE.CHANGE_HEADER_POSITION,
  onChangeHeaderPositionStart: EVENT_TYPE.CHANGE_HEADER_POSITION_START,
  onChangeHeaderPositionFail: EVENT_TYPE.CHANGE_HEADER_POSITION_FAIL,
  onSortClick: EVENT_TYPE.SORT_CLICK,
  onFreezeClick: EVENT_TYPE.FREEZE_CLICK,
  onScroll: EVENT_TYPE.SCROLL,
  onDropdownMenuClick: EVENT_TYPE.DROPDOWN_MENU_CLICK,
  onMouseOverChartSymbol: EVENT_TYPE.MOUSEOVER_CHART_SYMBOL,
  onDragSelectEnd: EVENT_TYPE.DRAG_SELECT_END,

  onDropdownIconClick: EVENT_TYPE.DROPDOWN_ICON_CLICK,
  onDropdownMenuClear: EVENT_TYPE.DROPDOWN_MENU_CLEAR,

  onTreeHierarchyStateChange: EVENT_TYPE.TREE_HIERARCHY_STATE_CHANGE,

  onShowMenu: EVENT_TYPE.SHOW_MENU,
  onHideMenu: EVENT_TYPE.HIDE_MENU,

  onIconClick: EVENT_TYPE.ICON_CLICK,

  onLegendItemClick: EVENT_TYPE.LEGEND_ITEM_CLICK,
  onLegendItemHover: EVENT_TYPE.LEGEND_ITEM_HOVER,
  onLegendItemUnHover: EVENT_TYPE.LEGEND_ITEM_UNHOVER,
  onLegendChange: EVENT_TYPE.LEGEND_CHANGE,

  onMouseEnterAxis: EVENT_TYPE.MOUSEENTER_AXIS,
  onMouseLeaveAxis: EVENT_TYPE.MOUSELEAVE_AXIS,

  onCheckboxStateChange: EVENT_TYPE.CHECKBOX_STATE_CHANGE,
  onRadioStateChange: EVENT_TYPE.RADIO_STATE_CHANGE,
  onAfterRender: EVENT_TYPE.AFTER_RENDER,
  onInitialized: EVENT_TYPE.INITIALIZED,

  // pivot table only
  onPivotSortClick: EVENT_TYPE.PIVOT_SORT_CLICK,
  onDrillMenuClick: EVENT_TYPE.DRILLMENU_CLICK,

  // pivot chart only
  onVChartEventType: EVENT_TYPE.VCHART_EVENT_TYPE,

  onChangeCellValue: EVENT_TYPE.CHANGE_CELL_VALUE,
  onMousedownFillHandle: EVENT_TYPE.MOUSEDOWN_FILL_HANDLE,
  onDragFillHandleEnd: EVENT_TYPE.DRAG_FILL_HANDLE_END,
  onDblclickFillHandle: EVENT_TYPE.DBLCLICK_FILL_HANDLE,
  onScrollVerticalEnd: EVENT_TYPE.SCROLL_VERTICAL_END,
  onScrollHorizontalEnd: EVENT_TYPE.SCROLL_HORIZONTAL_END,
  onChangCellValue: EVENT_TYPE.CHANGE_CELL_VALUE,
  onEmptyTipClick: EVENT_TYPE.EMPTY_TIP_CLICK,
  onEmptyTipDblClick: EVENT_TYPE.EMPTY_TIP_DBLCLICK,
  onButtonClick: EVENT_TYPE.BUTTON_CLICK,
  onBeforeCacheChartImage: EVENT_TYPE.BEFORE_CACHE_CHART_IMAGE,
  onPastedData: EVENT_TYPE.PASTED_DATA,
  onSelectedClear: EVENT_TYPE.SELECTED_CLEAR
};

export const TABLE_EVENTS_KEYS: (keyof typeof TABLE_EVENTS)[] = Object.keys(TABLE_EVENTS) as (keyof typeof TABLE_EVENTS)[];

import { VTable } from '@visactor/vue-vtable'

const ARCO = VTable.themes.ARCO.extends({
  headerStyle: {
    fontSize: 14,
    padding: 4,
    fontWeight: 600
  },
  bodyStyle: {
    fontSize: 14,
    padding: [6, 4]
  },
  frameStyle: {
    borderLineWidth: [0, 1, 1, 0],
    cornerRadius: 0,
    shadowBlur: 0,
    shadowColor: 'transparent'
  },
  scrollStyle: {
    scrollRailColor: 'RGBA(246,246,246,0.5)',
    visible: 'always',
    hoverOn: false,
    barToSide: true,
    width: 12,
    scrollSliderCornerRadius: 0,
    scrollSliderColor: '#c0c0c0'
  }
})

export default {
  ARCO
}

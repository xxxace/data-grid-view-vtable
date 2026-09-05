import { VTable } from "@visactor/vue-vtable";

const MINI_ARCO = VTable.themes.ARCO.extends({
  headerStyle: {
    fontSize: 14,
    padding: 4,
    fontWeight: 600,
    hover: {
      cellBgColor: '',
      inlineRowBgColor: ''
    }
  },
  bodyStyle: {
    fontSize: 14,
    padding: [6, 4],
    hover: {
      cellBgColor: 'RGBA(0,100,255,0.2)',
      inlineRowBgColor: 'RGBA(0,100,255,0.1)'
    },
    select: {
      cellBgColor: 'RGBA(0,100,255,0.1)',
      inlineRowBgColor: 'RGBA(0,100,255,0.1)'
    }
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
  },
  selectionStyle: {
    cellBorderLineWidth: 1,
    cellBorderColor: '#1a42e8',
  }
})

export function getTheme(theme?: string): VTable.themes.TableTheme | undefined {
  return !theme || theme === 'default' ? MINI_ARCO : VTable.themes[theme]
}

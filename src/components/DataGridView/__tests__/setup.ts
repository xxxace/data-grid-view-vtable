import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock VTable components globally
config.global.mocks = {
  $vtable: {
    refresh: vi.fn(),
    scrollTo: vi.fn(),
    getSelectedRows: vi.fn(() => []),
    selectAll: vi.fn(),
    clearSelection: vi.fn()
  }
}

// Mock window.ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock console methods to avoid noise in test output
global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}

// Setup DOM environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
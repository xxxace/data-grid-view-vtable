import { Module } from '../modules'
import type { Modules } from '../types/modules'

export class ModuleBinder {
  static moduleBindings: Record<string, typeof Module> = {}

  static registerModule(module: typeof Module) {

    if (this.moduleBindings[module.name]) {
      throw new Error(`Module ${module.name} has already been registered.`)
    }

    this.moduleBindings[module.name] = module
  }

  modules: Modules = {}

  bindModules() {
    for (const moduleName in ModuleBinder.moduleBindings) {
      const mod = ModuleBinder.moduleBindings[moduleName]
      this.modules[mod.name] = new mod(this as any)
    }
  }

  initializeModules() {
    for (const moduleName in this.modules) {
      this.modules[moduleName].initialize()
    }
  }
}

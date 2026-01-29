import { DataManagerModule, AccessorModule, MutatorModule } from '../modules/index'


export type Modules = {
  dataManager?: DataManagerModule
  accessor?: AccessorModule
  mutator?: MutatorModule
}

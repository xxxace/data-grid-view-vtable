import type { DataGridViewDecorator } from "../core/DataGridViewDecorator"

export default class Module {
  static name: string; // 基类声明静态属性（不初始化）

  constructor(table: DataGridViewDecorator) {
    this.table = table
  };

  table: DataGridViewDecorator;

  initialize() { };
}

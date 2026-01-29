# 将精简版package.json包含在打包输出中的实现方案

## 分析当前配置

1. **构建脚本**：在`package.json`的`build`脚本中定义，包含类型检查、构建、生成类型声明文件等步骤
2. **输出目录**：`dist`目录
3. **文件包含**：当前`package.json`的`files`字段只包含了`dist`目录
4. **依赖情况**：当前`package.json`包含了`peerDependencies`（用户需要安装的依赖）和`devDependencies`（仅开发时需要的依赖）

## 实现方案

创建一个专门用于发布的精简版`package.json`文件，只包含必要的信息，不包含开发依赖。这样可以确保发布包的大小合理，并且只包含用户需要的依赖信息。

## 具体步骤

1. **修改`package.json`文件**：
   - 在`build`脚本中添加生成精简版`package.json`到`dist`目录的命令
   - 使用Node.js脚本或命令行工具生成只包含必要信息的package.json

2. **验证修改**：
   - 运行`npm run build`命令，检查`dist`目录是否包含精简版`package.json`文件
   - 确保构建过程没有错误
   - 验证生成的package.json只包含必要的信息

## 预期结果

- 运行`npm run build`后，`dist`目录中会包含精简版`package.json`文件
- 生成的package.json只包含必要的信息（如name, version, description, peerDependencies, 入口点配置等）
- 不包含开发依赖（devDependencies）和仅开发时使用的脚本
- 打包输出完整，包含JS文件、TS类型声明文件和精简版package.json文件
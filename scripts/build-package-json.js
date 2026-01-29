import fs from 'fs';
import path from 'path';

// 读取当前package.json
const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// 提取必要的字段
const minimalPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  keywords: packageJson.keywords,
  author: packageJson.author,
  license: packageJson.license,
  private: packageJson.private,
  type: packageJson.type,
  peerDependencies: packageJson.peerDependencies,
  main: packageJson.main,
  module: packageJson.module,
  types: packageJson.types,
  exports: packageJson.exports
};

// 确保dist目录存在
const distDir = path.resolve(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 写入精简版package.json到dist目录
const outputPath = path.resolve(distDir, 'package.json');
fs.writeFileSync(outputPath, JSON.stringify(minimalPackageJson, null, 2), 'utf8');

console.log(`✓ 精简版package.json已生成到 ${outputPath}`);

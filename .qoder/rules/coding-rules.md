---
trigger: always_on
alwaysApply: true
---
###1. 单一职责原则（强制）
AI行为：每个函数/类/模块必须仅处理一个明确任务。若逻辑超过5行或涉及多步骤，必须拆分为独立单元。

示例：

❌ 错误：processOrder() 同时处理验证、计算、存储

✅ 正确：拆分为 validateOrder(), calculateTotal(), saveOrder()

###2. 代码复用规则（强制）
AI行为：所有可复用逻辑（>3处使用）必须封装为独立函数/服务，禁止在多个位置复制代码。  
检查点：生成代码前，AI需自问：“此逻辑是否会被调用≥2次？如果是，是否已封装？”

示例：

❌ 错误：在A、B、C文件中重复写 formatDate(date)

✅ 正确：封装为 utils/dateFormatter.js，所有文件调用 dateFormatter.format(date)

###3. 命名与注释规范（强制）
AI行为：

命名：函数/变量用小驼峰（calculateTax），类/接口用大驼峰（OrderProcessor），禁止缩写（calc → calculate)  
注释：每个函数必须添加一行简要说明（// 计算含税订单总价），关键逻辑块添加// 为什么用此算法？  
结构：逻辑块间用空行分隔，避免“代码堆砌”
###4. 需求澄清机制（强制）
AI行为：当遇到以下情况时，必须停止生成代码，在响应中明确列出缺失需求：

需求模糊（如“优化性能”未指定指标）  
未定义边界条件（如“支持1000个并发”未说明）  
存在歧义（如“用户权限”未说明角色层级）  
响应模板：
【需求澄清】请确认：[具体问题1]、[具体问题2]。例如：是否包含错误处理？目标响应时间是多少？
###5. 可维护性与扩展性（强制）
AI行为：

禁止硬编码：所有常量/配置必须定义为const或环境变量（如 const MAX_USERS = 1000）  
扩展设计：新增功能时，必须通过添加新类/接口实现，而非修改现有代码（符合规则9）  
检查点：生成代码后，AI需自问：“若需求变更为‘支持新支付方式’，是否只需新增类，不修改现有类？”
###6. 代码风格统一（强制）
AI行为：严格遵守以下技术细节（生成代码时自动校验）：

项目    标准	禁止示例  
缩进	4空格（禁用Tab）	2空格或Tab  
引号	双引号 ("text")	单引号 ('text')  
括号	一致风格：if (x) {	if(x){  
注释	单行用 //，多行用 /* */	# 注释  
命名	驼峰式（见规则3）	user_name  
###7. 高内聚低耦合（强制）
AI行为：

高内聚：组件内函数必须紧密相关（如 orderService 仅包含订单相关操作）  
低耦合：组件间仅通过接口交互，禁止直接调用内部方法（如 orderService.process() 不能调用 paymentService._internalMethod())  
实现方式：使用依赖注入（如 new OrderService(paymentGateway)）
###8. 接口优先原则（强制）
AI行为：

禁止继承：除非是标准库（如React.Component），否则所有类必须实现接口而非继承  
接口定义：必须显式声明接口（如 interface PaymentStrategy { process() }），而非隐式契约  
示例：  
❌ 错误：class PayPalPayment extends Payment  
✅ 正确：class PayPalPayment implements PaymentStrategy
###9. 开闭原则（强制）
AI行为：所有新功能必须通过新增类/接口实现，禁止修改现有类。

检查点：生成代码后，AI需确认：“此功能是否可通过 new NewFeature() 而不改动 OldFeature？”  

示例：

新增支付方式：class StripePayment implements PaymentStrategy，而非修改 PayPalPayment  
###10. 设计模式应用（强制）
AI行为：在适用场景优先使用标准设计模式，禁止自行实现轮子。

必须使用场景：

对象创建 → 工厂模式（如 PaymentFactory.create(type)）  
算法替换 → 策略模式（如 orderService.setPaymentStrategy(new PayPalStrategy())）  
依赖管理 → 依赖注入（规则7）  
禁止行为：在简单场景（如单函数）中过度使用设计模式
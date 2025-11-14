# 金融模拟交易系统

## 项目概述

本项目是一个基于微前端架构的金融模拟交易系统，包含会员端、代理人端和管理端三个主要应用。系统提供模拟交易、审批流程、邀请制注册、主题配置等功能，帮助用户进行金融交易学习和实践。

## 技术架构

- **前端**: HTML5, CSS3, JavaScript (ES6+), qiankun微前端框架
- **后端**: Node.js, Express.js
- **数据库**: PostgreSQL
- **缓存**: Redis
- **队列**: BullMQ
- **构建工具**: Webpack
- **包管理**: npm

## 系统功能

### 会员端 (Member App)
- 用户注册和登录（邀请制）
- 行情查看和交易下单
- 私募基金认购/赎回
- 积分交易（看涨看跌预测）
- 持仓和订单管理
- 消息中心和风险披露

### 代理人端 (Agent App)
- 会员管理和邀请码生成
- 交易审批流程
- 数据统计和报表导出

### 管理端 (Admin Console)
- 用户和角色管理
- 交易引擎配置
- 产品管理（私募基金、看涨看跌）
- 审计日志查看
- 主题和资讯配置
- Kill Switch控制

## 项目结构

```
.
├── packages/
│   ├── admin-console/      # 管理端应用
│   ├── agent-app/          # 代理人端应用
│   ├── api-gateway/        # API网关
│   ├── app-shell/          # 主应用（微前端容器）
│   ├── engine-core/        # 核心引擎模块
│   └── member-app/         # 会员端应用
├── package.json
└── README.md
```

## 快速开始

### 环境要求
- Node.js 16.x 或更高版本
- PostgreSQL 13 或更高版本
- Redis 6.0 或更高版本

### 安装依赖
```bash
# 安装根目录依赖
npm install

# 为每个子应用安装依赖
cd packages/member-app && npm install
cd ../agent-app && npm install
cd ../admin-console && npm install
cd ../api-gateway && npm install
cd ../engine-core && npm install
cd ../app-shell && npm install
```

### 启动开发服务器
```bash
# 启动API网关（端口3000）
cd packages/api-gateway
npm start

# 启动各前端应用
cd packages/member-app
npm start

cd packages/agent-app
npm start

cd packages/admin-console
npm start

cd packages/app-shell
npm start
```

### 构建生产版本
```bash
# 构建各前端应用
cd packages/member-app
npm run build

cd packages/agent-app
npm run build

cd packages/admin-console
npm run build
```

## 配置说明

### 环境变量
在`packages/api-gateway/.env`文件中配置:

```
# 数据库配置
DATABASE_URL=postgresql://user:password@localhost:5432/trading_system

# Redis配置
REDIS_URL=redis://localhost:6379

# JWT密钥
JWT_SECRET=your_jwt_secret_key

# 服务端口
PORT=3000
```

## 部署说明

请参考 [生产环境部署方案.md](生产环境部署方案.md) 文件获取详细的部署指导。

## 文档资源

- [运维文档.md](运维文档.md) - 系统运维指南
- [用户手册.md](用户手册.md) - 用户操作指南
- [开发计划.md](开发计划.md) - 项目开发计划和架构设计

## 安全说明

- 系统采用JWT进行身份验证
- 实施了RBAC/ABAC权限控制
- 数据库层面实现了行级安全(RLS)
- 启用了CSP、HSTS等安全头
- 支持双因素认证(2FA)

## 许可证

本项目仅供学习和研究使用。

## 联系方式

如有任何问题，请联系项目维护者。
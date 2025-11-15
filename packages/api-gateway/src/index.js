const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// 导入中间件
const { authenticate, authorize, dataIsolation } = require('./middleware/auth');

// 中间件
app.use(helmet());  // 安全头部
app.use(cors());    // 跨域支持
app.use(morgan('combined'));  // 日志记录
app.use(express.json());  // JSON解析

// 引入CSP中间件
const cspMiddleware = require('./middleware/csp');

// 应用CSP中间件
app.use(cspMiddleware);

// 引入安全中间件
const security = require('./middleware/security');

// 添加IP白名单中间件（应用于所有路由）
app.use(security.ipWhitelistMiddleware);

// 添加2FA中间件（应用于需要保护的路由）
// 这里我们将其应用于所有路由，但在实际应用中可能只想应用于敏感操作
app.use(security.twoFactorMiddleware);

// 添加数据加密中间件
app.use(security.dataEncryptionMiddleware);

// 添加访问控制中间件
app.use(security.accessControlMiddleware);

// 引入监控中间件
const monitoring = require('./middleware/monitoring');

// 添加监控中间件
app.use(monitoring.httpMetricsMiddleware);

// 添加获取指标的路由
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', monitoring.getContentType());
    res.end(await monitoring.getMetrics());
  } catch (error) {
    console.error('获取监控指标失败:', error);
    res.status(500).json({ error: '获取监控指标失败' });
  }
});

// 健康检查路由
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 登录路由
app.post('/login', (req, res) => {
  // 这里应该实现实际的登录逻辑
  res.json({ 
    message: '登录成功', 
    token: 'mock-jwt-token',
    user: {
      id: 'U001',
      name: 'Mock User',
      role: 'MEMBER'
    }
  });
});

// 受保护的路由示例
app.get('/protected', authenticate, authorize(['MEMBER']), (req, res) => {
  res.json({ message: '这是一个受保护的路由，只有MEMBER角色可以访问' });
});

// 引入审批控制器
const approvalController = require('./controllers/approvalController');

// 审批相关路由
app.get('/agent/review/queue', authenticate, authorize(['AGENT']), dataIsolation, approvalController.getPendingApprovals);

app.post('/agent/review/:id/approve', authenticate, authorize(['AGENT']), dataIsolation, approvalController.approveOrder);

app.post('/agent/review/:id/reject', authenticate, authorize(['AGENT']), dataIsolation, approvalController.rejectOrder);

// 引入邀请控制器
const inviteController = require('./controllers/inviteController');

// 邀请相关路由
app.post('/admin/invites/batch', authenticate, authorize(['ADMIN']), inviteController.createInvites);

app.post('/public/invites/redeem', inviteController.redeemInvite);

// 引擎配置相关路由
app.get('/admin/engine/config', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({ message: '获取引擎配置' });
});

app.post('/admin/engine/config', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({ message: '更新引擎配置' });
});

app.post('/admin/engine/killswitch', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({ message: '触发Kill Switch' });
});

// 主题与素材相关路由
app.get('/admin/theme', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({ message: '获取主题配置' });
});

app.post('/admin/theme', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({ message: '更新主题配置' });
});

app.post('/admin/assets/upload', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({ message: '上传素材' });
});

// 资讯相关路由
const newsController = require('./controllers/newsController');

app.get('/news/latest', newsController.getLatestNews);

app.post('/admin/news/config', authenticate, authorize(['ADMIN']), newsController.configureNewsSource);

// 添加获取资讯配置的路由
app.get('/api/news/config', newsController.getNewsConfig);

// 导入Redis和审批队列
const redisClient = require('./config/redis');
const { approvalQueue } = require('./queues/approvalQueue');

// 导入审计控制器
const auditController = require('./controllers/auditController');

// 引入安全控制器
const securityController = require('./controllers/securityController');

// 引入主题控制器
const themeController = require('./controllers/themeController');

// 连接Redis
redisClient.connect();

// 添加审计日志路由
app.get('/admin/audit/logs', authenticate, authorize(['ADMIN']), auditController.getAuditLogs);
app.get('/admin/audit/export', authenticate, authorize(['ADMIN']), auditController.exportAuditLogs);

// 安全相关路由
app.post('/api/security/2fa/enable', authenticate, securityController.enableTwoFactor);
app.post('/api/security/2fa/disable', authenticate, securityController.disableTwoFactor);
app.get('/api/security/2fa/status', authenticate, securityController.getTwoFactorStatus);
app.post('/api/security/ip-whitelist/add', authenticate, authorize(['ADMIN']), securityController.addIPToWhitelist);
app.post('/api/security/ip-whitelist/remove', authenticate, authorize(['ADMIN']), securityController.removeIPFromWhitelist);
app.get('/api/security/ip-whitelist', authenticate, authorize(['ADMIN']), securityController.getIPWhitelist);

// 主题相关路由
app.get('/api/theme/:tenantId', themeController.getTheme);
app.post('/api/theme/:tenantId', authenticate, authorize(['ADMIN']), themeController.updateTenantTheme);

// 启动服务器
app.listen(PORT, () => {
  console.log(`API网关运行在端口 ${PORT}`);
});
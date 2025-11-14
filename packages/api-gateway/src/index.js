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
    res.status(500).send('Error generating metrics');
  }
});

// 基础路由
app.get('/', (req, res) => {
  res.json({ message: 'API Gateway is running' });
});

// 邀请与会员相关路由
app.post('/admin/agents', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({ message: '创建/编辑代理' });
});

app.post('/admin/invites/batch', authenticate, authorize(['ADMIN', 'AGENT']), (req, res) => {
  res.json({ message: '批量邀请码' });
});

app.post('/public/invites/redeem', (req, res) => {
  res.json({ message: '兑换邀请码' });
});

app.get('/agent/members', authenticate, authorize(['AGENT']), dataIsolation, (req, res) => {
  res.json({ message: '获取代理人名下会员' });
});

// 订单与审批相关路由
app.post('/member/orders', authenticate, authorize(['MEMBER']), dataIsolation, (req, res) => {
  res.json({ message: '创建订单' });
});

// 导入审批控制器
const approvalController = require('./controllers/approvalController');

app.get('/agent/review/queue', authenticate, authorize(['AGENT']), dataIsolation, approvalController.getPendingApprovals);

app.post('/agent/review/:id/approve', authenticate, authorize(['AGENT']), dataIsolation, approvalController.approveOrder);

app.post('/agent/review/:id/reject', authenticate, authorize(['AGENT']), dataIsolation, approvalController.rejectOrder);

// 引擎配置相关路由
app.get('/admin/engine/config', (req, res) => {
  res.json({ message: '获取引擎配置' });
});

app.post('/admin/engine/config', (req, res) => {
  res.json({ message: '更新引擎配置' });
});

app.post('/admin/engine/killswitch', (req, res) => {
  res.json({ message: '触发Kill Switch' });
});

// 主题与素材相关路由
app.get('/admin/theme', (req, res) => {
  res.json({ message: '获取主题配置' });
});

app.post('/admin/theme', (req, res) => {
  res.json({ message: '更新主题配置' });
});

app.post('/admin/assets/upload', (req, res) => {
  res.json({ message: '上传素材' });
});

// 资讯相关路由
const newsController = require('./controllers/newsController');

app.get('/news/latest', newsController.getLatestNews);

app.post('/admin/news/config', newsController.configureNewsSource);

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
app.get('/admin/audit/logs', auditController.getAuditLogs);
app.get('/admin/audit/export', auditController.exportAuditLogs);

// 安全相关路由
app.post('/api/security/2fa/enable', securityController.enableTwoFactor);
app.post('/api/security/2fa/disable', securityController.disableTwoFactor);
app.get('/api/security/2fa/status', securityController.getTwoFactorStatus);
app.post('/api/security/ip-whitelist/add', securityController.addIPToWhitelist);
app.post('/api/security/ip-whitelist/remove', securityController.removeIPFromWhitelist);
app.get('/api/security/ip-whitelist', securityController.getIPWhitelist);

// 主题相关路由
app.get('/api/theme/:tenantId', themeController.getTheme);
app.post('/api/theme/:tenantId', themeController.updateTenantTheme);
app.post('/api/theme/:tenantId/color', themeController.updateThemeColor);
app.post('/api/theme/:tenantId/preview', themeController.previewTheme);
app.post('/api/theme/:tenantId/save', themeController.saveTheme);
app.post('/api/theme', themeController.createTenantTheme);
app.get('/api/themes', themeController.getAllThemes);

// 启动服务
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
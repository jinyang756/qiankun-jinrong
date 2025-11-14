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

// 导入Redis和审批队列
const redisClient = require('./config/redis');
const { approvalQueue } = require('./queues/approvalQueue');

// 导入审计控制器
const auditController = require('./controllers/auditController');

// 连接Redis
redisClient.connect();

// 添加审计日志路由
app.get('/admin/audit/logs', auditController.getAuditLogs);
app.get('/admin/audit/export', auditController.exportAuditLogs);

// 启动服务
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
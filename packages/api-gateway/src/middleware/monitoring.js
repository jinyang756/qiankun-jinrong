const prometheus = require('prom-client');

// 创建指标注册表
const register = new prometheus.Registry();

// 创建指标
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5, 10],
  registers: [register]
});

const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

const orderProcessingDuration = new prometheus.Histogram({
  name: 'order_processing_duration_seconds',
  help: 'Duration of order processing in seconds',
  labelNames: ['order_type', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register]
});

const orderTotal = new prometheus.Counter({
  name: 'orders_total',
  help: 'Total number of orders',
  labelNames: ['order_type', 'status'],
  registers: [register]
});

const approvalQueueLength = new prometheus.Gauge({
  name: 'approval_queue_length',
  help: 'Current length of approval queue',
  registers: [register]
});

const systemErrors = new prometheus.Counter({
  name: 'system_errors_total',
  help: 'Total number of system errors',
  labelNames: ['error_type', 'service'],
  registers: [register]
});

// 中间件：记录HTTP请求指标
const httpMetricsMiddleware = (req, res, next) => {
  const start = Date.now();
  
  // 监听响应结束事件
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const method = req.method;
    const route = req.route ? req.route.path : req.path;
    const statusCode = res.statusCode;
    
    // 记录指标
    httpRequestDuration.labels(method, route, statusCode).observe(duration);
    httpRequestTotal.labels(method, route, statusCode).inc();
  });
  
  next();
};

// 记录订单处理指标
const recordOrderMetrics = (orderType, status, duration) => {
  orderProcessingDuration.labels(orderType, status).observe(duration);
  orderTotal.labels(orderType, status).inc();
};

// 更新审批队列长度
const updateApprovalQueueLength = (length) => {
  approvalQueueLength.set(length);
};

// 记录系统错误
const recordSystemError = (errorType, service) => {
  systemErrors.labels(errorType, service).inc();
};

// 获取指标数据
const getMetrics = async () => {
  return await register.metrics();
};

// 获取指标内容类型
const getContentType = () => {
  return register.contentType;
};

module.exports = {
  httpMetricsMiddleware,
  recordOrderMetrics,
  updateApprovalQueueLength,
  recordSystemError,
  getMetrics,
  getContentType
};